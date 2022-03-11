// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
❌ Error

      1 |     type Query {
    > 2 |       item: OptionalItem
        |       ^^^^^^ The field \`Query.item\` is using union \`OptionalItem\` that is nullable, please add a \`!\`
      3 |     }

💡 Suggestion: Add a ! add the end of Query.item

    1 |     type Query {
    2 |       item: OptionalItem!
    3 |     }
`;
