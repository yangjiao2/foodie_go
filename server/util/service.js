require("dotenv").config();
const fetch = require("node-fetch");
const db = require("../util/db");

const config = require("../assets/config");

/* 
  use yelp API to derive business data with defined schema structure.
  for more info, please go to https://docs.developer.yelp.com/docs/graphql-intro
*/
function fetchYelpGql(term, location, limit = 30, updateDB = true) {
  const queryLocation = `location: "${location}"`;
  const queryTerm = `term: "${term}"`;

  return fetch(config.YELP_API_ENDOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.YELP_API_KEY,
    },
    body: JSON.stringify({
      query: `{
          search( ${queryTerm}, ${queryLocation}, limit: ${limit}) {
            business {
              coordinates {
                latitude
                longitude
              }
              price
              photos
              id
              distance
              name
              rating
              location {
                city
                state
              }
              hours {
                open {
                  end
                  start
                  day
                }
              }
              reviews {
                text
                rating
                user {
                  name
                }
              }
              categories
               {
                title
                alias
              }
            }
          }
        }`,
    }),
  }).then((response) => {
    return response.json();
  });
}

module.exports = {
  fetchYelpGql,
};
