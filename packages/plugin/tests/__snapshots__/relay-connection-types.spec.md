// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
Code

       1 |         directive @directiveConnection(role: [RoleConnection!]!) on FIELD_DEFINITION
       2 |         scalar DateTimeConnection
       3 |         union DataConnection = UserConnection | Post
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
      17 |         extend type UserConnection {
      18 |           role: RoleConnection
      19 |         }
      20 |         type UserConnection
      21 |         type Post
      22 |         type Comment

❌ Error 1/13

    > 1 |         directive @directiveConnection(role: [RoleConnection!]!) on FIELD_DEFINITION
        |                    ^^^^^^^^^^^^^^^^^^^ Connection type must be an Object type.
      2 |         scalar DateTimeConnection

❌ Error 2/13

      1 |         directive @directiveConnection(role: [RoleConnection!]!) on FIELD_DEFINITION
    > 2 |         scalar DateTimeConnection
        |                ^^^^^^^^^^^^^^^^^^ Connection type must be an Object type.
      3 |         union DataConnection = UserConnection | Post

❌ Error 3/13

      2 |         scalar DateTimeConnection
    > 3 |         union DataConnection = UserConnection | Post
        |               ^^^^^^^^^^^^^^ Connection type must be an Object type.
      4 |         extend union DataConnection = Comment

❌ Error 4/13

      3 |         union DataConnection = UserConnection | Post
    > 4 |         extend union DataConnection = Comment
        |                      ^^^^^^^^^^^^^^ Connection type must be an Object type.
      5 |         input CreateUserConnection

❌ Error 5/13

      4 |         extend union DataConnection = Comment
    > 5 |         input CreateUserConnection
        |               ^^^^^^^^^^^^^^^^^^^^ Connection type must be an Object type.
      6 |         extend input CreateUserConnection {

❌ Error 6/13

      5 |         input CreateUserConnection
    > 6 |         extend input CreateUserConnection {
        |                      ^^^^^^^^^^^^^^^^^^^^ Connection type must be an Object type.
      7 |           firstName: String

❌ Error 7/13

       8 |         }
    >  9 |         enum RoleConnection
         |              ^^^^^^^^^^^^^^ Connection type must be an Object type.
      10 |         extend enum RoleConnection {

❌ Error 8/13

       9 |         enum RoleConnection
    > 10 |         extend enum RoleConnection {
         |                     ^^^^^^^^^^^^^^ Connection type must be an Object type.
      11 |           ADMIN

❌ Error 9/13

      12 |         }
    > 13 |         interface NodeConnection
         |                   ^^^^^^^^^^^^^^ Connection type must be an Object type.
      14 |         extend interface NodeConnection {

❌ Error 10/13

      13 |         interface NodeConnection
    > 14 |         extend interface NodeConnection {
         |                          ^^^^^^^^^^^^^^ Connection type must be an Object type.
      15 |           id: ID!

❌ Error 11/13

      16 |         }
    > 17 |         extend type UserConnection {
         |                     ^^^^^^^^^^^^^^ Connection type must be an Object type.
      18 |           role: RoleConnection

❌ Error 12/13

      19 |         }
    > 20 |         type UserConnection
         |              ^^^^^^^^^^^^^^ Connection type must contain a field \`edges\` that return a list type.
      21 |         type Post

❌ Error 13/13

      19 |         }
    > 20 |         type UserConnection
         |              ^^^^^^^^^^^^^^ Connection type must contain a field \`pageInfo\` that return a non-null \`PageInfo\` Object type.
      21 |         type Post
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

exports[` 7`] = `
❌ Error

    > 1 | directive @PageInfo on FIELD_DEFINITION
        |            ^^^^^^^^ \`PageInfo\` must be an Object type.
`;

exports[` 8`] = `
❌ Error

    > 1 | scalar PageInfo
        |        ^^^^^^^^ \`PageInfo\` must be an Object type.
`;

exports[` 9`] = `
Code

      1 |         union PageInfo = UserConnection | Post
      2 |         extend union PageInfo = Comment
      3 |         type UserConnection {
      4 |           edges: [UserEdge]
      5 |           pageInfo: PageInfo!
      6 |         }
      7 |         type Post
      8 |         type Comment

❌ Error 1/2

    > 1 |         union PageInfo = UserConnection | Post
        |               ^^^^^^^^ \`PageInfo\` must be an Object type.
      2 |         extend union PageInfo = Comment

❌ Error 2/2

      1 |         union PageInfo = UserConnection | Post
    > 2 |         extend union PageInfo = Comment
        |                      ^^^^^^^^ \`PageInfo\` must be an Object type.
      3 |         type UserConnection {
`;

exports[` 10`] = `
Code

      1 |         input PageInfo
      2 |         extend input PageInfo {
      3 |           hasPreviousPage: Boolean!
      4 |           hasNextPage: Boolean!
      5 |           startCursor: String!
      6 |           endCursor: String!
      7 |         }

❌ Error 1/2

    > 1 |         input PageInfo
        |               ^^^^^^^^ \`PageInfo\` must be an Object type.
      2 |         extend input PageInfo {

❌ Error 2/2

      1 |         input PageInfo
    > 2 |         extend input PageInfo {
        |                      ^^^^^^^^ \`PageInfo\` must be an Object type.
      3 |           hasPreviousPage: Boolean!
`;

exports[` 11`] = `
Code

      1 |         enum PageInfo
      2 |         extend enum PageInfo {
      3 |           hasPreviousPage
      4 |           hasNextPage
      5 |           startCursor
      6 |           endCursor
      7 |         }

❌ Error 1/2

    > 1 |         enum PageInfo
        |              ^^^^^^^^ \`PageInfo\` must be an Object type.
      2 |         extend enum PageInfo {

❌ Error 2/2

      1 |         enum PageInfo
    > 2 |         extend enum PageInfo {
        |                     ^^^^^^^^ \`PageInfo\` must be an Object type.
      3 |           hasPreviousPage
`;

exports[` 12`] = `
Code

      1 |         interface PageInfo
      2 |         extend interface PageInfo {
      3 |           hasPreviousPage: Boolean!
      4 |           hasNextPage: Boolean!
      5 |           startCursor: String!
      6 |           endCursor: String!
      7 |         }

❌ Error 1/2

    > 1 |         interface PageInfo
        |                   ^^^^^^^^ \`PageInfo\` must be an Object type.
      2 |         extend interface PageInfo {

❌ Error 2/2

      1 |         interface PageInfo
    > 2 |         extend interface PageInfo {
        |                          ^^^^^^^^ \`PageInfo\` must be an Object type.
      3 |           hasPreviousPage: Boolean!
`;

exports[` 13`] = `
❌ Error

    > 1 |         extend type PageInfo {
        |                     ^^^^^^^^ \`PageInfo\` must be an Object type.
      2 |           hasPreviousPage: Boolean!
      3 |           hasNextPage: Boolean!
      4 |           startCursor: String!
      5 |           endCursor: String!
      6 |         }
`;
