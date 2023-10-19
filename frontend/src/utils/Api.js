class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers
    }
    
    //проверка ответа сервера на корректность
    _validateResponse(res) {
        if(res.ok) {
            return res.json();
        } //в случае ошибки - отклоняем промис
        return Promise.reject(`Ошибка получения ответа от сервера: ${res.status}`)
    }

    getInitialCards() {
        //возвращаем объект Promise через return fetch
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: this.headers
        })
        .then(this._validateResponse.bind(this));
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers
        })
        .then(this._validateResponse.bind(this)); //явно указываем значение this, иначе теряется контекст
    }

    editUserInfo(formValues) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: formValues.name,
                about: formValues.about
            })
        })
        .then(this._validateResponse.bind(this));
    }

    editAvatar(avatar) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(avatar)
        })
        .then(this._validateResponse.bind(this));
    }

    likeCard(cardItem) {
        return fetch(`${this.baseUrl}/cards/${cardItem._id}/likes`, {
            method: 'PUT',
            headers: this.headers,
        })
        .then(this._validateResponse.bind(this));
    }

    dislikeCard(cardItem) {
        return fetch(`${this.baseUrl}/cards/${cardItem._id}/likes`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(this._validateResponse.bind(this));
    }

    changeLikeCardStatus(cardItem, isLiked) {
        if(isLiked) {
            return fetch(`${this.baseUrl}/cards/${cardItem._id}/likes`, {
                method: 'PUT',
                headers: this.headers,
            })
            .then(this._validateResponse.bind(this));
        } else {
            return fetch(`${this.baseUrl}/cards/${cardItem._id}/likes`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(this._validateResponse.bind(this));
        }  
    }

    removeCard(cardItem) {
        return fetch(`${this.baseUrl}/cards/${cardItem._id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(this._validateResponse.bind(this));
    }

    addNewCard(data) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._validateResponse.bind(this));
    }
}

//создаём экземпляр класса Api с входными данными
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
    headers: {
    authorization: 'e123c2f1-8f0a-4bf0-aab3-5c98d8db455d',
    'Content-Type': 'application/json'
}});

export default api;