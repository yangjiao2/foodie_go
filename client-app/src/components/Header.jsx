import DropDown from "./DropDown";
import { gql, useQuery } from "@apollo/client";
import React from "react";
import { ERROR_MESSAGE } from "../utils/constants";


export const GET_CATEGORIES = gql`
{
  categories {
    title
  }
}
`;

/**
 * Renders a header element with selectable dropdown element.
 * @param {Function} setCategories - A callback to update the selected business category.
 * @param {string} category - The filtered business category.
 * @return {!React.ReactElement}
 */

const Header = ({
  category,
  setCategories,
}) => {
  const { error, loading, data } = useQuery(GET_CATEGORIES);
  if (error) {
    return <hr>{ERROR_MESSAGE}</hr>
  }
  return (!loading &&
    <div className="header-container" data-testid="header-container">
      <DropDown
        value={category}
        setSelected={setCategories}
        label="Category"
        options={data?.categories ?? []}
      />
    </div>
  );
};

export default Header;
