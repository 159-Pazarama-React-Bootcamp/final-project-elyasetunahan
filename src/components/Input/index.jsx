import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import './index.css';
import PropTypes from 'prop-types';
import { useField } from 'formik';

function FormInput({ title, type, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="input">
      <span className="input-title">{title}</span>
      {type === 'textarea' ? (
        <TextareaAutosize
          minRows={2}
          className="text-area"
          {...field}
          {...props}
        />
      ) : (
        <input type={type} className="input-area" {...field} {...props} />
      )}
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default FormInput;

FormInput.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
};

FormInput.defaultProps = {
  title: '',
  type: 'text',
};
