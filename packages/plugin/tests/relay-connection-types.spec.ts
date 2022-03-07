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
      name: 'should ',
      code: /* GraphQL */ ``,
    },
  ],
  invalid: [
    {
      name: 'should report about non connection types with `Connection` suffix',
      ...useSchema(/* GraphQL */ `
        directive @directiveConnection(role: [RoleConnection!]!) on FIELD_DEFINITION
        scalar DateTimeConnection
        union DataConnection = UserConnection | PostConnection
        extend union DataConnection = CommentConnection
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
        type PostConnection
        type CommentConnection
      `),
      errors: 11,
    },
  ],
});
