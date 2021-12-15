import React from 'react';
import PropTypes from 'prop-types';
import c from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <>
      <button type="button" onClick={onClick} className={c.Button}>
        Load more
      </button>
    </>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
