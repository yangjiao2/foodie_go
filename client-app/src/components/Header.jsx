import DropDown from "./DropDown";
import { gql, useQuery } from "@apollo/client";
import React, { useMemo } from "react";

export const GET_CATEGORIES = gql`
{
  categories {
    title
  }
}
`;

/**
 * Renders a header element.
 * @param {Function} setCategories - A callback to update the selected business category.
 * @param {Function} setLocation - A callback to update the location.
 * @param {string} category - The current category.
 * @param {string} location - The current location.
 * @return {!React.ReactElement}
 */

const Header = ({
  category,
  setCategories,
}) => {

  const { loading, error, data } = useQuery(GET_CATEGORIES);
  // const { data: categories } = data;
  console.log('header', data, loading, error);
  if (loading) {
    return <span></span>;
  }
  return (
    <div className="header-container" data-testid="header-container">
      <DropDown
        value={category}
        setSelected={setCategories}
        label="Category"
        options={data?.categories ?? []}
      />
      {/* <DropDown
        value={sortValue}
        setSelected={setSortValue}
        label="Sort"
        options={sortOptions}
      /> */}
      {/* <button onClick={onResetClick}>Reset</button> */}
    </div>
  );
};

export default Header;
