import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import ListGroup from 'react-bootstrap/ListGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

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
          <>
            <p>Drop pictures here, or click to open select dialog.</p>
            <FontAwesomeIcon icon={faUpload} size={'2x'} />
          </>
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
        <h4 className='mb-3'>Files ({acceptedFiles.length})</h4>
        <ListGroup>{files}</ListGroup>
        <QualityInput files={acceptedFiles} path={outputPath} />
      </StyledAccept>
    );
  }
}

const StyledDropzone = styled.div`
  display: flex;
  color: #999;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  padding: 1rem;
  min-height: 5rem;
  border: 3px dotted lightgray;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    color: #555;
    background: lightgray;
    border: 3px dotted #999;
  }
`;

const StyledAccept = styled.div`
  margin: 2rem 0;
  min-height: 8rem;
`;

const StyledReject = styled.div`
  margin: 2rem 0;
  min-height: 5rem;
  border: 1px solid red;
`;
