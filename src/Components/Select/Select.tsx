import React, { ChangeEvent } from 'react';
import './Select.scss';

const Select = ({ value, options, onChange}: {value: string, options: Array<{label: string, value: string}>, onChange: Function}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    onChange(event.target.value);
  }
  return (
    <select value={value} onChange={handleChange}>
      {options.map((option) => (
        <option value={option.value} key={"select_key_" + Math.random()}>{option.label}</option>
      ))}
    </select>
  );
};


export default Select;