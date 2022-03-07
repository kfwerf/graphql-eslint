import { Kind, ObjectTypeDefinitionNode } from 'graphql';
import { GraphQLESLintRule } from '../types';
import { GraphQLESTreeNode } from '../estree-parser';
import { requireGraphQLSchemaFromContext } from '@graphql-eslint/eslint-plugin';

const RULE_ID = 'relay-connection-types';
const MUST_BE_OBJECT_TYPE = 'MUST_BE_OBJECT_TYPE';
const MUST_CONTAIN_FIELD_EDGES = 'MUST_CONTAIN_FIELD_EDGES';
const MUST_CONTAIN_FIELD_PAGE_INFO = 'MUST_CONTAIN_FIELD_PAGE_INFO';
const MUST_HAVE_CONNECTION_SUFFIX = 'MUST_HAVE_CONNECTION_SUFFIX';

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

const hasEdgesField = (node: GraphQLESTreeNode<ObjectTypeDefinitionNode>) =>
  node.fields.some(field => field.name.value === 'edges');
const hasPageInfoField = (node: GraphQLESTreeNode<ObjectTypeDefinitionNode>) =>
  node.fields.some(field => field.name.value === 'pageInfo');

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
      [MUST_BE_OBJECT_TYPE]: 'Connection type must be an "Object" type.',
      [MUST_HAVE_CONNECTION_SUFFIX]: 'Connection type must have `Connection` suffix.',
      [MUST_CONTAIN_FIELD_EDGES]: 'Connection type must contain a field `edges`.',
      [MUST_CONTAIN_FIELD_PAGE_INFO]: 'Connection type must contain a field `pageInfo`.',
    },
    schema: [],
  },
  create(context) {
    const nonConnectionTypesSelector = `:matches(${NON_CONNECTION_TYPES})[name.value=/Connection$/] > .name`;
    // const schema = requireGraphQLSchemaFromContext(RULE_ID, context);
    // console.log(schema)
    return {
      [nonConnectionTypesSelector](node) {
        context.report({ node, messageId: MUST_BE_OBJECT_TYPE });
      },
      ObjectTypeDefinition(node) {
        const hasConnectionSuffix = node.name.value.endsWith('Connection');
        if (hasConnectionSuffix) {
          if (!hasEdgesField(node)) {
            context.report({ node: node.name, messageId: MUST_CONTAIN_FIELD_EDGES });
          }
          if (!hasPageInfoField(node)) {
            context.report({ node: node.name, messageId: MUST_CONTAIN_FIELD_PAGE_INFO });
          }
        } else {
          if (hasEdgesField(node) && hasPageInfoField(node)) {
            context.report({ node: node.name, messageId: MUST_HAVE_CONNECTION_SUFFIX });
          }
        }
      },
    };
  },
};

export default rule;
