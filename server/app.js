const { ApolloServer, gql } = require("apollo-server");
const db = require("./util/db");
const { fetchYelpGql } = require("./util/service");
const { typeDefs } = require("./schema/schema");
const constants = require("./assets/constants");

const resolvers = {
  Query: {
    business: (_parent, args, _context) => {
      try {
        /*
          fetch to Yelp Api with pre-defined query fields;
          if fields are updated against unique yelpid field,
          will update database (located in db/database.db)
        */
        return fetchYelpGql(args.term ?? "", "bay area")
          .then((res) => {
            db.upsertMultiple(res.data.search.business);
            return res.data.search.business;
          })
          .catch((err) =>
            console.error(
              "Error: Encounter problem fetch resource from Yelp.",
              err
            )
          );
      } catch (error) {
        throw error;
      }
    },
    /*
      return category information from our assets
    */
    categories: () => {
      return constants.categories;
    },
  },
};

/*
  this Cross-Origin Resource Sharing restriction can be used
  to limit access to our server database, if it is provided to 
  Apollo server, we will be able to limit our reponse to only localhost:3000 port. 

  If we want to test and query the database from frontend (localhost:4000),
  we will need to remove cors below in our server setup
*/
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // cors: corsOptions,
});

server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`));
