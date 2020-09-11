import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <>
      <h1 className='text-center mt-5'>
        <FontAwesomeIcon icon={faImages}></FontAwesomeIcon> Image Optimize
      </h1>
      <p className='text-center'>Frontier Web Development</p>
    </>
  );
};

export default Header;
