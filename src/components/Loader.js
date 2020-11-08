import React from 'react';

function Loader({ isLoad }) {
    return (
        <>
            <p className={`popup__button-text ${isLoad && 'popup__button-text_disabled'}`} >Сохранить </p>
            <p className={`popup__button-text ${!isLoad && 'popup__button-text_disabled'}`}>Сохранение...</p>
        </>
    );
}

export default Loader;   