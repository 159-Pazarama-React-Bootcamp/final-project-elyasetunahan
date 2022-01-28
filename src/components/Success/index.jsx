import React from 'react';
import './index.css';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';

function SuccessDetail({ title, value }) {
  return (
    <div className="detail">
      <span>{title} : </span>
      <TextareaAutosize
        type="text"
        className="detail-content"
        value={value}
        disabled
      />
    </div>
  );
}

export default SuccessDetail;

SuccessDetail.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
};

SuccessDetail.defaultProps = {
  title: '',
  value: '',
};
