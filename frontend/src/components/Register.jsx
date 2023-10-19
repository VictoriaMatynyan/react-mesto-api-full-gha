import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Register = ({ onRegistration }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegistration(userEmail, userPassword); // передаём актуальные значения полей формы
    }
  
    return (
        <form
            className="authentication-form"
            onSubmit={handleSubmit}
            name="registration"
        >
            <h2 className="authentication-form__title">Регистрация</h2>
            <input
                className="authentication-form__input"
                type="email"
                name="email"
                placeholder="Email"
                value={userEmail}
                onChange={({target}) => setUserEmail(target.value)}
                autoComplete="off"
            />
            <input
            className="authentication-form__input"
                type="password"
                name="password"
                placeholder="Пароль"
                value={userPassword}
                onChange={({target}) => setUserPassword(target.value)}
                autoComplete="off"
            />
            <button
                className="authentication-form__button"
                type="submit">
                    Зарегистрироваться
            </button>
            <p className="authentication-form__text">Уже зарегистрированы?
            <Link to="/sign-in" className="authentication-form__link"> Войти</Link>
            </p>
        </form>
    )
}

export default Register;

    // const handleChangeEmail = (e) => {
    //     setUserEmail(e.target.value);
    // }
    // const handleChangePassword = (e) => {
    //     setUserPassword(e.target.value);
    // }