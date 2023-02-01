import React, { useState, } from "react";
import { gql, useQuery } from "@apollo/client";
import Header from './components/Header';
import ListView from './pages/ListView';

import "./styles/App.css";



function App() {
  const [category, setCategories] = useState("");
  return (
    <div className="main-container">
      <Header
        setCategories={setCategories}
        category={category}
      />
      <ListView
        filterCategory={category}
      />
    </div>
  );
}

export default App;
