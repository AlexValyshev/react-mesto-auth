import React from 'react';
import { useRef } from 'react'

function ImagePopup({ card, onClose, onCloseOverlay, }) {
    const popupViewContainer = useRef(null);
    return (
        <section className={card.link ? 'popup popup_opened popup__change-background' : 'popup'} onClick={onCloseOverlay}>
            <div className={card.link ? 'popup__container popup__container-view popup__container_opened'
                : 'popup__container popup__container-view'}>
                <figure className="popup__view" ref={popupViewContainer}>
                    {card.link &&
                        <img className="popup__image"
                            src={card.link} alt={card.name}
                            onLoad={evt => {
                                popupViewContainer.current.style.width = `${evt.target.offsetWidth}px`
                                popupViewContainer.current.style.height = `${evt.target.offsetHeight}px`
                            }
                            } />}
                    <figcaption className="popup__caption">{card.name}</figcaption>
                </figure>
                <button type="button" className="popup__close popup__close_view" onClick={onClose} />
            </div>
        </section>
    );
}

export default ImagePopup;   