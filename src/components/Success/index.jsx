import PropTypes from 'prop-types';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import './index.css';

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
