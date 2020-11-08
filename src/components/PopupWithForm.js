import React from 'react';
import FormValidator from '../utils/formValidation.js';
import { validationConfig } from '../utils/utils.js'

function PopupWithForm({ title, name, isOpen, loader, onClose, children, onSubmit, onCloseOverlay }) {
    const form = React.useRef(null);
    const [formValid, setFormValid] = React.useState(null);

    React.useEffect(() => {
        const formValidation = new FormValidator(validationConfig, form.current);
        formValidation.enableValidation();
        setFormValid(formValidation);
    }, []);

    React.useEffect(() => {
        isOpen ? formValid.resetForm() : form.current.reset();
    }, [isOpen]);

    return (
        <section className={isOpen ? 'popup popup_opened' : 'popup'}
            onClick={onCloseOverlay}>
            <div className={isOpen ? `popup__container popup__container-form popup__container_${name} 
            popup__container_opened ` : `popup__container popup__container-form popup__container_${name}`}>
                <form name={`form-${name}`} action="#" method="post"
                    onSubmit={onSubmit}
                    className={`popup__form popup__form_${name}`}
                    noValidate
                    ref={form}>
                    <h3 className="popup__form-heading">{title}</h3>
                    {children}
                    <button className={`popup__button popup__button-text popup__button_save-${name}`} type="submit">
                        {loader}
                    </button>
                </form>
                <button type="button" className={`popup__close popup__close_container-${name}`} onClick={onClose} />
            </div>
        </section>
    );
}

export default PopupWithForm;