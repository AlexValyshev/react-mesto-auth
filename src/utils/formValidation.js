export default class FormValidator {
    constructor(data, form) {
        this._form = form;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
    }

    // Функция валидации формы
    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

    // Функция поиска всех полей формы и кнопки сабмита
    _findAllInputs() {
        this._allInput = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._button = this._form.querySelector(this._submitButtonSelector);
    }
    // Функция установки слушателей на все поля в форме.
    _setEventListeners() {
        this._findAllInputs();
        this._allInput.forEach((input) => {
            input.addEventListener('input', () => {
                this._input = input;
                this._checkInputValidity();
                this._toggleSubmitButton();
            });
        });
    }

    // функция очистки форм от ошибок если при их наличии происходит закрытие попапа нажатием на "Esc", "Оверлей" или "Крестик".
    resetForm() {
        this._findAllInputs();
        this._allInput.forEach((input) => {
            this._input = input;
            this._hideInputError();
            this._toggleSubmitButton();
        });
    }


    // Функция валидации полей формы.
    _checkInputValidity() {
        if (!this._input.validity.valid) {
            this._showInputError();
        } else {
            this._hideInputError();
        }
    };

    // Функция добавления и стилизации ошибки, при невалидности поля формы.
    _showInputError() {
        const inputError = this._form.querySelector(`#${this._input.id}-error`);
        this._input.classList.add(this._inputErrorClass);
        inputError.textContent = this._input.validationMessage;
        inputError.classList.add(this._errorClass);
    };

    // Функция удаления стилизации и ошибки, при валидности поля формы.
    _hideInputError() {
        const inputError = this._form.querySelector(`#${this._input.id}-error`);
        this._input.classList.remove(this._inputErrorClass);
        inputError.classList.remove(this._errorClass);
        inputError.textContent = '';
    };

    // Функция переключения кнопки.
    _toggleSubmitButton() {
        if (this._containsInvalidInput(this._allInput)) {
            this._button.classList.add(this._inactiveButtonClass);
            this._button.setAttribute('disabled', true);
        } else {
            this._button.classList.remove(this._inactiveButtonClass);
            this._button.removeAttribute('disabled');
        }
    };

    // Функция проверки наличия невалидных полей в форме.
    _containsInvalidInput() {
        return this._allInput.some((input) => {
            return !input.validity.valid;
        });
    }
}

