import { GraphQLRuleTester, ParserOptions } from '../src';
import rule from '../src/rules/relay-page-info';

const ruleTester = new GraphQLRuleTester();

function useSchema(code: string): { code: string; parserOptions: ParserOptions } {
  return {
    code,
    parserOptions: {
      schema: code,
    },
  };
}

ruleTester.runGraphQLTests('relay-page-info', rule, {
  valid: [
    /* GraphQL */ `
      type PageInfo {
        hasPreviousPage: Boolean!
        hasNextPage: Boolean!
        startCursor: String!
        endCursor: String!
      }
    `,
  ],
  invalid: [
    {
      code: 'directive @PageInfo on FIELD_DEFINITION',
      errors: 1,
    },
    {
      code: 'scalar PageInfo',
      errors: 1,
    },
    {
      code: /* GraphQL */ `
        union PageInfo = UserConnection | Post
        extend union PageInfo = Comment
        type UserConnection {
          edges: [UserEdge]
          pageInfo: PageInfo!
        }
        type Post
        type Comment
      `,
      errors: 2,
    },
    {
      code: /* GraphQL */ `
        input PageInfo
        extend input PageInfo {
          hasPreviousPage: Boolean!
          hasNextPage: Boolean!
          startCursor: String!
          endCursor: String!
        }
      `,
      errors: 2,
    },
    {
      code: /* GraphQL */ `
        enum PageInfo
        extend enum PageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      `,
      errors: 2,
    },
    {
      code: /* GraphQL */ `
        interface PageInfo
        extend interface PageInfo {
          hasPreviousPage: Boolean!
          hasNextPage: Boolean!
          startCursor: String!
          endCursor: String!
        }
      `,
      errors: 2,
    },
    {
      code: /* GraphQL */ `
        extend type PageInfo {
          hasPreviousPage: Boolean!
          hasNextPage: Boolean!
          startCursor: String!
          endCursor: String!
        }
      `,
      errors: 1,
    },
    {
      code: /* GraphQL */ `
        type PageInfo {
          hasPreviousPage: Boolean
          startCursor: String
        }
      `,
      errors: 4,
    },
  ],
});
