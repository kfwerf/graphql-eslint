import { GraphQLRuleTester, ParserOptions } from '../src';
import rule from '../src/rules/non-null-union';

const ruleTester = new GraphQLRuleTester();
const WITH_SCHEMA = {
  parserOptions: <ParserOptions>{
    schema: /* GraphQL */ `
      union OptionalItem = Item | NotFound

      type Item {
        id: ID!
      }
      
      type NotFound {
        message: String!
      }

    `,
  },
};


ruleTester.runGraphQLTests('non-null-union', rule, {
  valid: [{
    ...WITH_SCHEMA,
    code: /* GraphQL */ `
    type Query {
      itemRequired: OptionalItem!
    }
    `,
  }],
  invalid: [{
    ...WITH_SCHEMA,
    code: /* GraphQL */ `
    type Query {
      item: OptionalItem
    }
    `,
    errors: [{ message: 'The field `Query.item` is using union `OptionalItem` that is nullable, please add a `!`' }],
  }],
});