class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
        // this.credentials = options.credentials;
    }
    
    //проверка ответа сервера на корректность
    _validateResponse(res) {
        if(res.ok) {
            return res.json();
        } //в случае ошибки - отклоняем промис
        return Promise.reject(`Ошибка получения ответа от сервера: ${res.status}`)
    }

    // создаём запрос на сервер
    // _makeRequest(url, params) {
    //     return fetch(url, params)
    //     .then(this._validateResponse.bind(this));
    // }
    _dataHeaders = () => {
        this.token = localStorage.getItem('jwt');
        this.headers.authorization = `Bearer ${this.token}`;
        return this.headers;
    } 

    getInitialCards() {
        //возвращаем объект Promise через return fetch
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: this._dataHeaders(),
            // credentials: this.credentials
        })
        .then(this._validateResponse.bind(this));
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this._dataHeaders(),
            // credentials: this.credentials
        })
        .then(this._validateResponse.bind(this)); //явно указываем значение this, иначе теряется контекст
    }

    editUserInfo(formValues) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._dataHeaders(),
            body: JSON.stringify({
                name: formValues.name,
                about: formValues.about
            }),
            // credentials: this.credentials
        })
        .then(this._validateResponse.bind(this));
    }

    editAvatar(avatar) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._dataHeaders(),
            body: JSON.stringify(avatar),
            // credentials: this.credentials
        })
        .then(this._validateResponse.bind(this));
    }

    likeCard(cardItem) {
        return fetch(`${this.baseUrl}/cards/${cardItem._id}/likes`, {
            method: 'PUT',
            headers: this._dataHeaders(),
            // credentials: this.credentials
        })
        .then(this._validateResponse.bind(this));
    }

    dislikeCard(cardItem) {
        return fetch(`${this.baseUrl}/cards/${cardItem._id}/likes`, {
            method: 'DELETE',
            headers: this._dataHeaders(),
            // credentials: this.credentials
        })
        .then(this._validateResponse.bind(this));
    }

    changeLikeCardStatus(cardItem, isLiked) {
        if(isLiked) {
            return fetch(`${this.baseUrl}/cards/${cardItem._id}/likes`, {
                method: 'PUT',
                headers: this._dataHeaders(),
                // credentials: this.credentials
            })
            .then(this._validateResponse.bind(this));
        } else {
            return fetch(`${this.baseUrl}/cards/${cardItem._id}/likes`, {
            method: 'DELETE',
            headers: this._dataHeaders(),
            // credentials: this.credentials
        })
        .then(this._validateResponse.bind(this));
        }  
    }

    removeCard(cardItem) {
        return fetch(`${this.baseUrl}/cards/${cardItem._id}`, {
            method: 'DELETE',
            headers: this._dataHeaders(),
            // credentials: this.credentials
        })
        .then(this._validateResponse.bind(this));
    }

    addNewCard(data) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this._dataHeaders(),
            body: JSON.stringify({
                name: data.name,
                link: data.link
            }),
            // credentials: this.credentials
        })
        .then(this._validateResponse.bind(this));
    }
}

//создаём экземпляр класса Api с входными данными
const api = new Api({
    // здесь тоже обновляем адрес api
    baseUrl: 'https://api.mestoproject.nomoredomainsrocks.ru',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}, 
    credentials: 'include',

});

export default api;