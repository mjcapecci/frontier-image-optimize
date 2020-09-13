import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import Logo from '../images/fwd-logo-black.png';

const Header = () => {
  return (
    <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
      <img src={Logo} width='100px' alt='' />
      <h1 className='text-center'>
        <FontAwesomeIcon icon={faImages}></FontAwesomeIcon> Image Optimize
      </h1>
    </div>
  );
};

export default Header;
