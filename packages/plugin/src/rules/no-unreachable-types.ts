import { ASTKindToNode, ASTNode, ASTVisitor, GraphQLSchema, isInterfaceType, Kind, visit } from 'graphql';
import lowerCase from 'lodash.lowercase';
import { GraphQLESLintRule, ValueOf } from '../types';
import { getTypeName, requireGraphQLSchemaFromContext } from '../utils';
import { GraphQLESTreeNode } from '../estree-parser';

const RULE_ID = 'no-unreachable-types';

const KINDS = [
  Kind.DIRECTIVE_DEFINITION,
  Kind.OBJECT_TYPE_DEFINITION,
  Kind.OBJECT_TYPE_EXTENSION,
  Kind.INTERFACE_TYPE_DEFINITION,
  Kind.INTERFACE_TYPE_EXTENSION,
  Kind.SCALAR_TYPE_DEFINITION,
  Kind.SCALAR_TYPE_EXTENSION,
  Kind.INPUT_OBJECT_TYPE_DEFINITION,
  Kind.INPUT_OBJECT_TYPE_EXTENSION,
  Kind.UNION_TYPE_DEFINITION,
  Kind.UNION_TYPE_EXTENSION,
  Kind.ENUM_TYPE_DEFINITION,
  Kind.ENUM_TYPE_EXTENSION,
] as const;

type AllowedKind = typeof KINDS[number];
type AllowedKindToNode = Pick<ASTKindToNode, AllowedKind>;

type ReachableTypes = Set<string>;

let reachableTypesCache: ReachableTypes;

function getReachableTypes(schema: GraphQLSchema): ReachableTypes {
  // We don't want cache reachableTypes on test environment
  // Otherwise reachableTypes will be same for all tests
  if (process.env.NODE_ENV !== 'test' && reachableTypesCache) {
    return reachableTypesCache;
  }
  const reachableTypes: ReachableTypes = new Set();

  const collect = (node: ASTNode): false | void => {
    const typeName = getTypeName(node);
    if (reachableTypes.has(typeName)) {
      return;
    }
    reachableTypes.add(typeName);
    const type = schema.getType(typeName) || schema.getDirective(typeName);

    if (isInterfaceType(type)) {
      const { objects, interfaces } = schema.getImplementations(type);
      for (const { astNode } of [...objects, ...interfaces]) {
        visit(astNode, visitor);
      }
    } else if (type.astNode) {
      // astNode can be undefined for ID, String, Boolean
      visit(type.astNode, visitor);
    }
  };

  const visitor: ASTVisitor = {
    InterfaceTypeDefinition: collect,
    ObjectTypeDefinition: collect,
    InputValueDefinition: collect,
    UnionTypeDefinition: collect,
    FieldDefinition: collect,
    Directive: collect,
    NamedType: collect,
  };

  for (const type of [
    schema, // visiting SchemaDefinition node
    schema.getQueryType(),
    schema.getMutationType(),
    schema.getSubscriptionType(),
  ]) {
    // if schema don't have Query type, schema.astNode will be undefined
    if (type?.astNode) {
      visit(type.astNode, visitor);
    }
  }
  reachableTypesCache = reachableTypes;
  return reachableTypesCache;
}

const rule: GraphQLESLintRule = {
  meta: {
    messages: {
      [RULE_ID]: '{{ type }} `{{ typeName }}` is unreachable.',
    },
    docs: {
      description: `Requires all types to be reachable at some level by root level fields.`,
      category: 'Schema',
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
      requiresSchema: true,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            type User {
              id: ID!
              name: String
            }

            type Query {
              me: String
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            type User {
              id: ID!
              name: String
            }

            type Query {
              me: User
            }
          `,
        },
      ],
      recommended: true,
    },
    type: 'suggestion',
    schema: [],
    hasSuggestions: true,
  },
  create(context) {
    const schema = requireGraphQLSchemaFromContext(RULE_ID, context);
    const reachableTypes = getReachableTypes(schema);
    const selector = KINDS.join(',');

    return {
      [selector](node: GraphQLESTreeNode<ValueOf<AllowedKindToNode>>) {
        const typeName = node.name.value;

        if (!reachableTypes.has(typeName)) {
          const type = lowerCase(node.kind.replace(/(Extension|Definition)$/, ''))
          context.report({
            node: node.name,
            messageId: RULE_ID,
            data: {
              type: type[0].toUpperCase() + type.slice(1),
              typeName
            },
            suggest: [
              {
                desc: `Remove \`${typeName}\``,
                fix: fixer => fixer.remove(node as any),
              },
            ],
          });
        }
      },
    };
  },
};

export default rule;
