function Select ({ value, options, onChange}) {
  return (
    <select value={value} onChange={onChange}>
      {options.map((option) => (
        <option value={option.value} key={"select_key_" + Math.random()}>{option.label}</option>
      ))}
    </select>
  );
};

export default Select;