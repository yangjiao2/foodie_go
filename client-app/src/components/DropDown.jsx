/**
 * Renders a dropdown element.
 * @param {<!Array<Options>} options - The select options.
 * @param {string} label - The text label for the drop down element.
 * @param {number} value - The value of the dropdown.
 * @param {Function} setSelected - A callback to update user selection.
 * @return {!React.ReactElement}
 */

const DropDown = ({ options, label, setSelected, value }) => {
  const onChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div className="dropdown" data-testid="dropdown">
      <label>{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="custom-select"
        data-testid='dropdown-selection'
      >
        <option key={0} value={''}>
        </option>
        {options.map((option, index) => (
          <option key={index + 1} value={option.title}
            data-testid={`select-option-${index}`}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
