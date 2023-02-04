const sortResultsByCateogry = (data, sortField, value) => {
  return [...data].sort((a, b) => {
    const a_values = a[sortField].map((e) => e.title.toString());
    // ensures that categories with most relevant filter value has top rank
    return a_values.includes(value.toString()) ? -1 : 1;
  });
};

export default sortResultsByCateogry;
