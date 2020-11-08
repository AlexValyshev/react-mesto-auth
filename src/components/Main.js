import React from 'react';
import PencilAvatar from '../images/pencil-avatar.svg';
import Card from '../components/Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onTrashClick, cards, onCardLike}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile page__container">
                <div className="profile__avatar" onClick={onEditAvatar}
                    style={{ backgroundImage: `url(${currentUser.avatar})` }} >
                    <img className="profile__pencil" src={PencilAvatar} alt="Значок редактирования профиля" />
                </div>
                <div className="profile__info">
                    <div className="profile__name-container">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" className="profile__editbutton" onClick={onEditProfile}/>
                    </div>
                    <p className="profile__job">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__addbutton" onClick={onAddPlace}/>
            </section>

            <section className="photo-place page__container">
                <ul className="photo-place__elements">
                    {cards.map((card, card_id) =>
                        <Card key={card_id} card={card} onCardClick={onCardClick}
                            onTrashClick={onTrashClick} onCardLike={onCardLike}/>)}
                </ul>
            </section>
        </main>
    );
}

export default Main;