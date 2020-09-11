import React from 'react';
import Card from 'react-bootstrap/Card';
const { dialog } = require('electron').remote;

const OutputPath = ({ outputPath, setOutputPath }) => {
  return (
    <Card>
      <Card.Body>
        <p
          className='text-center'
          onClick={() =>
            dialog
              .showOpenDialog({
                properties: ['openDirectory', 'createDirectory']
              })
              .then(path => setOutputPath(path.filePaths[0]))
          }
        >
          Output Path: <b>{outputPath}</b>
        </p>
      </Card.Body>
    </Card>
  );
};

export default OutputPath;
