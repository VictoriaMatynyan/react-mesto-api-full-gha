import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Login = ({ handleLogIn }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogIn(userEmail, userPassword); // передаём актуальные значения полей формы
    }
    
    return (
        <form
            className="authentication-form"
            onSubmit={handleSubmit}
            name="login"
        >
            <h2 className="authentication-form__title">Вход</h2>
            <input
                className="authentication-form__input"
                type="email"
                name="userEmail"
                placeholder="Email"
                autoComplete="off"
                value={userEmail}
                onChange={({target: {value}}) => setUserEmail(value)}
                required
            />
            <input
            className="authentication-form__input"
                type="password"
                name="userPassword"
                placeholder="Пароль"
                value={userPassword}
                onChange={({target: {value}}) => setUserPassword(value)}
                autoComplete="off"
                required
            />
            <button
                className="authentication-form__button"
                type="submit">
                    Войти
            </button>
        </form>
    )
}

export default Login;

// сохраняем последние введённые данные
    // нет смысла хранить пароль в LS, если на сервере мы пытались его скрыть
    // useEffect(() => {
    //     const previousEmail = localStorage.getItem('userName');
    //     const previousPassword = localStorage.getItem('userPassword');

    //     previousEmail ? setUserEmail(previousEmail) : setUserEmail('');
    //     previousPassword ? setUserPassword(previousPassword) : setUserPassword('');
    // }, []);