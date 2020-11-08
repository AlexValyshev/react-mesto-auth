import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import ImagePopup from '../components/ImagePopup';
import EditProfilePopup from '../components/EditProfilePopup';
import EditAvatarPopup from '../components/EditAvatarPopup';
import AddPlacePopup from '../components/AddPlacePopup';
import DeleteCardPopup from '../components/DeleteCardPopup';
import Register from '../components/Register';
import Login from '../components/Login';
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import UserAvatar from '../images/iv-custo.jpg'

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddImagePopupOpen, setAddImagePopupOpen] = React.useState(false);
  const [isChangeAvatarPopupOpen, setChangeAvatarPopupOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isTrashPopupOpen, setTrashPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [isLoad, setLoad] = React.useState(false);
  const [deleteCard, setDeleteCard] = React.useState({});
  const initialUserInfo = {
    name: 'Жак-Ив Кусто',
    about: 'Исследователь океана',
    avatar: UserAvatar,
  }
  const [currentUser, setCurrentUser] = React.useState(initialUserInfo);
  const [isLoggedIn, setLoggedIn] = React.useState(true);

  function handleEditAvatarClick() {
    setChangeAvatarPopupOpen(true);
    setIsOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
    setIsOpen(true);
  }

  function handleAddPlaceClick() {
    setAddImagePopupOpen(true);
    setIsOpen(true);
  }

  function handleTrashClick(card) {
    setTrashPopupOpen(true);
    setIsOpen(true);
    setDeleteCard(card);
  }

  function closeAllPopups() {
    setChangeAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddImagePopupOpen(false);
    setTrashPopupOpen(false);
    setSelectedCard({});
    setTimeout(setLoad, 1000);
    setDeleteCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  React.useEffect(() => {
    api
      .getInitialInfo() // Загрузка карточек и информации о пользователе.
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err); // Выведем ошибку в консоль
      });
  }, []);

  function handleCardLike(card) {// Запрос на установку лайка и дизлайка
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((item) => item._id === card._id ? newCard : item);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err); // Выведем ошибку в консоль
      });
  }

  function handleCardDelete() { // Запрос на удаление карточки.
    api
      .deleteCard(deleteCard._id)
      .then((res) => {
        const newCards = cards.filter((item) => item._id !== deleteCard._id);
        setCards(newCards);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err); // Выведем ошибку в консоль
      });
  }

  function handleUpdateUser(onUpdateUser) { // Запрос на обновление данных пользователя.
    setLoad(true);
    api
      .setUserInfo(onUpdateUser)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        setTimeout(closeAllPopups, 500);
      })
      .catch((err) => {
        console.log(err); // Выведем ошибку в консоль
      });
  }

  function handleUpdateAvatar(onUpdateAvatar) { // Запрос на обновление аватара пользователя.
    setLoad(true);
    api
      .setUserAvatar(onUpdateAvatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        setTimeout(closeAllPopups, 500);
      })
      .catch((err) => {
        console.log(err); // Выведем ошибку в консоль
      });
  }

  function handleAddPlaceSubmit(onAddPlace) { // Запрос на добавление новой карточки.
    setLoad(true);
    api
      .addNewCard(onAddPlace)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setTimeout(closeAllPopups, 500);
      })
      .catch((err) => {
        console.log(err); // Выведем ошибку в консоль
      });
  }


  function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
          <Header isLoggedIn={isLoggedIn} />
          {isLoggedIn &&
            <Main onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onTrashClick={handleTrashClick}
              cards={cards}
              onCardLike={handleCardLike} />}

          <EditProfilePopup isOpen={isEditProfilePopupOpen ? isOpen : false}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onCloseOverlay={handleOverlayClose}
            isLoad={isLoad} />

          <AddPlacePopup isOpen={isAddImagePopupOpen ? isOpen : false}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onCloseOverlay={handleOverlayClose}
            isLoad={isLoad} />

          <EditAvatarPopup isOpen={isChangeAvatarPopupOpen ? isOpen : false}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onCloseOverlay={handleOverlayClose}
            isLoad={isLoad} />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} onCloseOverlay={handleOverlayClose} />

          <DeleteCardPopup isOpen={isTrashPopupOpen ? isOpen : false}
            onClose={closeAllPopups}
            card={selectedCard}
            onCardDelete={handleCardDelete}
            onCloseOverlay={handleOverlayClose} />

          <Switch>
            <Route path="/sign-up">
              <Register />
            </Route>
            <Route path="/sign-in">
              <Login />
            </Route>
            <Route exact path="/">
              {isLoggedIn ? <Redirect to="/sign-in" /> : <Redirect to="/sign-up" />}
            </Route>
          </Switch>

        </CurrentUserContext.Provider>
        {isLoggedIn && <Footer />}
      </div >
    </BrowserRouter>
  );
}

export default App;
