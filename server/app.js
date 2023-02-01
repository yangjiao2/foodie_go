const { ApolloServer, gql } = require("apollo-server");
const db = require("./assets/constants");
const { gqlSearchRestaurants } = require("./service");
const { typeDefs } = require("./schema/schema");

const resolvers = {
  Query: {
    business: (_parent, args, _context) => {
      try {
        return gqlSearchRestaurants(args.term ?? "", "bay area")
          .then((restaurants) => {
            //   console.log("restaurants", restaurants.data.search.restaurants);
            return restaurants.data.search.restaurants;
          })
          .catch((err) => console.log(err));
      } catch (error) {
        throw error;
      }
    },
    categories: () => {
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
  // cors: corsOptions,
});

// console.log(
//   gqlSearchRestaurants("bbq", "bay area")
//     // .then(ans => console.log(ans));
//     .then((restaurants) => {
//       // console.log("kig", restaurants.data);
//       return restaurants;
//     })
//     // .then((filteredRestaurants) => res.status(200).json(filteredRestaurants))
//     .catch((err) => console.log(err))
// );

server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`));
