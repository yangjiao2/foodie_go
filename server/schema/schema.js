const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Location {
    state: String
    city: String
  }
  type Business {
    id: String
    name: String
    rating: Float
    price: String
    location: Location
    categories: [Category]
    photos: [String]
  }
  type Category {
    title: String!
    alias: String!
  }
  type Query {
    business(term: String): [Business]
    categories: [Category]
  }
`;

module.exports = { typeDefs };
