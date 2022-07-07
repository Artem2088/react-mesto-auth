import React  from 'react';
import headerLogo from '../images/logo.svg';

function Header({handleLogout, email}) {

  return (
    <header className='header'>
      <img alt='Лого' className='header__logo' src={headerLogo} />
      <div className='header__container'>
        <span className='header__link'>{email}</span>
        <button className='header__button' onClick={handleLogout}>Выйти</button>
      </div>
    </header>
  );
}

export default Header;
