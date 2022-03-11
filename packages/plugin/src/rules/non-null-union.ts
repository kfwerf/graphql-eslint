import { GraphQLUnionType } from 'graphql';
import { GraphQLESLintRule } from '../types';
import { requireGraphQLSchemaFromContext } from '../utils';

const RULE_ID = 'non-null-union';
const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
    docs: {
      description: `Checks for unions in the schema, ensuring they are non-nullable.`,
      category: 'Schema',
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
      recommended: true,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            union OptionalItem = Item | NotFound

            type Item {
                id: ID!
            }
            
            type NotFound {
                message: String!
            }
            
            
            type Query {
                item: OptionalItem
            }
          `,
        },
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            union OptionalItem = Item | NotFound

            type Item {
                id: ID!
            }
            
            type NotFound {
                message: String!
            }
            
            
            type Query {
                item: OptionalItem!
            }
          `,
        },
      ],
    },
    messages: {
      [RULE_ID]: '{{ type }} `{{ fieldName }}` is nullabe but is a union, needs to be marked with an !.',
    },
    schema: [],
  },
  create(context) {
    const schema = requireGraphQLSchemaFromContext(RULE_ID, context);
    return {
      FieldDefinition(node) {
        const typeKind = (node.gqlType as any)?.name?.value as string;
        const isUnion = schema.getType(typeKind) instanceof GraphQLUnionType;
        const isNonNull = (node?.type as any)?.kind as string === 'NonNullType';
        if (isUnion && !isNonNull) {
          const fieldName = node.name.value;
          const parentName = (node as any)?.parent?.name?.value as string;
          context.report({
            node,
            message: `The field \`${parentName}.${fieldName}\` is using union \`${typeKind}\` that is nullable, please add a \`!\``,
            suggest: [
              {
                desc: `Add a ! add the end of ${parentName}.${fieldName}`,
                fix: (fixer) => {
                  return fixer.insertTextAfterRange(node.range as [number, number], '!');
                },
              },
            ],
          });
        }
      },
    };
  },
};

export default rule;
