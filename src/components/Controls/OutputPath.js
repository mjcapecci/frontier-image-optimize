import React from 'react';
import Card from 'react-bootstrap/Card';
const { dialog } = require('electron').remote;
import styled from 'styled-components';

const OutputPath = ({ outputPath, setOutputPath }) => {
  return (
    <Card className='mb-5'>
      <StyledCardContent>
        <Card.Body
          onClick={() =>
            dialog
              .showOpenDialog({
                properties: ['openDirectory', 'createDirectory']
              })
              .then(path => setOutputPath(path.filePaths[0] || outputPath))
          }
        >
          <p className='text-center'>
            Output Path: <b>{outputPath}</b>
          </p>
        </Card.Body>
      </StyledCardContent>
    </Card>
  );
};

const StyledCardContent = styled.div`
  .card-body {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    background: #0275d8;
    transition: all 0.2s ease;
    &:hover {
      background: #0063ba;
    }
  }
`;

export default OutputPath;
