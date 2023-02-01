import React, { useState, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import Card from "./components/Card";
import Header from './components/Header';
import sortResultsByCateogry from './utils/sortResults';
import ListView from './pages/ListView';
import { LOADING_MESSAGE, ERROR_MESSAGE } from "../src/utils/constants";

import "./styles/App.css";

export const GET_BUSINESS = gql`
  query ($term: String) {
    business (term: $term){
      name
      price
      id
      location {
        city
        state
      }
      rating
      photos
      categories {
        title
      }
    }
  }
`;


function App() {

  const { loading, error, data } = useQuery(GET_BUSINESS, {
    variables: { term: "" },
  });

  const [category, setCategories] = useState("");
  const businessLst = useMemo(() => sortResultsByCateogry(data?.business ?? [], "categories", category), [data, category]);

  if (error) return <h4>{ERROR_MESSAGE}</h4>;
  return (
    <div className="main-container">
      <Header
        setCategories={setCategories}
        category={category}
      />
      {loading && <h4>{LOADING_MESSAGE}</h4>}
      {data !== undefined && <ListView
        dataSource={businessLst}
        filterCategory={category}
      />}
    </div>
  );
}

export default App;
