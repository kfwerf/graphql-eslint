import { GraphQLESLintRule } from '../types';

const RULE_ID = 'relay-connection-types';

const rule: GraphQLESLintRule = {
  meta: {
    type: 'problem',
    docs: {
      category: 'Schema',
      description: [
        'Follow Relay specification for Connection types.',
        '',
        '- Any type whose name ends in "Connection" is considered by spec to be a `Connection type`',
        '- Connection types must be an "Object" type',
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
      [RULE_ID]: '',
    },
    schema: [],
  },
  create(context) {
    return {
      Document(node) {
        context.report({
          node,
          messageId: RULE_ID,
        });
      },
    };
  },
};

export default rule;
