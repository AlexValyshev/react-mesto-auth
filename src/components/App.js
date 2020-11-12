/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  Route, Switch, useHistory,
} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import LoginPopup from './LoginPopup';
import ErrorLoginPopup from './ErrorLoginPopup';
import { api } from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import UserAvatar from '../images/iv-custo.jpg';
import * as auth from '../utils/auth';

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
  };
  const [currentUser, setCurrentUser] = React.useState(initialUserInfo);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [isLoginOkPopupOpen, setChangeLoginOkPopupOpen] = React.useState(false);
  const [isLoginErrorPopupOpen, setChangeLoginErrorPopupOpen] = React.useState(false);
  const history = useHistory();
  const [emailHeader, setEmailHeader] = React.useState(' ');

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

  function handleLoginError() {
    setChangeLoginErrorPopupOpen(true);
    setIsOpen(true);
  }

  function handleLoginOk() {
    setChangeLoginOkPopupOpen(true);
    setIsOpen(true);
  }

  function closeAllPopups() {
    setChangeAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddImagePopupOpen(false);
    setTrashPopupOpen(false);
    setChangeLoginOkPopupOpen(false);
    setChangeLoginErrorPopupOpen(false);
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

  function handleCardLike(card) { // Запрос на установку лайка и дизлайка
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((item) => ((item._id === card._id) ? newCard : item));
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
        closeAllPopups();
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

  function onRegister(password, email) {
    auth.register(password, email)
      .then((data) => {
        console.log(data);
        history.push('/sign-in');
      })
      .catch((err) => {
        handleLoginError();
        console.log(err);
      });
  }

  function onLogin(password, email) {
    auth.login(password, email)
      .then((data) => {
        console.log(data);
        setEmailHeader(email);
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        handleLoginOk();
        history.push('/');
      })
      .catch((err) => {
        handleLoginError();
        console.log(err);
      });
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      auth.tokenValid(jwt)
        .then((res) => {
          console.log('Токен валидный');
          setEmailHeader(res.data.email);
          setLoggedIn(true);
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
          handleLoginError();
          localStorage.removeItem('token');
          history.push('/sign-in');
        });
    }
  }, []);

  function onSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setEmailHeader(' ');
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
    };
  }, [handleEscClose]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header isLoggedIn={isLoggedIn} emailHeader={emailHeader} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute exact path="/"
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onTrashClick={handleTrashClick}
            cards={cards}
            onCardLike={handleCardLike}
            isLoggedIn={isLoggedIn}
          />
          <Route path="/sign-up">
            <Register isLoggedIn={isLoggedIn} onRegister={onRegister} />
          </Route>
          <Route path="/sign-in">
            <Login isLoggedIn={isLoggedIn} onLogin={onLogin} />
          </Route>
        </Switch>

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

        <ImagePopup card={selectedCard} onClose={closeAllPopups}
          onCloseOverlay={handleOverlayClose} />

        <DeleteCardPopup isOpen={isTrashPopupOpen ? isOpen : false}
          onClose={closeAllPopups}
          card={selectedCard}
          onCardDelete={handleCardDelete}
          onCloseOverlay={handleOverlayClose} />

        <LoginPopup isOpen={isLoginOkPopupOpen ? isOpen : false}
          onClose={closeAllPopups}
          onCloseOverlay={handleOverlayClose} />

        <ErrorLoginPopup isOpen={isLoginErrorPopupOpen ? isOpen : false}
          onClose={closeAllPopups}
          onCloseOverlay={handleOverlayClose} />

      </CurrentUserContext.Provider>
      {isLoggedIn && <Footer />}
    </div >
  );
}

export default App;
