import React, { useMemo } from "react";
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


/**
 * Renders a vertical listview of business card element.
 * @param {string} filterCategory - The value to sort the business category.
 * @return {!React.ReactElement}
 */

function ListView({ filterCategory }) {
  const { loading, error, data } = useQuery(GET_BUSINESS, {
    variables: { term: filterCategory },
    fetchPolicy: "cache-and-network",
  });

  const dataSource = useMemo(() => sortResultsByCateogry(data?.business ?? [], "categories", filterCategory), [data, filterCategory]);
  if (error) {
    return <hr>{ERROR_MESSAGE}</hr>
  }

  return (
    <div className="listview-container" data-testid="listview-container">
      {loading && !data && <h4>{LOADING_MESSAGE}</h4>}
      {dataSource.length > 0 ? (
        dataSource.map((business) => (
          <Card
            key={business.id}
            data={business}
            filterCategory={filterCategory}
          />
        ))
      ) : (
        !loading && <label data-testid="no-result">{NO_RESULT}</label>
      )}
    </div>
  );

}

export default ListView;
