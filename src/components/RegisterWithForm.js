import React from 'react';
import FormValidator from '../utils/formValidation.js';
import { validationRegConfig } from '../utils/utils.js'

function RegisterWithForm({ title, name, isOpen, children, onSubmit }) {
  const form = React.useRef(null);
  const [formValid, setFormValid] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    const formValidation = new FormValidator(validationRegConfig, form.current);
    formValidation.enableValidation();
    setFormValid(formValidation);
  }, []);

  React.useEffect(() => {
    isOpen ? formValid.resetForm() : form.current.reset();
  }, [isOpen]);

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  return (
    <section className="register">
      <h2 className="register__welcome">{name}</h2>
      <form action="#" method="post"
        onSubmit={onSubmit}
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
        <button className="register__button register__button-text" type="submit">
        {title}
        </button>
      </form>
      {children}
    </section>
  );
}

export default RegisterWithForm;
