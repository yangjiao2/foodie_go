const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    getLunchSpin(
      location: String!
      categories: String!
      radius: Float!
      price: String!
    ): LunchSpin
    categories: [Category]
  }
  type LunchSpin {
    lunches: [Business]!
    winner: Business!
  }
  type Business {
    id: String!
    name: String!
    url: String!
    display_phone: String
    review_count: Int
    rating: Float
    price: String
    location: Location
    photos: [String]
    distance: Float
  }
  type Location {
    address1: String
    city: String
    state: String
    postal_code: String
  }
  type Category {
    title: String!
    alias: String!
  }
`;

module.exports;
