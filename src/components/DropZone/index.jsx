import React from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

function DragDrop({ title, onDrop }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.name}</li>
  ));

  return (
    <section className="container">
      <h4>{title}</h4>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Sürükle Bırak</p>
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

export default DragDrop;

DragDrop.propTypes = {
  title: PropTypes.string,
  onDrop: PropTypes.func,
};

DragDrop.defaultProps = {
  title: '',
  onDrop: '',
};
