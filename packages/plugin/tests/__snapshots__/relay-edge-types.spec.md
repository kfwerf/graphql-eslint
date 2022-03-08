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
