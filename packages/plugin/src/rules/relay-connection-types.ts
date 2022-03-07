import { Kind } from 'graphql';
import { GraphQLESLintRule } from '../types';
import { requireGraphQLSchemaFromContext } from '@graphql-eslint/eslint-plugin';

const RULE_ID = 'relay-connection-types';
export const CONNECTION_TYPE_MUST_BE_AN_OBJECT_TYPE = 'CONNECTION_TYPE_MUST_BE_AN_OBJECT_TYPE';

const NON_CONNECTION_TYPES = [
  Kind.DIRECTIVE_DEFINITION,
  Kind.SCALAR_TYPE_DEFINITION,
  Kind.UNION_TYPE_DEFINITION,
  Kind.UNION_TYPE_EXTENSION,
  Kind.INPUT_OBJECT_TYPE_DEFINITION,
  Kind.INPUT_OBJECT_TYPE_EXTENSION,
  Kind.ENUM_TYPE_DEFINITION,
  Kind.ENUM_TYPE_EXTENSION,
  Kind.INTERFACE_TYPE_DEFINITION,
  Kind.INTERFACE_TYPE_EXTENSION,
  Kind.OBJECT_TYPE_EXTENSION,
];

const rule: GraphQLESLintRule = {
  meta: {
    type: 'problem',
    docs: {
      category: 'Schema',
      description: [
        'Follow Relay specification for Connection types.',
        '',
        '- Any type whose name ends in "Connection" is considered by spec to be a `Connection type`',
        '- Connection type must be an "Object" type',
        '- A "Connection type" must contain a field called `edges`. This field must return a list type that wraps an edge type',
        '- A "Connection type" must contain a field called `pageInfo`. This field must return a non-null `PageInfo` object',
      ].join('\n'),
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
      isDisabledForAllConfig: true,
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
      [CONNECTION_TYPE_MUST_BE_AN_OBJECT_TYPE]: 'Connection type must be an "Object" type.',
    },
    schema: [],
  },
  create(context) {
    const nonConnectionTypesSelector = `:matches(${NON_CONNECTION_TYPES})[name.value=/Connection$/] > .name`;
    // const schema = requireGraphQLSchemaFromContext(RULE_ID, context);
    // console.log(schema)
    return {
      [nonConnectionTypesSelector](node) {
        context.report({
          node,
          messageId: CONNECTION_TYPE_MUST_BE_AN_OBJECT_TYPE,
        });
      },
    };
  },
};

export default rule;
