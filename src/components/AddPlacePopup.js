import React from 'react';
import PopupWithForm from '../components/PopupWithForm';
import Loader from '../components/Loader';

function AddPlacePopup({ isOpen, onClose, onAddPlace, onCloseOverlay, isLoad }) {
    const currentName = React.useRef('');
    const currentLink = React.useRef('');

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            name: currentName.current.value,
            link: currentLink.current.value,
        });
    }

    return (
        <PopupWithForm title='Новое место' name='cards' loader={<Loader isLoad={isLoad} />}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onCloseOverlay={onCloseOverlay}>
            <fieldset className="popup__info">
                <input className="popup__input popup__input_card-name" type="text" id="card-input" name="card"
                    placeholder="Название" minLength="1" maxLength="30" required
                    ref={currentName}/>
                <span id="card-input-error" className="popup__error" />
                <input className="popup__input popup__input_link" type="url" id="link-input" name="link"
                    placeholder="Сссылка на картинку" required
                    ref={currentLink}/>
                <span id="link-input-error" className="popup__error" />
            </fieldset>
        </PopupWithForm>
    );
}

export default AddPlacePopup;