import PropTypes from 'prop-types';
import React from 'react';
import './index.css';

function Wrapper({ children, ...props }) {
  return <div className={`wrapper ${props.className}`}> {children}</div>;
}

Wrapper.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
};

Wrapper.defaultProps = {
  className: '',
};

export default Wrapper;
