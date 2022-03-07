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
        |                    ^^^^^^^^^^^^^^^^^^^ Connection type must be an "Object" type.
      2 |         scalar DateTimeConnection

❌ Error 2/13

      1 |         directive @directiveConnection(role: [RoleConnection!]!) on FIELD_DEFINITION
    > 2 |         scalar DateTimeConnection
        |                ^^^^^^^^^^^^^^^^^^ Connection type must be an "Object" type.
      3 |         union DataConnection = UserConnection | Post

❌ Error 3/13

      2 |         scalar DateTimeConnection
    > 3 |         union DataConnection = UserConnection | Post
        |               ^^^^^^^^^^^^^^ Connection type must be an "Object" type.
      4 |         extend union DataConnection = Comment

❌ Error 4/13

      3 |         union DataConnection = UserConnection | Post
    > 4 |         extend union DataConnection = Comment
        |                      ^^^^^^^^^^^^^^ Connection type must be an "Object" type.
      5 |         input CreateUserConnection

❌ Error 5/13

      4 |         extend union DataConnection = Comment
    > 5 |         input CreateUserConnection
        |               ^^^^^^^^^^^^^^^^^^^^ Connection type must be an "Object" type.
      6 |         extend input CreateUserConnection {

❌ Error 6/13

      5 |         input CreateUserConnection
    > 6 |         extend input CreateUserConnection {
        |                      ^^^^^^^^^^^^^^^^^^^^ Connection type must be an "Object" type.
      7 |           firstName: String

❌ Error 7/13

       8 |         }
    >  9 |         enum RoleConnection
         |              ^^^^^^^^^^^^^^ Connection type must be an "Object" type.
      10 |         extend enum RoleConnection {

❌ Error 8/13

       9 |         enum RoleConnection
    > 10 |         extend enum RoleConnection {
         |                     ^^^^^^^^^^^^^^ Connection type must be an "Object" type.
      11 |           ADMIN

❌ Error 9/13

      12 |         }
    > 13 |         interface NodeConnection
         |                   ^^^^^^^^^^^^^^ Connection type must be an "Object" type.
      14 |         extend interface NodeConnection {

❌ Error 10/13

      13 |         interface NodeConnection
    > 14 |         extend interface NodeConnection {
         |                          ^^^^^^^^^^^^^^ Connection type must be an "Object" type.
      15 |           id: ID!

❌ Error 11/13

      16 |         }
    > 17 |         extend type UserConnection {
         |                     ^^^^^^^^^^^^^^ Connection type must be an "Object" type.
      18 |           role: RoleConnection

❌ Error 12/13

      19 |         }
    > 20 |         type UserConnection
         |              ^^^^^^^^^^^^^^ Connection type must contain a field \`edges\`.
      21 |         type Post

❌ Error 13/13

      19 |         }
    > 20 |         type UserConnection
         |              ^^^^^^^^^^^^^^ Connection type must contain a field \`pageInfo\`.
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

    > 1 | type UserConnection { pageInfo: PageInfo }
        |      ^^^^^^^^^^^^^^ Connection type must contain a field \`edges\`.
`;

exports[` 4`] = `
❌ Error

    > 1 | type UserConnection { edges: [UserEdge] }
        |      ^^^^^^^^^^^^^^ Connection type must contain a field \`pageInfo\`.
`;

exports[` 5`] = `
Code

      1 |         type UserConnection {
      2 |           edges: UserEdge
      3 |           pageInfo: PageInfo
      4 |         }
      5 |         type PostConnection {
      6 |           edges: PostEdge!
      7 |           pageInfo: PageInfo
      8 |         }

❌ Error 1/2

      1 |         type UserConnection {
    > 2 |           edges: UserEdge
        |                  ^^^^^^^^ \`edges\` field must return a list type.
      3 |           pageInfo: PageInfo

❌ Error 2/2

      5 |         type PostConnection {
    > 6 |           edges: PostEdge!
        |                  ^^^^^^^^ \`edges\` field must return a list type.
      7 |           pageInfo: PageInfo
`;
