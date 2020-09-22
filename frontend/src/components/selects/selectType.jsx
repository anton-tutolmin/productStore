import React from 'react';
import './selectType.sass';

export const Select = (props) => {
  const { onChange, value } = props;
  return (
    <select
      className="register__select"
      onChange={onChange}
      value={value}
    >
      <option value="client">client</option>
      <option value="curier">curier</option>
    </select>
  );
};
