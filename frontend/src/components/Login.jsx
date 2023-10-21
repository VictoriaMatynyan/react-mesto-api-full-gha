import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Login = ({ handleLogIn }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogIn(userEmail, userPassword); // передаём актуальные значения полей формы
    }
    
    // сохраняем последние введённые данные
    useEffect(() => {
        const previousEmail = localStorage.getItem('userName');
        const previousPassword = localStorage.getItem('userPassword');

        previousEmail ? setUserEmail(previousEmail) : setUserEmail('');
        previousPassword ? setUserPassword(previousPassword) : setUserPassword('');
    }, []);

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

// для себя: в теории в calorie-zen компонент Login был расширен так, возможно, 
// этот компонент так же изменю в дальнейшем 
{/* <div className="login__signup">
        <p>Ещё не зарегистрированы?</p>
        <Link to="/register" className="signup__link">Зарегистрироваться</Link>
      </div> */}

// to be improved: добавить на форму noValidate


    // const handleChangeEmail = (e) => {
    //     setUserEmail(e.target.value);
    // }

    // const handleChangePassword = (e) => {
    //     setUserPassword(e.target.value);
    // }