const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const db = require("./assets/constants");
const { gqlSearchRestaurants } = require("./service");

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
    business: [Business]
    categories: [Category]
  }
`;

const resolvers = {
  Query: {
    business: async () => {
      try {
        return gqlSearchRestaurants("", "bay area")
          .then((restaurants) => {
            //   console.log("restaurants", restaurants.data.search.restaurants);
            return restaurants.data.search.restaurants;
          })
          .catch((err) => console.log(err));
      } catch (error) {
        throw error;
      }
    },
    categories: async () => {
      return db.categories;
    },
  },
};

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: corsOptions,
});

console.log(
  gqlSearchRestaurants("bbq", "bay area")
    // .then(ans => console.log(ans));
    .then((restaurants) => {
      console.log("kig", restaurants.data);
      return restaurants;
    })
    // .then((filteredRestaurants) => res.status(200).json(filteredRestaurants))
    .catch((err) => console.log(err))
);
// server.post('/api/search/', (req, res, next) => {
//     const latitude = req.body.latitude;
//     const longitude = req.body.longitude;
//     const location = (req.body.location || null);
//     const term = req.body.term;
//     const radius = req.body.radius * 1609;

//     gqlSearchRestaurants(latitude, longitude, term, location, radius)
//     // .then(ans => console.log(ans));
//       .then(restaurants => {
//         return res.json(restaurants.data.search.restaurants);
//       })
//       .then(filteredRestaurants => res.status(200).json(filteredRestaurants))
//       .catch(err => console.log(err));

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
