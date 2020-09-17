import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './notification.sass';

export const Notification = (props) => {
  const { notification, onRemove } = props;

  const removeHandler = () => {
    onRemove(notification.id);
  };

  useEffect(() => {
    setTimeout(() => {
      removeHandler(notification.id);
    }, 5000);
  });

  return (
    <div className="notification">
      <button
        className="notification__delete"
        type="button"
        onClick={removeHandler}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <span className="notification__text">{notification.data}</span>
    </div>
  );
};
