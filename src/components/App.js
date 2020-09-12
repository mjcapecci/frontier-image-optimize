import React, { useState } from 'react';
const { ipcRenderer } = require('electron');
const path = require('path');
const os = require('os');

import Toast from 'react-bootstrap/Toast';

import Header from './Header';
import Dropzone from './Dropzone';
import OutputPath from './Controls/OutputPath';

const App = () => {
  const [outputPath, setOutputPath] = useState(
    path.join(os.homedir(), 'image-optimize')
  );

  const [showToast, setToast] = useState(false);

  // On Done
  ipcRenderer.on('image:done', () => {
    setToast(true);
  });

  return (
    <div className='container'>
      <Header />
      <div className='d-flex align-items-center justify-content-center mt-5 mb-5'>
        <Toast show={showToast} onClose={() => setToast(false)}>
          <Toast.Header className='text-success'>Success!</Toast.Header>
          <Toast.Body>The content has been resized</Toast.Body>
        </Toast>
      </div>
      <Dropzone outputPath={outputPath} />
      <OutputPath outputPath={outputPath} setOutputPath={setOutputPath} />
    </div>
  );
};

export default App;
