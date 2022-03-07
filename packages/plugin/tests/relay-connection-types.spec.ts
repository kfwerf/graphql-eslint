import { GraphQLRuleTester, ParserOptions } from '../src';
import rule from '../src/rules/relay-connection-types';

const ruleTester = new GraphQLRuleTester();

function useSchema(code: string): { code: string; parserOptions: ParserOptions } {
  return {
    code,
    parserOptions: {
      schema: code,
    },
  };
}

ruleTester.runGraphQLTests('relay-connection-types', rule, {
  valid: [
    {
      name: 'follow Relay spec',
      code: /* GraphQL */ `
        type UserConnection {
          edges: [UserEdge]
          pageInfo: PageInfo
        }
      `,
    },
    {
      name: '`edges` field should return a list type that wraps an edge type',
      code: /* GraphQL */ `
        type UserConnection {
          edges: [UserEdge]
          pageInfo: PageInfo
        }
        type PostConnection {
          edges: [PostEdge!]
          pageInfo: PageInfo
        }
        type CommentConnection {
          edges: [CommentEdge]!
          pageInfo: PageInfo
        }
        type AddressConnection {
          edges: [AddressEdge!]!
          pageInfo: PageInfo
        }
      `,
    },
  ],
  invalid: [
    {
      name: 'should report about non connection types with `Connection` suffix',
      code: /* GraphQL */ `
        directive @directiveConnection(role: [RoleConnection!]!) on FIELD_DEFINITION
        scalar DateTimeConnection
        union DataConnection = UserConnection | Post
        extend union DataConnection = Comment
        input CreateUserConnection
        extend input CreateUserConnection {
          firstName: String
        }
        enum RoleConnection
        extend enum RoleConnection {
          ADMIN
        }
        interface NodeConnection
        extend interface NodeConnection {
          id: ID!
        }
        extend type UserConnection {
          role: RoleConnection
        }
        type UserConnection
        type Post
        type Comment
      `,
      errors: 13,
    },
    {
      name: 'should report about missing `Connection` suffix',
      code: /* GraphQL */ `
        type User {
          edges: UserEdge
          pageInfo: PageInfo
        }
      `,
      errors: 1,
    },
    {
      name: 'should report about missing `edges` field',
      code: 'type UserConnection { pageInfo: PageInfo }',
      errors: 1,
    },
    {
      name: 'should report about missing `pageInfo` field',
      code: 'type UserConnection { edges: [UserEdge] }',
      errors: 1,
    },
    {
      name: '`edges` field should return a list type that wraps an edge type',
      code: /* GraphQL */ `
        type UserConnection {
          edges: UserEdge
          pageInfo: PageInfo
        }
        type PostConnection {
          edges: PostEdge!
          pageInfo: PageInfo
        }
      `,
      errors: 2,
    },
  ],
});
