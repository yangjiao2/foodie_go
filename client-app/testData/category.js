import { GET_CATEGORIES } from "../src/components/Header";

const categoryData = [
  {
    request: { query: GET_CATEGORIES },
    result: {
      data: {
        categories: [
          {
            title: "Asian Fusion",
          },
          {
            title: "Seafood",
          },
        ],
      },
    },
  },
];

export default categoryData;
