import PropTypes from 'prop-types';
import React from 'react';
import './index.css';

function CustomButton({ type, children, ...props }) {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
}

export default CustomButton;

CustomButton.propTypes = {
  type: PropTypes.string,
  children: PropTypes.string,
};
CustomButton.defaultProps = {
  type: '',
  children: '',
};
