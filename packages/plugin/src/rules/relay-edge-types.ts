import { GraphQLESLintRule } from '../types';
import { GraphQLSchema, visit, ASTVisitor, Kind, NameNode, isObjectType, print } from 'graphql';
import { getDocumentNodeFromSchema } from '@graphql-tools/utils';
import { GraphQLESTreeNode } from '../estree-parser';
import { getTypeName, requireGraphQLSchemaFromContext } from '../utils';

type EdgeTypes = Set<string>;

const RULE_ID = 'relay-edge-types';
let edgeTypesCache: EdgeTypes;

function getEdgeTypes(schema: GraphQLSchema): EdgeTypes {
  // We don't want cache edgeTypes on test environment
  // Otherwise edgeTypes will be same for all tests
  if (process.env.NODE_ENV !== 'test' && edgeTypesCache) {
    return edgeTypesCache;
  }
  const edgeTypes: EdgeTypes = new Set();

  const visitor: ASTVisitor = {
    ObjectTypeDefinition(node): void {
      const typeName = node.name.value;
      const hasConnectionSuffix = typeName.endsWith('Connection');
      if (!hasConnectionSuffix) {
        return;
      }
      const { edges, pageInfo } = Object.fromEntries(node.fields.map(field => [field.name.value, field]));
      if (edges && pageInfo) {
        const isListType =
          edges.type.kind === Kind.LIST_TYPE ||
          (edges.type.kind === Kind.NON_NULL_TYPE && edges.type.type.kind === Kind.LIST_TYPE);
        if (isListType) {
          edgeTypes.add(getTypeName(edges));
        }
      }
    },
  };
  const astNode = getDocumentNodeFromSchema(schema); // Transforms the schema into ASTNode
  visit(astNode, visitor);

  edgeTypesCache = edgeTypes;
  return edgeTypesCache;
}

const rule: GraphQLESLintRule = {
  meta: {
    type: 'problem',
    docs: {
      category: 'Schema',
      description: [
        'Set of rules to follow Relay specification for Edge types.',
        '',
        "- A type that is returned in list form by a connection type's `edges` field is considered by this spec to be an Edge type",
        '- Edge type must be an Object type',
        '- Edge type must contain a field `node` that return either a Scalar, Enum, Object, Interface, Union, or a non-null wrapper around one of those types. Notably, this field cannot return a list',
        '- Edge type must contain a field `cursor` that return a type String, a non-null wrapper around a String, a scalar, or a non-null wrapper around a scalar',
        '- Edge type name must end in "Edge" _(optional)_',
        "- Edge type's field `node` must implements `Node` interface _(optional)_",
        '- A list type should only wrap an edge type _(optional)_',
      ].join('\n'),
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
      isDisabledForAllConfig: true,
      requiresSchema: true,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ ``,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ ``,
        },
      ],
    },
    messages: {
      [RULE_ID]: '',
    },
    schema: [],
  },
  create(context) {
    const schema = requireGraphQLSchemaFromContext(RULE_ID, context);
    const edgeTypes = getEdgeTypes(schema);
    return {
      ':matches(ObjectTypeDefinition, ObjectTypeExtension)[name.value=/Connection$/] > FieldDefinition[name.value=edges] > .gqlType Name'(
        node: GraphQLESTreeNode<NameNode, true>
      ) {
        const type = schema.getType(node.value);
        if (!isObjectType(type)) {
          context.report({ node, message: 'Edge type must be an Object type' });
        }
      },
    };
  },
};

export default rule;
