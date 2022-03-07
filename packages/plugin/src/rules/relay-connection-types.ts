import { GraphQLESLintRule } from '../types';

const RULE_ID = 'relay-connection-types';

const rule: GraphQLESLintRule = {
  meta: {
    type: 'problem',
    docs: {
      category: 'Schema',
      description: 'Follow Relay specification for Connection Types.',
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
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
