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
      name: 'Edge type must be Object type',
      ...useSchema(/* GraphQL */ `
        type PageInfo
        type AEdge
        type AConnection {
          edges: [AEdge]
          pageInfo: PageInfo!
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
  ],
});
