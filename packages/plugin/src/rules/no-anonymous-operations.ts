import { Kind, OperationDefinitionNode } from 'graphql';
import { GraphQLESLintRule } from '../types';
import { getLocation } from '../utils';
import { GraphQLESTreeNode } from '../estree-parser';

const RULE_ID = 'no-anonymous-operations';

const rule: GraphQLESLintRule = {
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
    docs: {
      category: 'Operations',
      description:
        'Require name for your GraphQL operations. This is useful since most GraphQL client libraries are using the operation name for caching purposes.',
      recommended: true,
      url: `https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/${RULE_ID}.md`,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            query {
              # ...
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            query user {
              # ...
            }
          `,
        },
      ],
    },
    messages: {
      [RULE_ID]: `Anonymous GraphQL operations are forbidden. Make sure to name your {{ operation }}!`,
    },
    schema: [],
  },
  create(context) {
    return {
      'OperationDefinition[name=undefined]'(node: GraphQLESTreeNode<OperationDefinitionNode>) {
        const [firstSelection] = node.selectionSet.selections;
        const suggestedName =
          firstSelection.type === Kind.FIELD ? (firstSelection.alias || firstSelection.name).value : node.operation;

        context.report({
          loc: getLocation(node.loc.start, node.operation),
          messageId: RULE_ID,
          data: {
            operation: node.operation,
          },
          suggest: [
            {
              desc: `Rename to \`${suggestedName}\``,
              fix: fixer =>
                fixer.insertTextAfterRange([node.range[0], node.range[0] + node.operation.length], ` ${suggestedName}`),
            },
          ],
        });
      },
    };
  },
};

export default rule;
