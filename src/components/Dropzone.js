import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import ListGroup from 'react-bootstrap/ListGroup';

import QualityInput from './Controls/QualityInput';

export default function Dropzone({ outputPath }) {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    acceptedFiles
  } = useDropzone({ onDrop, accept: 'image/jpeg, image/png' });

  const files = acceptedFiles.map(file => (
    <ListGroup.Item key={file.path}>{file.name}</ListGroup.Item>
  ));

  if (files.length === 0 && !isDragReject) {
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
  } else if (isDragReject) {
    return (
      <StyledReject {...getRootProps()}>
        <input {...getInputProps()} />
        <p>That file type is not allowed.</p>
      </StyledReject>
    );
  } else {
    return (
      <StyledAccept className='files'>
        <h4>Files</h4>
        <ListGroup>{files}</ListGroup>
        <QualityInput files={acceptedFiles} path={outputPath} />
      </StyledAccept>
    );
  }
}

const StyledDropzone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  min-height: 5rem;
  border: 1px solid gray;
  text-align: center;
`;

const StyledAccept = styled.div`
  margin: 2rem 0;
  min-height: 5rem;
`;

const StyledReject = styled.div`
  margin: 2rem 0;
  min-height: 5rem;
  border: 1px solid red;
`;
