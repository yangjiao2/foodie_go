/**
 * Returns the list of stations in a sorted order based on the sortProp
 * @param {!Array<StationCard>} stations
 * @param {SortProp} sortProp The property name to sort the stations list on
 * @return {!Array<StationCard>}
 **/

// Sort by default order:
// - distance: nearest to farthest
// - name: alphabetically
// - rating: highest to lowest
// - price: lowest to highest

// I am making assumetion here that we will order with priority:
// in the following order: distance > name > rating > price

const sortResultsByCateogry = (data, sortField, value) => {
  return [...data].sort((a, b) => {
    console.log("a", a[sortField]);
    const a_values = a[sortField].map((e) => e.title);
    return a_values.includes(value) ? -1 : 1;
    return a[sortField]
      .toString()
      .localeCompare(b[sortField].toString(), "en", {
        numeric: true,
      });
  });
};

export default sortResultsByCateogry;
