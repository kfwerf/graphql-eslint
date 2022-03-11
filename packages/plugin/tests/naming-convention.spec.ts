import { GraphQLRuleTester } from '../src';
import rule, { NamingConventionRuleConfig } from '../src/rules/naming-convention';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests<[NamingConventionRuleConfig]>('naming-convention', rule, {
  valid: [
    {
      code: /* GraphQL */ `
        query GetUser($userId: ID!) {
          user(id: $userId) {
            id
            name
            isViewerFriend
            profilePicture(size: 50) {
              ...PictureFragment
            }
          }
        }

        fragment PictureFragment on Picture {
          uri
          width
          height
        }
      `,
      options: [
        {
          types: 'PascalCase',
          VariableDefinition: 'camelCase',
          EnumValueDefinition: 'UPPER_CASE',
          OperationDefinition: 'PascalCase',
          FragmentDefinition: 'PascalCase',
        },
      ],
    },
    {
      code: 'type B { test: String }',
      options: [{ types: 'PascalCase' }],
    },
    {
      code: 'type my_test_6_t { test: String }',
      options: [{ types: 'snake_case' }],
    },
    {
      code: 'type MY_TEST_6_T { test: String }',
      options: [{ types: 'UPPER_CASE' }],
    },
    {
      code: 'type B { test: String }',
      options: [{ allowLeadingUnderscore: false, allowTrailingUnderscore: false }],
    },
    {
      code: 'type __B { __test__: String }',
      options: [
        {
          allowLeadingUnderscore: true,
          allowTrailingUnderscore: true,
          types: 'PascalCase',
          FieldDefinition: 'camelCase',
        },
      ],
    },
    {
      code: 'scalar BSONDecimal',
      options: [{ types: 'PascalCase' }],
    },
    {
      code: 'interface B { test: String }',
      options: [{ types: 'PascalCase' }],
    },
    {
      code: 'enum B { TEST }',
      options: [{ types: 'PascalCase', EnumValueDefinition: 'UPPER_CASE' }],
    },
    {
      code: 'input Test { item: String }',
      options: [{ types: 'PascalCase', InputValueDefinition: 'camelCase' }],
    },
    'input test { item: String } enum B { Test } interface A { i: String } fragment PictureFragment on Picture { uri } scalar Hello',
    {
      code: 'type TypeOne { aField: String } enum Z { VALUE_ONE VALUE_TWO }',
      options: [
        {
          types: { style: 'PascalCase' },
          FieldDefinition: { style: 'camelCase', suffix: 'Field' },
          EnumValueDefinition: { style: 'UPPER_CASE', suffix: '' },
        },
      ],
    },
    {
      code: 'type One { fieldA: String } enum Z { ENUM_VALUE_ONE ENUM_VALUE_TWO }',
      options: [
        {
          types: { style: 'PascalCase' },
          FieldDefinition: { style: 'camelCase', prefix: 'field' },
          EnumValueDefinition: { style: 'UPPER_CASE', prefix: 'ENUM_VALUE_' },
        },
      ],
    },
    {
      code: 'type One { fieldA: String } type Query { QUERY_A(id: ID!): String }',
      options: [
        {
          'FieldDefinition[parent.name.value=Query]': { style: 'UPPER_CASE', prefix: 'QUERY' },
          'FieldDefinition[parent.name.value!=Query]': { style: 'camelCase', prefix: 'field' },
        },
      ],
    },
    {
      code: 'query { foo }',
      options: [{ OperationDefinition: { style: 'PascalCase' } }],
    },
    '{ test { __typename ok_ } }',
    {
      name: 'should ignore fields',
      code: /* GraphQL */ `
        type Test {
          EU: ID
          EUIntlFlag: ID
          IE: ID
          IEIntlFlag: ID
          GB: ID
          UKFlag: ID
          UKService_Badge: ID
          CCBleaching: ID
          CCDryCleaning: ID
          CCIroning: ID
          UPC: ID
          CMWA: ID
          EAN13: ID
        }
      `,
      options: [
        {
          FieldDefinition: {
            style: 'camelCase',
            ignorePattern: '^(EU|IE|GB|UK|CC|UPC|CMWA|EAN13)',
          },
        },
      ],
    },
    {
      code: 'type _FieldSet { _uri: String }',
      options: [{ types: { style: 'PascalCase', ignorePattern: '^(_FieldSet)' }, FieldDefinition: { style: 'camelCase', ignorePattern: '^(_uri)' } }],
    },
    {
      code: /* GraphQL */ `
      scalar _FieldSet
      directive @requires(fields: _FieldSet!) on FIELD_DEFINITION
      type MyObject { _uri: String }
      `,
      options: [{ 
        types: { style: 'PascalCase', ignorePattern: '^(_FieldSet)' },
        FieldDefinition: { style: 'camelCase', ignorePattern: '^(_uri)' } }],
    },
  ],
  invalid: [
    {
      code: 'type b { test: String }',
      options: [{ types: 'PascalCase', FieldDefinition: 'PascalCase' }],
      errors: [
        { message: 'Type "b" should be in PascalCase format' },
        { message: 'Field "test" should be in PascalCase format' },
      ],
    },
    {
      code: 'type __b { test__: String }',
      options: [{ allowLeadingUnderscore: false, allowTrailingUnderscore: false }],
      errors: [{ message: 'Leading underscores are not allowed' }, { message: 'Trailing underscores are not allowed' }],
    },
    {
      code: 'scalar BSONDecimal',
      options: [{ ScalarTypeDefinition: 'snake_case' }],
      errors: [{ message: 'Scalar "BSONDecimal" should be in snake_case format' }],
    },
    {
      name: 'large graphql file',
      code: ruleTester.fromMockFile('large.graphql'),
      options: [
        {
          allowLeadingUnderscore: true,
          types: 'PascalCase',
          InputValueDefinition: 'camelCase',
          EnumValueDefinition: 'UPPER_CASE',
          FragmentDefinition: 'PascalCase',
        },
      ],
      errors: [
        { message: 'Input type "_idOperatorsFilterFindManyUserInput" should be in PascalCase format' },
        { message: 'Input type "_idOperatorsFilterFindOneUserInput" should be in PascalCase format' },
        { message: 'Input type "_idOperatorsFilterRemoveManyUserInput" should be in PascalCase format' },
        { message: 'Input type "_idOperatorsFilterRemoveOneUserInput" should be in PascalCase format' },
        { message: 'Input type "_idOperatorsFilterUpdateManyUserInput" should be in PascalCase format' },
        { message: 'Input type "_idOperatorsFilterUpdateOneUserInput" should be in PascalCase format' },
        { message: 'Input type "_idOperatorsFilterUserInput" should be in PascalCase format' },
        { message: 'Enumeration value "male" should be in UPPER_CASE format' },
        { message: 'Enumeration value "female" should be in UPPER_CASE format' },
        { message: 'Enumeration value "ladyboy" should be in UPPER_CASE format' },
        { message: 'Enumeration value "basic" should be in UPPER_CASE format' },
        { message: 'Enumeration value "fluent" should be in UPPER_CASE format' },
        { message: 'Enumeration value "native" should be in UPPER_CASE format' },
        { message: 'Input property "OR" should be in camelCase format' },
        { message: 'Input property "AND" should be in camelCase format' },
        { message: 'Input property "OR" should be in camelCase format' },
        { message: 'Input property "AND" should be in camelCase format' },
        { message: 'Input property "OR" should be in camelCase format' },
        { message: 'Input property "AND" should be in camelCase format' },
        { message: 'Input property "OR" should be in camelCase format' },
        { message: 'Input property "AND" should be in camelCase format' },
        { message: 'Input property "OR" should be in camelCase format' },
        { message: 'Input property "AND" should be in camelCase format' },
        { message: 'Input property "OR" should be in camelCase format' },
        { message: 'Input property "AND" should be in camelCase format' },
        { message: 'Input property "OR" should be in camelCase format' },
        { message: 'Input property "AND" should be in camelCase format' },
      ],
    },
    {
      code: 'enum B { test }',
      options: [
        {
          EnumTypeDefinition: 'camelCase',
          EnumValueDefinition: 'UPPER_CASE',
        },
      ],
      errors: [
        { message: 'Enumerator "B" should be in camelCase format' },
        { message: 'Enumeration value "test" should be in UPPER_CASE format' },
      ],
    },
    {
      code: 'input test { _Value: String }',
      options: [{ types: 'PascalCase', InputValueDefinition: 'snake_case' }],
      errors: [
        { message: 'Input type "test" should be in PascalCase format' },
        { message: 'Input property "_Value" should be in snake_case format' },
        { message: 'Leading underscores are not allowed' },
      ],
    },
    {
      code: 'type TypeOne { aField: String } enum Z { VALUE_ONE VALUE_TWO }',
      options: [
        {
          ObjectTypeDefinition: { style: 'camelCase' },
          FieldDefinition: { style: 'camelCase', suffix: 'AAA' },
          EnumValueDefinition: { style: 'camelCase', suffix: 'ENUM' },
        },
      ],
      errors: [
        { message: 'Type "TypeOne" should be in camelCase format' },
        { message: 'Field "aField" should have "AAA" suffix' },
        { message: 'Enumeration value "VALUE_ONE" should have "ENUM" suffix' },
        { message: 'Enumeration value "VALUE_TWO" should have "ENUM" suffix' },
      ],
    },
    {
      code: 'type One { aField: String } enum Z { A_ENUM_VALUE_ONE VALUE_TWO }',
      options: [
        {
          ObjectTypeDefinition: { style: 'PascalCase' },
          FieldDefinition: { style: 'camelCase', prefix: 'Field' },
          EnumValueDefinition: { style: 'UPPER_CASE', prefix: 'ENUM' },
        },
      ],
      errors: [
        { message: 'Field "aField" should have "Field" prefix' },
        { message: 'Enumeration value "A_ENUM_VALUE_ONE" should have "ENUM" prefix' },
        { message: 'Enumeration value "VALUE_TWO" should have "ENUM" prefix' },
      ],
    },
    {
      code: 'type One { getFoo: String, queryBar: String } type Query { getA(id: ID!): String, queryB: String } extend type Query { getC: String }',
      options: [
        {
          ObjectTypeDefinition: { style: 'PascalCase', forbiddenPrefixes: ['On'] },
          FieldDefinition: {
            style: 'camelCase',
            forbiddenPrefixes: ['foo', 'bar'],
            forbiddenSuffixes: ['Foo'],
          },
          'FieldDefinition[parent.name.value=Query]': {
            style: 'camelCase',
            forbiddenPrefixes: ['get', 'query'],
          },
        },
      ],
      errors: [
        { message: 'Type "One" should not have "On" prefix' },
        { message: 'Field "getFoo" should not have "Foo" suffix' },
        { message: 'Field "getA" should not have "get" prefix' },
        { message: 'Field "queryB" should not have "query" prefix' },
        { message: 'Field "getC" should not have "get" prefix' },
      ],
    },
    {
      code: 'query Foo { foo } query getBar { bar }',
      options: [{ OperationDefinition: { style: 'camelCase', forbiddenPrefixes: ['get'] } }],
      errors: [
        { message: 'Operation "Foo" should be in camelCase format' },
        { message: 'Operation "getBar" should not have "get" prefix' },
      ],
    },
    {
      name: 'schema-recommended config',
      code: /* GraphQL */ `
        type Query {
          fieldQuery: ID
          queryField: ID
          getField: ID
        }

        type Mutation {
          fieldMutation: ID
          mutationField: ID
        }

        type Subscription {
          fieldSubscription: ID
          subscriptionField: ID
        }
      `,
      options: (rule.meta.docs.configOptions as any).schema,
      errors: [
        { message: 'Field "fieldQuery" should not have "Query" suffix' },
        { message: 'Field "queryField" should not have "query" prefix' },
        { message: 'Field "getField" should not have "get" prefix' },
        { message: 'Field "fieldMutation" should not have "Mutation" suffix' },
        { message: 'Field "mutationField" should not have "mutation" prefix' },
        { message: 'Field "fieldSubscription" should not have "Subscription" suffix' },
        { message: 'Field "subscriptionField" should not have "subscription" prefix' },
      ],
    },
    {
      name: 'operations-recommended config',
      code: `
        query TestQuery { test }
        query QueryTest { test }
        query GetQuery { test }
        query Test { test(CONTROLLED_BY_SCHEMA: 0) }

        mutation TestMutation { test }
        mutation MutationTest { test }

        subscription TestSubscription { test }
        subscription SubscriptionTest { test }

        fragment TestFragment on Test { id }
        fragment FragmentTest on Test { id }
      `,
      options: (rule.meta.docs.configOptions as any).operations,
      errors: [
        { message: 'Operation "TestQuery" should not have "Query" suffix' },
        { message: 'Operation "QueryTest" should not have "Query" prefix' },
        { message: 'Operation "GetQuery" should not have "Get" prefix' },
        { message: 'Operation "TestMutation" should not have "Mutation" suffix' },
        { message: 'Operation "MutationTest" should not have "Mutation" prefix' },
        { message: 'Operation "TestSubscription" should not have "Subscription" suffix' },
        { message: 'Operation "SubscriptionTest" should not have "Subscription" prefix' },
        { message: 'Fragment "TestFragment" should not have "Fragment" suffix' },
        { message: 'Fragment "FragmentTest" should not have "Fragment" prefix' },
      ],
    },
    {
      name: 'should ignore selections fields but check alias renaming',
      code: /* GraphQL */ `
        {
          test {
            _badAlias: foo
            badAlias_: bar
            _ok
            ok_
          }
        }
      `,
      errors: [{ message: 'Leading underscores are not allowed' }, { message: 'Trailing underscores are not allowed' }],
    },
  ],
});
