import React from 'react';
import FormValidator from '../utils/formValidation';
import { validationRegConfig } from '../utils/utils';

function RegisterWithForm({
  title, name, children, isLoggedIn, onRegLog,
}) {
  const form = React.useRef(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    const formValidation = new FormValidator(validationRegConfig, form.current);
    formValidation.enableValidation();
  }, []);

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegLog(password, email);
  }

  return (
    <section className="register">
      <h2 className="register__welcome">{name}</h2>
      <form action="#" method="post"
        onSubmit={handleSubmit}
        className="register__form"
        noValidate
        ref={form}>
        <input className="register__input register__input_name" type="email" id="email-input" name="email"
          placeholder="Email" required
          value={email}
          onChange={handleEmailChange} />
        <span id="email-input-error" className="register__error" />
        <input className="register__input register__input_password" type="password" id="password-input" name="password"
          placeholder="Пароль" minLength="4" maxLength="20" required
          value={password}
          onChange={handlePasswordChange} />
        <span id="password-input-error" className="register__error" />
        <button className="register__button register__button-text" type="submit" >
          {title}
        </button>
      </form>
      {children}
    </section>
  );
}

export default RegisterWithForm;
