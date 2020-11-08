import React from 'react';
import Logo from '../images/logo-mesto.svg';

function Header() {
    return (
        <header className="header page__container">
            <img className="header__logo" src={Logo} alt="Логотип Mesto-Russia" />
        </header>
    );
}

export default Header;