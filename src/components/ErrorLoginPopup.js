import React from 'react';
import loginError from '../images/login-error.svg';
import PopupWithLogged from './PopupWithLogged';

function ErrorLoginPopup({ isOpen, onClose, onCloseOverlay }) {
  return (
    <PopupWithLogged name='error-login'
      isOpen={isOpen}
      onClose={onClose}
      onCloseOverlay={onCloseOverlay}>
      <img className="popup__login-image" src={loginError} alt="Значок крест, ошибка авторизации" />
      <p className="popup__logged">
        Что-то пошло не так!
        Попробуйте ещё раз.</p>
    </PopupWithLogged>
  );
}

export default ErrorLoginPopup;
