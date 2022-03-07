// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
Code

       1 |         directive @directiveConnection(role: [RoleConnection!]!) on FIELD_DEFINITION
       2 |         scalar DateTimeConnection
       3 |         union DataConnection = UserConnection | PostConnection
       4 |         extend union DataConnection = CommentConnection
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
      21 |         type PostConnection
      22 |         type CommentConnection

❌ Error 1/11

    > 1 |         directive @directiveConnection(role: [RoleConnection!]!) on FIELD_DEFINITION
        |                    ^^^^^^^^^^^^^^^^^^^ Connection type must be an "Object" type.
      2 |         scalar DateTimeConnection

❌ Error 2/11

      1 |         directive @directiveConnection(role: [RoleConnection!]!) on FIELD_DEFINITION
    > 2 |         scalar DateTimeConnection
        |                ^^^^^^^^^^^^^^^^^^ Connection type must be an "Object" type.
      3 |         union DataConnection = UserConnection | PostConnection

❌ Error 3/11

      2 |         scalar DateTimeConnection
    > 3 |         union DataConnection = UserConnection | PostConnection
        |               ^^^^^^^^^^^^^^ Connection type must be an "Object" type.
      4 |         extend union DataConnection = CommentConnection

❌ Error 4/11

      3 |         union DataConnection = UserConnection | PostConnection
    > 4 |         extend union DataConnection = CommentConnection
        |                      ^^^^^^^^^^^^^^ Connection type must be an "Object" type.
      5 |         input CreateUserConnection

❌ Error 5/11

      4 |         extend union DataConnection = CommentConnection
    > 5 |         input CreateUserConnection
        |               ^^^^^^^^^^^^^^^^^^^^ Connection type must be an "Object" type.
      6 |         extend input CreateUserConnection {

❌ Error 6/11

      5 |         input CreateUserConnection
    > 6 |         extend input CreateUserConnection {
        |                      ^^^^^^^^^^^^^^^^^^^^ Connection type must be an "Object" type.
      7 |           firstName: String

❌ Error 7/11

       8 |         }
    >  9 |         enum RoleConnection
         |              ^^^^^^^^^^^^^^ Connection type must be an "Object" type.
      10 |         extend enum RoleConnection {

❌ Error 8/11

       9 |         enum RoleConnection
    > 10 |         extend enum RoleConnection {
         |                     ^^^^^^^^^^^^^^ Connection type must be an "Object" type.
      11 |           ADMIN

❌ Error 9/11

      12 |         }
    > 13 |         interface NodeConnection
         |                   ^^^^^^^^^^^^^^ Connection type must be an "Object" type.
      14 |         extend interface NodeConnection {

❌ Error 10/11

      13 |         interface NodeConnection
    > 14 |         extend interface NodeConnection {
         |                          ^^^^^^^^^^^^^^ Connection type must be an "Object" type.
      15 |           id: ID!

❌ Error 11/11

      16 |         }
    > 17 |         extend type UserConnection {
         |                     ^^^^^^^^^^^^^^ Connection type must be an "Object" type.
      18 |           role: RoleConnection
`;
