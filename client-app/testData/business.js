import { GET_BUSINESS } from "../src/pages/ListView";

const businessData = [
  {
    request: { query: GET_BUSINESS, variables: { term: "" } },
    result: {
      data: {
        business: [
          {
            name: "Zachary's Chicago Pizza",
            price: "$$",
            id: "JsqK99Ka8gIgu1ZtzDupRg",
            location: {
              __typename: "Location",
              city: "Oakland",
              state: "CA",
            },
            rating: 4.5,
            photos: [
              "https://s3-media3.fl.yelpcdn.com/bphoto/Wb0SdHS4sW6w_FJyPk5dTg/o.jpg",
            ],
            categories: [
              {
                title: "Pizza",
              },
              {
                title: "Comfort Food",
              },
            ],
          },
        ],
      },
    },
  },
];

export default businessData;
