import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './ratingModal.sass';

export function RatingModal(props) {
  const onMouseIn = (num) => {
    const elems = document.querySelectorAll('.rating-star');
    elems.forEach((e, i) => {
      if (i <= num) {
        e.classList.add('gold-star');
      }
    });
  };

  const onMouseOut = (num) => {
    const elems = document.querySelectorAll('.rating-star');
    elems.forEach((e, i) => {
      if (i <= num) {
        e.classList.remove('gold-star');
      }
    });
  };

  return (
    <>
      <div className="rating-modal">
        <div>Please, rating curier</div>
        <div>
          <FontAwesomeIcon
            icon={faStar}
            className="rating-star"
            onMouseEnter={() => onMouseIn(0)}
            onMouseLeave={() => onMouseOut(0)}
          />
          <FontAwesomeIcon
            icon={faStar}
            className="rating-star"
            onMouseEnter={() => onMouseIn(1)}
            onMouseLeave={() => onMouseOut(1)}
          />
          <FontAwesomeIcon
            icon={faStar}
            className="rating-star"
            onMouseEnter={() => onMouseIn(2)}
            onMouseLeave={() => onMouseOut(2)}
          />
          <FontAwesomeIcon
            icon={faStar}
            className="rating-star"
            onMouseEnter={() => onMouseIn(3)}
            onMouseLeave={() => onMouseOut(3)}
          />
          <FontAwesomeIcon
            icon={faStar}
            className="rating-star"
            onMouseEnter={() => onMouseIn(4)}
            onMouseLeave={() => onMouseOut(4)}
          />
        </div>
      </div>
      <div className="modal__backlock" />
    </>
  );
}
