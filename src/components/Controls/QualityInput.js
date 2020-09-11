import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const { ipcRenderer } = require('electron');

const QualityInput = ({ files, path }) => {
  const [quality, setQuality] = useState(100);

  const handleChange = e => {
    setQuality(+e);
  };

  const handleSubmit = () => {
    const imgPaths = files.map(file => file.path);
    ipcRenderer.send('image:minimize', { imgPaths, quality, path });
  };

  const handleReset = () => {
    console.log(window.location.reload());
  };

  return (
    <Form className='mt-3'>
      <hr />
      <Form.Group controlId='formBasicRange'>
        <Form.Label>Export Quality</Form.Label>
        <Form.Control
          type='range'
          value={quality}
          onChange={e => handleChange(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='d-flex flex-row justify-content-between align-items-center'>
        <h3>{quality}%</h3>
        <div className='buttons'>
          <Button onClick={handleReset} className='btn-secondary mr-1'>
            Reset
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </Form.Group>
      <hr />
    </Form>
  );
};

export default QualityInput;
