class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
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
            // отправляем авторизационные данные
            credentials: 'include',
        })
        .then(this._validateResponse.bind(this));
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            credentials: 'include',
        })
        .then(this._validateResponse.bind(this)); //явно указываем значение this, иначе теряется контекст
    }

    editUserInfo(formValues) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: formValues.name,
                about: formValues.about
            }),
        })
        .then(this._validateResponse.bind(this));
    }

    editAvatar(avatar) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(avatar),
            
        })
        .then(this._validateResponse.bind(this));
    }

    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .then(this._validateResponse.bind(this));
    }
    
    removeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        .then(this._validateResponse.bind(this));
    }

    addNewCard(data) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            }),
        })
        .then(this._validateResponse.bind(this));
    }
}

//создаём экземпляр класса Api с входными данными
const api = new Api({
    // здесь тоже обновляем адрес api
    // baseUrl: 'http://127.0.0.1:3000',
    baseUrl: 'https://api.mestoproject.nomoredomainsrocks.ru',
    credentials: 'include',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    }, 
});

export default api;
