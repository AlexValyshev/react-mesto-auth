import React from 'react';
import loginOk from '../images/login-ok.svg';
import PopupWithLogged from './PopupWithLogged';

function Login({ isOpen, onClose, onCloseOverlay }) {
  return (
    <PopupWithLogged name='login'
    isOpen={isOpen}
    onClose={onClose}
      onCloseOverlay={onCloseOverlay}>
      <img className="popup__login-image" src={loginOk} alt="Значок галочка, успешная авторизация" />
      <p className="popup__logged">Вы успешно зарегистрировались!</p>
    </PopupWithLogged>
  );
}

export default Login;
