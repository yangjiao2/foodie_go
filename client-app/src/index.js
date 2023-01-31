import React from "react";
// import ReactDOM from "react-dom";
// import ApolloClient from "apollo-boost";
// import { ApolloProvider } from "@apollo/react-hooks";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

// import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
// import { onError } from "@apollo/client/link/error";
// import { setContext } from "@apollo/client/link/context";
// import config from "../../common/config";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       query ExampleQuery {
//         business {
//           name
//           price
//           id
//           location {
//             city
//             state
//           }
//           rating
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));
// const httpLink = new HttpLink({
//   uri: "https://api.yelp.com/v3/graphql",
//   credentials: "include",
// });

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.forEach(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       )
//     );

//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });

// const authLink = setContext((_, { headers }) => {
//   const token = config.YELP_API_KEY;
//   // const token =
//   //     "6EmS4TSTG9DH-7NPwTAqvs0hafEIVeJi0_8f2KngMjwpGIF4nYSurfJOsofff1CQABmyh1TCBHzEfOJ7vsvmoAK9kq7k9gTO9Dem1V6Y1OAkhFEYh1KLjf9avT50YXYx";
//   return {
//     headers: {
//       ...headers,
//       authorization: `Bearer ${token}`,
//       "accept-language": "en_US",
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Headers": "*",
//       Accept: "application/json",
//       "Access-Control-Allow-Credentials": "true",
//       "Content-Type": "application/json",
//       "x-requested-with": "xmlhttprequest",
//     },
//   };
// });

// const yelpClient = new ApolloClient({
//   link: authLink.concat(from([errorLink, httpLink])),
//   cache: new InMemoryCache(),
// });

// console.log(client);

// ReactDOM.render(
//   <React.StrictMode>
//     <ApolloProvider client={client}>
//       <App />
//     </ApolloProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
