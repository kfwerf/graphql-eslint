# `relay-connection-types`

- Category: `Schema`
- Rule name: `@graphql-eslint/relay-connection-types`
- Requires GraphQL Schema: `false` [ℹ️](../../README.md#extended-linting-rules-with-graphql-schema)
- Requires GraphQL Operations: `false` [ℹ️](../../README.md#extended-linting-rules-with-siblings-operations)

Follow Relay specification for Connection types.
- Any type whose name ends in "Connection" is considered by spec to be a `Connection type`
- Connection types must be an "Object" type
- A "Connection type" must contain a field called `edges`. This field must return a list type that wraps an edge type
- A "Connection type" must contain a field called `pageInfo`. This field must return a non-null `PageInfo` object

## Usage Examples

### Incorrect

```graphql
# eslint @graphql-eslint/relay-connection-types: 'error'


```

### Correct

```graphql
# eslint @graphql-eslint/relay-connection-types: 'error'


```

## Resources

- [Rule source](../../packages/plugin/src/rules/relay-connection-types.ts)
- [Test source](../../packages/plugin/tests/relay-connection-types.spec.ts)
