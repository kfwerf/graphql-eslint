import { Kind, ObjectTypeDefinitionNode, TypeNode } from 'graphql';
import { GraphQLESLintRule } from '../types';
import { GraphQLESTreeNode } from '../estree-parser';

const MUST_BE_OBJECT_TYPE = 'MUST_BE_OBJECT_TYPE';
const MUST_CONTAIN_FIELD_EDGES = 'MUST_CONTAIN_FIELD_EDGES';
const MUST_CONTAIN_FIELD_PAGE_INFO = 'MUST_CONTAIN_FIELD_PAGE_INFO';
const MUST_HAVE_CONNECTION_SUFFIX = 'MUST_HAVE_CONNECTION_SUFFIX';
const EDGES_FIELD_MUST_RETURN_LIST_TYPE = 'EDGES_FIELD_MUST_RETURN_LIST_TYPE';
const PAGE_INFO_FIELD_MUST_RETURN_NON_NULL_TYPE = 'PAGE_INFO_FIELD_MUST_RETURN_NON_NULL_TYPE';

export const NON_OBJECT_TYPES = [
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

const notConnectionTypesSelector = `:matches(${NON_OBJECT_TYPES})[name.value=/Connection$/] > .name`;

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
        '### Connection types',
        [
          '- Any type whose name ends in "Connection" is considered by spec to be a `Connection type`',
          '- Connection type must be an Object type',
          '- Connection type must contain a field `edges` that return a list type which wraps an edge type',
          '- Connection type must contain a field `pageInfo` that return a non-null `PageInfo` Object type',
        ].join('\n'),
        '### Edge types',
        [
          "- A type that is returned in list form by a connection type's `edges` field is considered by this spec to be an Edge type",
          '- Edge type must be an Object type',
          '- Edge type must contain a field `node` that return either a Scalar, Enum, Object, Interface, Union, or a non-null wrapper around one of those types. Notably, this field cannot return a list',
          '- Edge type must contain a field `cursor` that return a type String, a non-null wrapper around a String, a scalar, or a non-null wrapper around a scalar',
          '- Edge type name must end in "Edge" _(optional)_',
          "- Edge type's field `node` must implements `Node` interface _(optional)_",
          '- A list type should only wrap an edge type _(optional)_',
        ].join('\n'),
        '### Arguments',
        [
          '- A field that returns a Connection type must include forward pagination arguments, backward pagination arguments, or both',
          '',
          'Forward pagination arguments',
          '',
          '- `first` takes a non-negative integer',
          '- `after` takes the Cursor type',
          '',
          'Backward pagination arguments',
          '',
          '- `last` takes a non-negative integer',
          '- `before` takes the Cursor type',
        ].join('\n'),
      ].join('\n\n'),
      url: 'https://github.com/dotansimha/graphql-eslint/blob/master/docs/rules/relay-connection-types.md',
      isDisabledForAllConfig: true,
      examples: [
        {
          title: 'Incorrect',
          code: /* GraphQL */ `
            type UserPayload { # should be an Object type with \`Connection\` suffix
              edges: UserEdge! # should return a list type
              pageInfo: PageInfo # should return a non-null \`PageInfo\` Object type
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
      // Connection types
      [MUST_BE_OBJECT_TYPE]: 'Connection type must be an Object type.',
      [MUST_HAVE_CONNECTION_SUFFIX]: 'Connection type must have `Connection` suffix.',
      [MUST_CONTAIN_FIELD_EDGES]: 'Connection type must contain a field `edges` that return a list type.',
      [MUST_CONTAIN_FIELD_PAGE_INFO]:
        'Connection type must contain a field `pageInfo` that return a non-null `PageInfo` Object type.',
      [EDGES_FIELD_MUST_RETURN_LIST_TYPE]: '`edges` field must return a list type.',
      [PAGE_INFO_FIELD_MUST_RETURN_NON_NULL_TYPE]: '`pageInfo` field must return a non-null `PageInfo` Object type.',
    },
    schema: [],
  },
  create(context) {
    return {
      [notConnectionTypesSelector](node) {
        context.report({ node, messageId: MUST_BE_OBJECT_TYPE });
      },
      'ObjectTypeDefinition[name.value!=/Connection$/]'(node: GraphQLESTreeNode<ObjectTypeDefinitionNode>) {
        if (hasEdgesField(node) && hasPageInfoField(node)) {
          context.report({ node: node.name, messageId: MUST_HAVE_CONNECTION_SUFFIX });
        }
      },
      'ObjectTypeDefinition[name.value=/Connection$/]'(node: GraphQLESTreeNode<ObjectTypeDefinitionNode>) {
        if (!hasEdgesField(node)) {
          context.report({ node: node.name, messageId: MUST_CONTAIN_FIELD_EDGES });
        }
        if (!hasPageInfoField(node)) {
          context.report({ node: node.name, messageId: MUST_CONTAIN_FIELD_PAGE_INFO });
        }
      },
      'ObjectTypeDefinition[name.value=/Connection$/] > FieldDefinition[name.value=edges] > .gqlType'(
        node: GraphQLESTreeNode<TypeNode>
      ) {
        const isListType =
          node.kind === Kind.LIST_TYPE || (node.kind === Kind.NON_NULL_TYPE && node.gqlType.kind === Kind.LIST_TYPE);
        if (!isListType) {
          context.report({ node, messageId: EDGES_FIELD_MUST_RETURN_LIST_TYPE });
        }
      },
      'ObjectTypeDefinition[name.value=/Connection$/] > FieldDefinition[name.value=pageInfo] > .gqlType'(
        node: GraphQLESTreeNode<TypeNode>
      ) {
        const isNonNullPageInfoType =
          node.kind === Kind.NON_NULL_TYPE &&
          node.gqlType.kind === Kind.NAMED_TYPE &&
          node.gqlType.name.value === 'PageInfo';
        if (!isNonNullPageInfoType) {
          context.report({ node, messageId: PAGE_INFO_FIELD_MUST_RETURN_NON_NULL_TYPE });
        }
      },
    };
  },
};

export default rule;
