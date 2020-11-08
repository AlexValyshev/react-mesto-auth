class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl
        this._headers = headers
    }

    resFetch(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInfo() { // Запрос на загрузку данных пользователя
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(this.resFetch);
    }

    getInitialCards() { // Запрос на загрузку карточек
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(this.resFetch);
    }

    getInitialInfo() {
        this._promises = [this.getUserInfo(), this.getInitialCards()];
        return Promise.all(this._promises);
    }

    setUserInfo({ name, about }) { // Запрос на обновление данных пользователя
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: `${name}`,
                about: `${about}`
            })
        })
            .then(this.resFetch);
    }

    addNewCard({ name, link }) { // Запрос на добавление новой карточки
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: `${name}`,
                link: `${link}`
            })
        })
            .then(this.resFetch);
    }

    deleteCard(itemId) { // Запрос на удаление карточки
        return fetch(`${this._baseUrl}/cards/${itemId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this.resFetch);
    }

    setUserAvatar({ avatar }) { // Запрос на изменение аватара пользователя
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: `${avatar}`
            })
        })
            .then(this.resFetch);
    }

    addLikeCard(itemId) { // Запрос на установку лайка
        return fetch(`${this._baseUrl}/cards/likes/${itemId}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this.resFetch);
    }

    removeLikeCard(itemId) { // Запрос на снятие лайка
        return fetch(`${this._baseUrl}/cards/likes/${itemId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this.resFetch);
    }

    changeLikeStatus(cardid, isLiked) { // Запрос на изменение лайка
        if (isLiked) {
            return this.removeLikeCard(cardid);
        } else {
            return this.addLikeCard(cardid);
        }
    }
}



export const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-14",
    headers: {
        authorization: "cede3324-4ffe-44e5-b1e3-3ccfef967867",
        "Content-Type": "application/json",
    },
});