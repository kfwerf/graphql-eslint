import { GraphQLESLintRule } from '../types';
import { GraphQLESTreeNode } from '../estree-parser';
import { Kind, ObjectTypeDefinitionNode } from 'graphql';
import { NON_OBJECT_TYPES } from './relay-connection-types';

const RULE_ID = 'relay-page-info';
const MESSAGE_MUST_EXIST = 'MESSAGE_MUST_EXIST';
const MESSAGE_MUST_BE_OBJECT_TYPE = 'MESSAGE_MUST_BE_OBJECT_TYPE';
const notPageInfoTypesSelector = `:matches(${NON_OBJECT_TYPES})[name.value=PageInfo] > .name`;

const rule: GraphQLESLintRule = {
  meta: {
    type: 'problem',
    docs: {
      category: 'Schema',
      description: [
        'Set of rules to follow Relay specification for `PageInfo` object.',
        [
          '- `PageInfo` must be an Object type',
          '- `PageInfo` must contain fields `hasPreviousPage` and `hasNextPage`, which return non-null booleans',
          '- `PageInfo` must contain fields `startCursor` and `endCursor`, which return non-null opaque strings',
        ].join('\n'),
      ].join('\n\n'),
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
      isDisabledForAllConfig: true,
    },
    messages: {
      [MESSAGE_MUST_EXIST]: 'The server must provide a `PageInfo` object.',
      [MESSAGE_MUST_BE_OBJECT_TYPE]: '`PageInfo` must be an Object type.',
    },
    schema: [],
  },
  create(context) {
    return {
      [notPageInfoTypesSelector](node) {
        context.report({ node, messageId: MESSAGE_MUST_BE_OBJECT_TYPE });
      },
      'ObjectTypeDefinition[name.value=PageInfo]'(node: GraphQLESTreeNode<ObjectTypeDefinitionNode>) {
        const fieldMap = Object.fromEntries(node.fields.map(field => [field.name.value, field]));

        const checkField = (
          fieldName: 'hasPreviousPage' | 'hasNextPage' | 'startCursor' | 'endCursor',
          typeName: 'Boolean' | 'String',
          returnType: 'boolean' | 'opaque string'
        ): void => {
          const field = fieldMap[fieldName];
          const hasField = Boolean(field);
          const isNonNullBoolean =
            hasField &&
            field.gqlType.kind === Kind.NON_NULL_TYPE &&
            field.gqlType.gqlType.kind === Kind.NAMED_TYPE &&
            field.gqlType.gqlType.name.value === typeName;
          if (!isNonNullBoolean) {
            context.report({
              node: hasField ? field.gqlType : node.name,
              message: hasField
                ? `Field \`${fieldName}\` must return non-null ${returnType}.`
                : `\`PageInfo\` must contain a field \`${fieldName}\`, that return non-null ${returnType}.`,
            });
          }
        };

        for (const fieldName of ['hasPreviousPage', 'hasNextPage'] as const) {
          checkField(fieldName, 'Boolean', 'boolean');
        }
        for (const fieldName of ['startCursor', 'endCursor'] as const) {
          checkField(fieldName, 'String', 'opaque string');
        }
      },
    };
  },
};

export default rule;
