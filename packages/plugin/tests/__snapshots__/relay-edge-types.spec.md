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

❌ Error 1/8

      3 |         type DConnection
    > 4 |         scalar AEdge
        |                ^^^^^ Edge type must be an Object type
      5 |         union BEdge = PageInfo

❌ Error 2/8

      4 |         scalar AEdge
    > 5 |         union BEdge = PageInfo
        |               ^^^^^ Edge type must be an Object type
      6 |         enum CEdge

❌ Error 3/8

      5 |         union BEdge = PageInfo
    > 6 |         enum CEdge
        |              ^^^^^ Edge type must be an Object type
      7 |         interface DEdge

❌ Error 4/8

      6 |         enum CEdge
    > 7 |         interface DEdge
        |                   ^^^^^ Edge type must be an Object type
      8 |         type AConnection {

❌ Error 5/8

       8 |         type AConnection {
    >  9 |           edges: [AEdge]
         |                   ^^^^^ Edge type must be an Object type
      10 |           pageInfo: PageInfo!

❌ Error 6/8

      12 |         extend type BConnection {
    > 13 |           edges: [BEdge!]
         |                   ^^^^^ Edge type must be an Object type
      14 |           pageInfo: PageInfo!

❌ Error 7/8

      16 |         type CConnection {
    > 17 |           edges: [CEdge]!
         |                   ^^^^^ Edge type must be an Object type
      18 |           pageInfo: PageInfo!

❌ Error 8/8

      20 |         extend type DConnection {
    > 21 |           edges: [DEdge!]!
         |                   ^^^^^ Edge type must be an Object type
      22 |           pageInfo: PageInfo!
`;
