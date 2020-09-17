import React, { useState } from 'react';
import { Input } from '../inputs/input.jsx';
import './profileModal.sass';

export const ProfileModal = (props) => {
  const [value, setValue] = useState('');
  const { onToggle, onSubmit } = props;

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return (
    <>
      <div className="modal">
        <form>
          <Input
            label={props.label}
            type="text"
            value={value}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="modal__subnit-btn"
            onClick={(e) => {
              e.preventDefault();
              onSubmit(value);
            }}
          >
            Update
          </button>
        </form>
      </div>
      <div className="modal__backlock" onClick={onToggle} />
    </>
  );
};
