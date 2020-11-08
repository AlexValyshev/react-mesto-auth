import React from 'react';
import PopupWithForm from '../components/PopupWithForm';
import Loader from '../components/Loader';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onCloseOverlay, isLoad }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleJobChange(evt) {
        setDescription(evt.target.value);
    }
    
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [isOpen,currentUser]);

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name,
            about: description
        });
    }

    return (
        <PopupWithForm title='Редактировать профиль' name='profile' loader={<Loader isLoad={isLoad} />}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onCloseOverlay={onCloseOverlay} >
            <fieldset className="popup__info">
                <input className="popup__input popup__input_name" type="text" id="name-input" name="name"
                    placeholder="Имя" minLength='2' maxLength="40" required
                    value={name}
                    onChange={handleNameChange} />
                <span id="name-input-error" className="popup__error" />
                <input className="popup__input popup__input_job" type="text" id="job-input" name="job"
                    placeholder="О себе" minLength="2" maxLength="200" required
                    value={description}
                    onChange={handleJobChange} />
                <span id="job-input-error" className="popup__error" />
            </fieldset>
        </PopupWithForm>
    );
}

export default EditProfilePopup;