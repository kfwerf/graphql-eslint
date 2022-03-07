import { Kind, NameNode, ObjectTypeDefinitionNode } from 'graphql';
import { GraphQLESLintRule } from '../types';
import { GraphQLESTreeNode } from '../estree-parser';

const MUST_BE_OBJECT_TYPE = 'MUST_BE_OBJECT_TYPE';
const MUST_CONTAIN_FIELD_EDGES = 'MUST_CONTAIN_FIELD_EDGES';
const MUST_CONTAIN_FIELD_PAGE_INFO = 'MUST_CONTAIN_FIELD_PAGE_INFO';
const MUST_HAVE_CONNECTION_SUFFIX = 'MUST_HAVE_CONNECTION_SUFFIX';
const EDGES_MUST_RETURN_LIST_TYPE = 'EDGES_MUST_RETURN_LIST_TYPE';
const PAGE_INFO_MUST_RETURN_NON_NULL_TYPE = 'PAGE_INFO_MUST_RETURN_NON_NULL_TYPE';

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

const nonConnectionTypesSelector = `:matches(${NON_CONNECTION_TYPES})[name.value=/Connection$/] > .name`;

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
        'Set of rules to follow Relay specification for Connection types.',
        '',
        '- Any type whose name ends in "Connection" is considered by spec to be a `Connection type`',
        '- Connection type must be an "Object" type',
        '- Connection type must contain a field `edges` that must return a list type that wraps an edge type',
        '- Connection type must contain a field `pageInfo` that must return a non-null `PageInfo` object',
      ].join('\n'),
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/relay-connection-types.md',
      isDisabledForAllConfig: true,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            type UserPayload { # should be "Object" type with \`Connection\` suffix
              edges: UserEdge! # should return a list type
              pageInfo: PageInfo # should return a non-null \`PageInfo\` object
            }
          `,
        },
        {
          title: 'Correct',
          code: /* GraphQL */ `
            type UserConnection {
              edges: [UserEdge]
              pageInfo: PageInfo!
            }
          `,
        },
      ],
    },
    messages: {
      [MUST_BE_OBJECT_TYPE]: 'Connection type must be an "Object" type.',
      [MUST_HAVE_CONNECTION_SUFFIX]: 'Connection type must have `Connection` suffix.',
      [MUST_CONTAIN_FIELD_EDGES]: 'Connection type must contain a field `edges`.',
      [MUST_CONTAIN_FIELD_PAGE_INFO]: 'Connection type must contain a field `pageInfo`.',
      [EDGES_MUST_RETURN_LIST_TYPE]: '`edges` field must return a list type.',
      [PAGE_INFO_MUST_RETURN_NON_NULL_TYPE]: '`pageInfo` field must return a non-null `PageInfo` object.',
    },
    schema: [],
  },
  create(context) {
    return {
      [nonConnectionTypesSelector](node) {
        context.report({ node, messageId: MUST_BE_OBJECT_TYPE });
      },
      'ObjectTypeDefinition[name.value!=/Connection$/] > Name'(node) {
        if (hasEdgesField(node.parent) && hasPageInfoField(node.parent)) {
          context.report({ node, messageId: MUST_HAVE_CONNECTION_SUFFIX });
        }
      },
      'ObjectTypeDefinition[name.value=/Connection$/] > Name'(node) {
        if (!hasEdgesField(node.parent)) {
          context.report({ node, messageId: MUST_CONTAIN_FIELD_EDGES });
        }
        if (!hasPageInfoField(node.parent)) {
          context.report({ node, messageId: MUST_CONTAIN_FIELD_PAGE_INFO });
        }
      },
      'ObjectTypeDefinition[name.value=/Connection$/] > FieldDefinition > Name[value=edges]'(
        node: GraphQLESTreeNode<NameNode>
      ) {
        const type = (node as any).parent.gqlType;
        const isListType =
          type.kind === Kind.LIST_TYPE || (type.kind === Kind.NON_NULL_TYPE && type.gqlType.kind === Kind.LIST_TYPE);
        if (!isListType) {
          context.report({ node: type, messageId: EDGES_MUST_RETURN_LIST_TYPE });
        }
      },
      'ObjectTypeDefinition[name.value=/Connection$/] > FieldDefinition > Name[value=pageInfo]'(
        node: GraphQLESTreeNode<NameNode>
      ) {
        const type = (node as any).parent.gqlType;
        const isNonNullType =
          type.kind === Kind.NON_NULL_TYPE &&
          type.gqlType.kind === Kind.NAMED_TYPE &&
          type.gqlType.name.value === 'PageInfo';
        if (!isNonNullType) {
          context.report({ node: type, messageId: PAGE_INFO_MUST_RETURN_NON_NULL_TYPE });
        }
      },
    };
  },
};

export default rule;
