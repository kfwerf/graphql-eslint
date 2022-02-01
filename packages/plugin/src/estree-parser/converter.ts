import type { SourceLocation } from 'estree';
import { convertDescription, extractCommentsFromAst } from './utils';
import { GraphQLESTreeNode, SafeGraphQLType } from './estree-ast';
import {
  ASTNode,
  TypeNode,
  TypeInfo,
  visit,
  visitWithTypeInfo,
  Location,
  Kind,
  DocumentNode,
  ASTVisitor,
} from 'graphql';

export function convertToESTree<T extends ASTNode>(node: T, typeInfo?: TypeInfo) {
  const visitor: ASTVisitor = { leave: convertNode(typeInfo) };
  return {
    rootTree: visit(node, typeInfo ? visitWithTypeInfo(typeInfo, visitor) : visitor) as GraphQLESTreeNode<T>,
    comments: extractCommentsFromAst(node.loc),
  };
}

function hasTypeField<T extends ASTNode>(obj: any): obj is T & { readonly type: TypeNode } {
  return obj && !!(obj as any).type;
}

function convertLocation(location: Location): SourceLocation {
  const { startToken, endToken, source, start, end } = location;
  /*
   * ESLint has 0-based column number
   * https://eslint.org/docs/developer-guide/working-with-rules#contextreport
   */
  const loc = {
    start: {
      /*
       * Kind.Document has startToken: { line: 0, column: 0 }, we set line as 1 and column as 0
       */
      line: startToken.line === 0 ? 1 : startToken.line,
      column: startToken.column === 0 ? 0 : startToken.column - 1,
    },
    end: {
      line: endToken.line,
      column: endToken.column - 1,
    },
    source: source.body,
  };
  if (loc.start.column === loc.end.column) {
    loc.end.column += end - start;
  }
  return loc;
}

const convertNode = (typeInfo?: TypeInfo) => <T extends ASTNode>(
  node: T,
  key: string | number,
  parent: any
): GraphQLESTreeNode<T> => {
  const calculatedTypeInfo = typeInfo
    ? {
        argument: typeInfo.getArgument(),
        defaultValue: typeInfo.getDefaultValue(),
        directive: typeInfo.getDirective(),
        enumValue: typeInfo.getEnumValue(),
        fieldDef: typeInfo.getFieldDef(),
        inputType: typeInfo.getInputType(),
        parentInputType: typeInfo.getParentInputType(),
        parentType: typeInfo.getParentType(),
        gqlType: typeInfo.getType(),
      }
    : {};

  const commonFields = {
    typeInfo: () => calculatedTypeInfo,
    leadingComments: convertDescription(node),
    loc: convertLocation(node.loc),
    range: [node.loc.start, node.loc.end],
  };

  if (hasTypeField<T>(node)) {
    const { type: gqlType, loc: gqlLocation, ...rest } = node;
    const typeFieldSafe: SafeGraphQLType<T> = {
      ...rest,
      gqlType,
    } as SafeGraphQLType<T & { readonly type: TypeNode }>;
    const estreeNode: GraphQLESTreeNode<T> = ({
      ...typeFieldSafe,
      ...commonFields,
      type: node.kind,
      rawNode: () => {
        if (!parent || key === undefined) {
          if (node && (node as any).definitions) {
            return <DocumentNode>{
              loc: gqlLocation,
              kind: Kind.DOCUMENT,
              definitions: (node as any).definitions.map(d => d.rawNode()),
            };
          }

          return node;
        }

        return parent[key];
      },
    } as any) as GraphQLESTreeNode<T>;

    return estreeNode;
  } else {
    const { loc: gqlLocation, ...rest } = node;
    const typeFieldSafe: SafeGraphQLType<T> = rest as SafeGraphQLType<T & { readonly type: TypeNode }>;
    const estreeNode: GraphQLESTreeNode<T> = ({
      ...typeFieldSafe,
      ...commonFields,
      type: node.kind,
      rawNode: () => {
        if (!parent || key === undefined) {
          if (node && (node as any).definitions) {
            return <DocumentNode>{
              loc: gqlLocation,
              kind: Kind.DOCUMENT,
              definitions: (node as any).definitions.map(d => d.rawNode()),
            };
          }

          return node;
        }

        return parent[key];
      },
    } as any) as GraphQLESTreeNode<T>;

    return estreeNode;
  }
};
