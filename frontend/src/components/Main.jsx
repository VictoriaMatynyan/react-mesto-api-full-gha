import React from 'react';
import Card from './Card.jsx';

//импорт объекта контекста для изменения данных пользователя
import CurrentUserContext from '../contexts/CurrentUserContext.jsx';

const Main = ({
    onEditAvatar, 
    onEditProfile, 
    onAddPlace, 
    onCardClick, 
    onCardLike, 
    onCardDelete,
    cardToBeDeleted,
    cards 
}) => {

    //подписываемся на контекст для изменения данных пользователя
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
        <section className="profile">
            <div className="profile__data">
                <button 
                type="button" 
                className="profile__update-button"
                onClick={onEditAvatar}>
                    <img src={currentUser.avatar}
                    alt="Аватар профиля"
                    className="profile__avatar" />
                </button>
                <div
                className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button 
                    className="profile__edit-button profile__popup-edit"
                    type="button"
                    onClick={onEditProfile}>
                    </button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
            </div>
            <button
            type="button" 
            className="profile__add-button profile__popup-add"
            onClick={onAddPlace}>
            </button>               
        </section>
        <section 
        className="elements" 
        aria-label="Фотокарточки с подписью">
            {cards.map((card) => (
                <Card 
                key={card._id} 
                card={card} 
                onCardClick={onCardClick} 
                onCardLike={onCardLike} 
                onCardDelete={onCardDelete}
                cardToBeDeleted={cardToBeDeleted}
                />
            ))}
        </section>
    </main>
    )
}

export default Main;