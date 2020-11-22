import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './ratingModal.sass';

export function RatingModal(props) {
  const handleMouseIn = (starNumber) => {
    const elems = document.querySelectorAll('.rating-star');
    elems.forEach((e, i) => {
      if (i <= starNumber) {
        e.classList.add('gold-star');
      }
    });
  };

  const handleMouseOut = (starNumber) => {
    const elems = document.querySelectorAll('.rating-star');
    elems.forEach((e, i) => {
      if (i <= starNumber) {
        e.classList.remove('gold-star');
      }
    });
  };

  const handleClick = (rating) => {
    props.closeRatingModal(rating);
  };

  return (
    <>
      <div className="rating-modal__container">
        <div className="rating-modal">
          <div className="rating-modal__label">Please, rating curier</div>
          <div className="rating-modal__stars">
            <FontAwesomeIcon
              icon={faStar}
              className="rating-star"
              onMouseEnter={() => handleMouseIn(0)}
              onMouseLeave={() => handleMouseOut(0)}
              onClick={() => handleClick(1)}
            />
            <FontAwesomeIcon
              icon={faStar}
              className="rating-star"
              onMouseEnter={() => handleMouseIn(1)}
              onMouseLeave={() => handleMouseOut(1)}
              onClick={() => handleClick(2)}
            />
            <FontAwesomeIcon
              icon={faStar}
              className="rating-star"
              onMouseEnter={() => handleMouseIn(2)}
              onMouseLeave={() => handleMouseOut(2)}
              onClick={() => handleClick(3)}
            />
            <FontAwesomeIcon
              icon={faStar}
              className="rating-star"
              onMouseEnter={() => handleMouseIn(3)}
              onMouseLeave={() => handleMouseOut(3)}
              onClick={() => handleClick(4)}
            />
            <FontAwesomeIcon
              icon={faStar}
              className="rating-star"
              onMouseEnter={() => handleMouseIn(4)}
              onMouseLeave={() => handleMouseOut(4)}
              onClick={() => handleClick(5)}
            />
          </div>
        </div>
      </div>
      <div className="modal__backlock" />
    </>
  );
}
