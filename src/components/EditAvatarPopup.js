import React from 'react';
import PopupWithForm from '../components/PopupWithForm';
import Loader from '../components/Loader';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onCloseOverlay, isLoad }) {
    const currentAvatar = React.useRef(null);

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: currentAvatar.current.value,
        });
    }

    return (
        <PopupWithForm title='Обновить аватар' name='avatar'
            loader={<Loader isLoad={isLoad} />}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onCloseOverlay={onCloseOverlay}>
            <fieldset className="popup__info" >
                <input className="popup__input popup__input_avatar" type="url" id="avatar-input" name="avatar"
                    placeholder="Ссылка на новый аватар" required ref={currentAvatar}/>
                <span id="avatar-input-error" className="popup__error" />
            </fieldset>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;