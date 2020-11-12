import React from 'react';
import { Link, Route } from 'react-router-dom';
import Logo from '../images/logo-mesto.svg';

function Header({ emailHeader, onSignOut }) {
  return (
    <header className="header page__container">
      <img className="header__logo" src={Logo} alt="Логотип Mesto-Russia" />
      <Route path="/sign-up">
        <Link to="/sign-in" className="header__logged header__logged_color">Войти</Link>
      </Route>
      <Route path="/sign-in">
        <Link to="/sign-up" className="header__logged header__logged_color">Регистрация</Link>
      </Route>
      <Route exact path="/">
        <div className="header__login">
          <p className="header__email">{emailHeader}</p>
          <Link to="/sign-in" className="header__logged" onClick={onSignOut}>Выйти</Link>
        </div>
      </Route>
    </header>
  );
}

export default Header;
