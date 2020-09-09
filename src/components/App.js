import React from 'react';
const path = require('path');
const os = require('os');

import Card from 'react-bootstrap/Card';

import Dropzone from './Dropzone';

const App = () => {
  return (
    <div className='container'>
      <Dropzone />
      <Card>
        <p className='text-center'>
          Output Path: <b>{path.join(os.homedir(), 'image-optimize')}</b>
        </p>
      </Card>
    </div>
  );
};

export default App;
