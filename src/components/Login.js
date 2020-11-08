import React from 'react';
import RegisterWithForm from '../components/RegisterWithForm'

function Login({ isOpen, onClose, onSubmit }) {

  return (
      <RegisterWithForm title='Вход' name='Войти'
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onSubmit} >
      </RegisterWithForm>
  );
}

export default Login;
