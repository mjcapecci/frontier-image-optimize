import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

export default function Dropzone() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles
  } = useDropzone({ onDrop });
  const files = acceptedFiles.map(file => <li key={file.path}>{file.path}</li>);

  if (files.length === 0) {
    return (
      <StyledDropzone {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </StyledDropzone>
    );
  } else {
    return (
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    );
  }
}

const StyledDropzone = styled.div`
  border: 1px solid yellow;
`;
