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
      name: 'should ',
      ...useSchema(/* GraphQL */ ``),
      errors: [{ message: '' }],
    },
  ],
});
