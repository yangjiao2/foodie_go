import { GraphQLClient, gql } from "graphql-request";

const query = (query, location) => `
    {
        search(term: "${searchQuery}",
                location: "${location}",
                limit: 10) {
            total
            business {
                id
                name
                url
                photos
                rating
                review_count
                reviews {
                    text
                }
                location {
                    city
                    state
                }
            }
        }
    }
`;

export default businessQuery = (location, category) =>
  gql`
{
    
    search(location: "` +
  location +
  `", limit: 8, categories: "` +
  category +
  `") {
        total
        business {
            id
            name
            url
            rating
            price
            location {
                address1
                address2
                address3
                city
                state
                postal_code
                country
                formatted_address
              }
        }
    }
}
`;
