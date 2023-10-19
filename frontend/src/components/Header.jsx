import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../images/mesto_logo.svg';

const Header = ({ handleLogOut }) => {
    const [userEmail, setUserEmail] = useState('');

    // создаём стейт для меню-бургера
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

    // функция для изменения видимости меню-бургера: меняем false на true
    const toggleBurgerMenu = () => {
        setIsBurgerMenuOpen(!isBurgerMenuOpen);
    }
    
    useEffect(() => {
        const currentUserEmail = localStorage.getItem('userName');
        currentUserEmail ? setUserEmail(currentUserEmail) : setUserEmail('');
    })

    // создаём переменную для отображения нужной шапки
    const location = useLocation();

    return (
        <header className="header">
            <div className={`header__burger-menu ${isBurgerMenuOpen && "header__burger-menu_opened"}`}>
                <span className="header__user-email">{userEmail}</span>
                <button className="header__quit-button" onClick={handleLogOut}>Выйти</button>
            </div>
            <div className="header__container">
            <img
            src={logo} alt="Логотип Место России"
            className="header__logo" />
            {
                location.pathname === '/sign-in' &&
                (<Link to="sign-up" className="header__link-in">
                    Регистрация
                </Link>)}
            {
                location.pathname === '/sign-up' &&
                (<Link to="sign-in" className="header__link-in">
                    Войти
                </Link>)}
            {
                location.pathname === '/' &&
                (
                    <>
                    <button className={`header__burger-button ${isBurgerMenuOpen && "header__burger-button_opened"}`} 
                    type="button" 
                    onClick={toggleBurgerMenu}>
                    </button>
                    <nav className="header__auth-nav">
                        <p className="header__user-email">{userEmail}</p>
                        <button className="header__quit-button" onClick={handleLogOut}>Выйти</button>
                    </nav>
                    
                </>
                )
            }
            </div>
        </header>
    );
};

export default Header;