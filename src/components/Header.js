import React from 'react';
import headerLogo from '../images/logo.svg';

function Header() {
  return (
    <header className='header'>
      <img alt='Лого' className='header__logo' src={headerLogo} />
    </header>
  );
}

export default Header;
