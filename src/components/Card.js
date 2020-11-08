import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = React.memo(({ card, onCardClick, onTrashClick, onCardLike}) => {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const trashButtonClassName = (`${isOwn ? 'photo-place__trash photo-place__trash_visible' : 'photo-place__trash'}`);
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const likeButtonClassName = (`${isLiked ? 'photo-place__like photo-place__like_active' : 'photo-place__like'}`);

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onTrashClick(card);
    }

    return (
        <li className="photo-place__element">
            <button type="button" className={trashButtonClassName}
                onClick={handleDeleteClick} />
            <img src={card.link} alt={card.name} className="photo-place__image" onClick={handleClick} />
            <div className="photo-place__group">
                <h2 className="photo-place__title">{card.name}</h2>
                <div className="photo-place__group-like">
                    <button type="button" className={likeButtonClassName} onClick={handleLikeClick}/>
                    <p className="photo-place__number-likes">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
});

export default Card;