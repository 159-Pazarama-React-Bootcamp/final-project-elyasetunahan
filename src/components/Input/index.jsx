import { useField } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { BiMessageAltError } from 'react-icons/bi';
import TextareaAutosize from 'react-textarea-autosize';
import './index.css';

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
        <div className="error">
          <BiMessageAltError /> {meta.error}
        </div>
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
