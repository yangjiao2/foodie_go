import React, { useState, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import Card from "./components/Card";
import Header from './components/Header';
import sortResultsByCateogry from './helpers/sortResults';
import ListView from './pages/ListView';

import "./styles/App.css";

export const GET_BUSINESS = gql`
  {
    business {
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
  const { loading, error, data } = useQuery(GET_BUSINESS);

  const [category, setCategories] = useState("");
  const [location, setLocation] = useState("");
  const businessLst = useMemo(() => sortResultsByCateogry(data?.business ?? [], "categories", category), [data, category]);

  if (error) return <h1>Something went wrong on our side!</h1>;
  if (loading) return <h1>Loading...</h1>;
  console.log(businessLst);
  return (
    <div className="main-container">
      <Header
        setLocation={setLocation}
        setCategories={setCategories}
        category={category}
        location={location}
      />
      <ListView
        dataSource={businessLst}
        filterCategory={category}
      />
    </div>
  );

  // return (
  //   <main className="App">
  //     {data.business.map((e) => {
  //       return <Card key={e.id} item={e} />;
  //     })}
  //   </main>
  // );
}

export default App;
