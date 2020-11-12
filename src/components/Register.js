import React from 'react';
import { Link } from 'react-router-dom';
import RegisterWithForm from './RegisterWithForm';

function Register({ isLoggedIn, onRegister }) {
  return (
    <RegisterWithForm title='Регистрация' name='Зарегистрироваться' isLoggedIn={isLoggedIn} onRegLog={onRegister} >
      <div className="register__signin">
        <p className="register__reg">Уже зарегистрированы?</p>
        <Link to="sign-in" className="register__link">Войти</Link>
      </div>
    </RegisterWithForm>
  );
}

export default Register;
