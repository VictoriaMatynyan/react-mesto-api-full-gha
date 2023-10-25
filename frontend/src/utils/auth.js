// обновляем адрес api
export const BASE_URL = 'http://127.0.0.1:3000';
// export const BASE_URL = 'https://api.mestoproject.nomoredomainsrocks.ru';

// проверяем корректность запроса на сервер
export function validateResponse(res) {
    if(res.ok) {
        return res.json();
    } //в случае ошибки - отклоняем промис
    return Promise.reject(`Ошибка получения ответа от сервера: ${res.status}`)
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json', // Sets output type to JSON
            'Content-Type': 'application/json',  // Indicates that the request body format is JSON
        },
        body: JSON.stringify({ email, password }),
        // credentials: 'include'
    })
    .then(validateResponse)
}

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        // credentials: 'include'
    })
    .then(validateResponse)
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        // credentials: 'include'
    })
    .then(validateResponse)
    // .then((res) => res.json())
}