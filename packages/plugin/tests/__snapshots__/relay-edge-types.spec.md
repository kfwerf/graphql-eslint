// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[` 1`] = `
Code

       1 |         type PageInfo
       2 |         type BConnection
       3 |         type DConnection
       4 |         scalar AEdge
       5 |         union BEdge = PageInfo
       6 |         enum CEdge
       7 |         interface DEdge
       8 |         type AConnection {
       9 |           edges: [AEdge]
      10 |           pageInfo: PageInfo!
      11 |         }
      12 |         extend type BConnection {
      13 |           edges: [BEdge!]
      14 |           pageInfo: PageInfo!
      15 |         }
      16 |         type CConnection {
      17 |           edges: [CEdge]!
      18 |           pageInfo: PageInfo!
      19 |         }
      20 |         extend type DConnection {
      21 |           edges: [DEdge!]!
      22 |           pageInfo: PageInfo!
      23 |         }

❌ Error 1/4

       8 |         type AConnection {
    >  9 |           edges: [AEdge]
         |                   ^^^^^ Edge type must be an Object type
      10 |           pageInfo: PageInfo!

❌ Error 2/4

      12 |         extend type BConnection {
    > 13 |           edges: [BEdge!]
         |                   ^^^^^ Edge type must be an Object type
      14 |           pageInfo: PageInfo!

❌ Error 3/4

      16 |         type CConnection {
    > 17 |           edges: [CEdge]!
         |                   ^^^^^ Edge type must be an Object type
      18 |           pageInfo: PageInfo!

❌ Error 4/4

      20 |         extend type DConnection {
    > 21 |           edges: [DEdge!]!
         |                   ^^^^^ Edge type must be an Object type
      22 |           pageInfo: PageInfo!
`;

exports[` 2`] = `
Code

      1 |         type PageInfo
      2 |         type AEdge
      3 |         type AConnection {
      4 |           edges: [AEdge]
      5 |           pageInfo: PageInfo!
      6 |         }

❌ Error 1/2

      1 |         type PageInfo
    > 2 |         type AEdge
        |              ^^^^^ Edge type must contain a field \`node\` that return either a Scalar, Enum, Object, Interface, Union, or a non-null wrapper around one of those types.
      3 |         type AConnection {

❌ Error 2/2

      1 |         type PageInfo
    > 2 |         type AEdge
        |              ^^^^^ Edge type must contain a field \`cursor\` that return either a String, Scalar, or a non-null wrapper wrapper around one of those types.
      3 |         type AConnection {
`;

exports[` 3`] = `
Code

      1 |         type PageInfo
      2 |         type AEdge {
      3 |           node: [PageInfo!]!
      4 |           cursor: [PageInfo!]!
      5 |         }
      6 |         type AConnection {
      7 |           edges: [AEdge]
      8 |           pageInfo: PageInfo!
      9 |         }

❌ Error 1/2

      2 |         type AEdge {
    > 3 |           node: [PageInfo!]!
        |           ^^^^ Field \`node\` must return either a Scalar, Enum, Object, Interface, Union, or a non-null wrapper around one of those types.
      4 |           cursor: [PageInfo!]!

❌ Error 2/2

      3 |           node: [PageInfo!]!
    > 4 |           cursor: [PageInfo!]!
        |           ^^^^^^ Field \`cursor\` must return either a String, Scalar, or a non-null wrapper wrapper around one of those types.
      5 |         }
`;
