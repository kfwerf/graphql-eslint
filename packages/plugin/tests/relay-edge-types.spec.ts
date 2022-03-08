import { GraphQLRuleTester, ParserOptions } from '../src';
import rule from '../src/rules/relay-edge-types';

const ruleTester = new GraphQLRuleTester();

function useSchema(code: string): { code: string; parserOptions: ParserOptions } {
  return {
    code,
    parserOptions: {
      schema: code,
    },
  };
}

ruleTester.runGraphQLTests('relay-edge-types', rule, {
  valid: [
    {
      name: 'when cursor returns string',
      ...useSchema(/* GraphQL */ `
        type AEdge {
          node: Int!
          cursor: String!
        }
        type AConnection {
          edges: [AEdge]
        }
      `),
    },
    {
      name: 'cursor returns scalar',
      ...useSchema(/* GraphQL */ `
        scalar Email
        type AEdge {
          node: Email!
          cursor: Email!
        }
        type AConnection {
          edges: [AEdge]
        }
      `),
    },
  ],
  invalid: [
    {
      name: 'Edge type must be Object type',
      ...useSchema(/* GraphQL */ `
        type PageInfo
        type BConnection
        type DConnection
        scalar AEdge
        union BEdge = PageInfo
        enum CEdge
        interface DEdge
        type AConnection {
          edges: [AEdge]
          pageInfo: PageInfo!
        }
        extend type BConnection {
          edges: [BEdge!]
          pageInfo: PageInfo!
        }
        type CConnection {
          edges: [CEdge]!
          pageInfo: PageInfo!
        }
        extend type DConnection {
          edges: [DEdge!]!
          pageInfo: PageInfo!
        }
      `),
      errors: 4,
    },
    {
      name: 'should report when fields is missing',
      ...useSchema(/* GraphQL */ `
        type PageInfo
        type AEdge
        type AConnection {
          edges: [AEdge]
          pageInfo: PageInfo!
        }
      `),
      errors: 2
    },
    {
      name: 'should report when list is used',
      ...useSchema(/* GraphQL */ `
        type PageInfo
        type AEdge {
          node: [PageInfo!]!
          cursor: [PageInfo!]!
        }
        type AConnection {
          edges: [AEdge]
          pageInfo: PageInfo!
        }
      `),
      errors: 2
    },
    // {
    //   name: 'Edge type must be Object type',
    //   ...useSchema(/* GraphQL */ `
    //     type PageInfo
    //     type BConnection
    //     type DConnection
    //     scalar AEdge
    //     union BEdge = PageInfo
    //     enum CEdge
    //     interface DEdge
    //     type AConnection {
    //       edges: [AEdge]
    //       pageInfo: PageInfo!
    //     }
    //     extend type BConnection {
    //       edges: [BEdge!]
    //       pageInfo: PageInfo!
    //     }
    //     type CConnection {
    //       edges: [CEdge]!
    //       pageInfo: PageInfo!
    //     }
    //     extend type DConnection {
    //       edges: [DEdge!]!
    //       pageInfo: PageInfo!
    //     }
    //   `),
    //   errors: 2,
    // },
  ],
});
