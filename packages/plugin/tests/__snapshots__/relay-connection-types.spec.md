// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
Code

       1 |         directive @directiveConnection(role: [RoleConnection!]!) on FIELD_DEFINITION
       2 |         scalar DateTimeConnection
       3 |         union DataConnection = Post
       4 |         extend union DataConnection = Comment
       5 |         input CreateUserConnection
       6 |         extend input CreateUserConnection {
       7 |           firstName: String
       8 |         }
       9 |         enum RoleConnection
      10 |         extend enum RoleConnection {
      11 |           ADMIN
      12 |         }
      13 |         interface NodeConnection
      14 |         extend interface NodeConnection {
      15 |           id: ID!
      16 |         }
      17 |         type Post
      18 |         type Comment

❌ Error 1/10

    > 1 |         directive @directiveConnection(role: [RoleConnection!]!) on FIELD_DEFINITION
        |                    ^^^^^^^^^^^^^^^^^^^ Connection type must be an Object type.
      2 |         scalar DateTimeConnection

❌ Error 2/10

      1 |         directive @directiveConnection(role: [RoleConnection!]!) on FIELD_DEFINITION
    > 2 |         scalar DateTimeConnection
        |                ^^^^^^^^^^^^^^^^^^ Connection type must be an Object type.
      3 |         union DataConnection = Post

❌ Error 3/10

      2 |         scalar DateTimeConnection
    > 3 |         union DataConnection = Post
        |               ^^^^^^^^^^^^^^ Connection type must be an Object type.
      4 |         extend union DataConnection = Comment

❌ Error 4/10

      3 |         union DataConnection = Post
    > 4 |         extend union DataConnection = Comment
        |                      ^^^^^^^^^^^^^^ Connection type must be an Object type.
      5 |         input CreateUserConnection

❌ Error 5/10

      4 |         extend union DataConnection = Comment
    > 5 |         input CreateUserConnection
        |               ^^^^^^^^^^^^^^^^^^^^ Connection type must be an Object type.
      6 |         extend input CreateUserConnection {

❌ Error 6/10

      5 |         input CreateUserConnection
    > 6 |         extend input CreateUserConnection {
        |                      ^^^^^^^^^^^^^^^^^^^^ Connection type must be an Object type.
      7 |           firstName: String

❌ Error 7/10

       8 |         }
    >  9 |         enum RoleConnection
         |              ^^^^^^^^^^^^^^ Connection type must be an Object type.
      10 |         extend enum RoleConnection {

❌ Error 8/10

       9 |         enum RoleConnection
    > 10 |         extend enum RoleConnection {
         |                     ^^^^^^^^^^^^^^ Connection type must be an Object type.
      11 |           ADMIN

❌ Error 9/10

      12 |         }
    > 13 |         interface NodeConnection
         |                   ^^^^^^^^^^^^^^ Connection type must be an Object type.
      14 |         extend interface NodeConnection {

❌ Error 10/10

      13 |         interface NodeConnection
    > 14 |         extend interface NodeConnection {
         |                          ^^^^^^^^^^^^^^ Connection type must be an Object type.
      15 |           id: ID!
`;

exports[` 2`] = `
❌ Error

    > 1 |         type User {
        |              ^^^^ Connection type must have \`Connection\` suffix.
      2 |           edges: UserEdge
      3 |           pageInfo: PageInfo
      4 |         }
`;

exports[` 3`] = `
❌ Error

    > 1 | type UserConnection { pageInfo: PageInfo! }
        |      ^^^^^^^^^^^^^^ Connection type must contain a field \`edges\` that return a list type.
`;

exports[` 4`] = `
❌ Error

    > 1 | type UserConnection { edges: [UserEdge] }
        |      ^^^^^^^^^^^^^^ Connection type must contain a field \`pageInfo\` that return a non-null \`PageInfo\` Object type.
`;

exports[` 5`] = `
Code

      1 |         type AConnection {
      2 |           edges: AEdge
      3 |           pageInfo: PageInfo!
      4 |         }
      5 |         type BConnection {
      6 |           edges: BEdge!
      7 |           pageInfo: PageInfo!
      8 |         }

❌ Error 1/2

      1 |         type AConnection {
    > 2 |           edges: AEdge
        |                  ^^^^^ \`edges\` field must return a list type.
      3 |           pageInfo: PageInfo!

❌ Error 2/2

      5 |         type BConnection {
    > 6 |           edges: BEdge!
        |                  ^^^^^ \`edges\` field must return a list type.
      7 |           pageInfo: PageInfo!
`;

exports[` 6`] = `
Code

       1 |         type AConnection {
       2 |           edges: [AEdge]
       3 |           pageInfo: PageInfo
       4 |         }
       5 |         type BConnection {
       6 |           edges: [BEdge]
       7 |           pageInfo: [PageInfo]
       8 |         }
       9 |         type CConnection {
      10 |           edges: [CEdge]
      11 |           pageInfo: [PageInfo!]
      12 |         }
      13 |         type DConnection {
      14 |           edges: [DEdge]
      15 |           pageInfo: [PageInfo]!
      16 |         }
      17 |         type EConnection {
      18 |           edges: [EEdge]
      19 |           pageInfo: [PageInfo!]!
      20 |         }

❌ Error 1/5

      2 |           edges: [AEdge]
    > 3 |           pageInfo: PageInfo
        |                     ^^^^^^^^ \`pageInfo\` field must return a non-null \`PageInfo\` Object type.
      4 |         }

❌ Error 2/5

      6 |           edges: [BEdge]
    > 7 |           pageInfo: [PageInfo]
        |                     ^^^^^^^^^ \`pageInfo\` field must return a non-null \`PageInfo\` Object type.
      8 |         }

❌ Error 3/5

      10 |           edges: [CEdge]
    > 11 |           pageInfo: [PageInfo!]
         |                     ^^^^^^^^^^ \`pageInfo\` field must return a non-null \`PageInfo\` Object type.
      12 |         }

❌ Error 4/5

      14 |           edges: [DEdge]
    > 15 |           pageInfo: [PageInfo]!
         |                     ^^^^^^^^^^ \`pageInfo\` field must return a non-null \`PageInfo\` Object type.
      16 |         }

❌ Error 5/5

      18 |           edges: [EEdge]
    > 19 |           pageInfo: [PageInfo!]!
         |                     ^^^^^^^^^^^ \`pageInfo\` field must return a non-null \`PageInfo\` Object type.
      20 |         }
`;
