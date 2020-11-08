import React from 'react';
import PopupWithForm from '../components/PopupWithForm';

function DeleteCardPopup({ isOpen, onClose, card, onCardDelete, onCloseOverlay }) {
    
    function handleSubmit(evt) {
        evt.preventDefault();
        onCardDelete(card)
    }

    return (
        <PopupWithForm title='Вы уверены?' name='trash' loader='Да'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onCloseOverlay={onCloseOverlay}/>
    );
}

export default DeleteCardPopup;