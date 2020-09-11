import React, { useState } from 'react';
const path = require('path');
const os = require('os');

import Header from './Header';
import Dropzone from './Dropzone';
import OutputPath from './Controls/OutputPath';

const App = () => {
  const [outputPath, setOutputPath] = useState(
    path.join(os.homedir(), 'image-optimize')
  );

  return (
    <div className='container'>
      <Header />
      <Dropzone outputPath={outputPath} />
      <OutputPath outputPath={outputPath} setOutputPath={setOutputPath} />
    </div>
  );
};

export default App;
