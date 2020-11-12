import React from 'react';

function PopupWithLogged({
  name, isOpen, onClose, children, onCloseOverlay,
}) {
  return (
    <section className={isOpen ? 'popup popup_opened' : 'popup'}
      onClick={onCloseOverlay}>
      <div className={isOpen ? 'popup__container popup__container_log popup__container_opened'
        : 'popup__container popup__container_log'}>
        {children}
        <button type="button" className="popup__close" onClick={onClose} />
      </div>
    </section>
  );
}

export default PopupWithLogged;
