import React from 'react';
import RegisterWithForm from './RegisterWithForm';

function Login({ isLoggedIn, onLogin }) {
  return (
    <RegisterWithForm title='Вход' name='Войти' isLoggedIn={isLoggedIn} onRegLog={onLogin}>
    </RegisterWithForm>
  );
}

export default Login;
