import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo-mesto.svg';

function Header({isLoggedIn}) {
  return (
    <header className="header page__container">
      <img className="header__logo" src={Logo} alt="Логотип Mesto-Russia" />
      <Link to="sign-in" className="login-link login-link_position_header">{isLoggedIn ? 'Регистрация': 'Войти'}</Link>
    </header>
  );
}

export default Header;
