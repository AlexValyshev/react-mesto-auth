import React from 'react';
import { Link } from 'react-router-dom';
import RegisterWithForm from '../components/RegisterWithForm'

function Register({ isOpen, onClose, onSubmit }) {

  return (
    <RegisterWithForm title='Регистрация' name='Зарегистрироваться'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit} >
      <div className="register__signin">
        <p className="register__reg">Уже зарегистрированы?</p>
        <Link to="sign-in" className="login-link login-link_position_reg">Войти</Link>
      </div>
    </RegisterWithForm>
  );
}


export default Register;
