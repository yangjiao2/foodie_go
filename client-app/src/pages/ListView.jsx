import React, { useState, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import Card from "../components/Card";
import sortResultsByCateogry from '../utils/sortResults';

import { LOADING_MESSAGE, ERROR_MESSAGE, NO_RESULT } from "../utils/constants";

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


function ListView({ filterCategory }) {
  const { loading, error, data } = useQuery(GET_BUSINESS, {
    variables: { term: filterCategory },
  });
  const dataSource = useMemo(() => sortResultsByCateogry(data?.business ?? [], "categories", filterCategory), [data, filterCategory]);

  return (
    <div className="listview-container" data-testid="listview-container">
      {loading && <h4>{LOADING_MESSAGE}</h4>}
      {dataSource.length > 0 ? (
        dataSource.map((business) => (
          <Card
            key={business.id}
            data={business}
            filterCategory={filterCategory}
          />
        ))
      ) : (
        !loading && !error && <label data-testid="no-result">{NO_RESULT}</label>
      )}
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

export default ListView;
