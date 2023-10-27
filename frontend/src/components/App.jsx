import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithImage from './PopupWithImage.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import PopupWithConfirmation from './PopupWithConfirmation.jsx';
import ProtectedRouteElement from './ProtectedRoute.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import InfoTooltip from './InfoTooltip.jsx';

// импорт API
import api from '../utils/Api.js';
import * as auth from '../utils/auth.js';

// импорт объекта контекста для изменения данных пользователя
import CurrentUserContext from '../contexts/CurrentUserContext.jsx';

function App() {

  // создаём стейт для изменения данных пользователя
  const [currentUser, setCurrentUser] = useState({});

  // создаём пустой массив для карточек, которые придут с сервера
  const [cards, setCards] = useState([]);

  // создаём переменные, отвечающие за видимость попапов
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isSucceeded, setIsSucceeded] = useState(false);

  // создаём стейт-переменную для открытия popupWithImage
  const [selectedCard, setSelectedCard] = useState(null);

  // создаём стейт-переменную для удаления карточки
  const [cardToBeDeleted, setCardToBeDeleted] = useState(null);

  // стейт для отображения e-mail пользователя
  // eslint-disable-next-line no-unused-vars
  const [userEmail, setUserEmail] = useState('');

  // создаём стейт для индикаторов загрузки запросов
  const [isLoading, setIsLoading] = useState(false);

  // записываем хук в переменную для получения доступа к его свойствам
  const navigate = useNavigate();

  //создаём стейт для проверки пользователя на авторизацию
  const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
    loggedIn &&
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(`Ошибка хука на выдачу данных: ${err}`); // выведем ошибку в консоль
        });
  }, [loggedIn]);

  const handleRegistration = (email, password) => {
    auth.register(email, password)
    .then((res) => {
      if (!res || res.statusCode === 400) {  
        setIsSucceeded(false);
        setInfoTooltipOpen(true);
      } else {
        setIsSucceeded(true); // если успех - открываем радостный попап
        setInfoTooltipOpen(true);
        navigate('/sign-in', {replace: true}); // и переадресовываем пользователя на главную страницу
      }
    })
    .catch((err) => {
      setIsSucceeded(false);
      setInfoTooltipOpen(true);
      console.log(`Ошибка регистрации: ${err}`);
    })
  }

  const handleLogIn = (email, password) => {
    if (!email || !password) {
      return;
    }
    auth.login(email, password)
      .then((data) => {
        if (data.message) {
          setLoggedIn(true);
          setUserEmail(email);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        console.log(`Ошибка авторизации: ${err}`);
        setInfoTooltipOpen(true);
        setIsSucceeded(false);
      })
  };

  const handleLogOut = () => {
    auth.logout()
    .then(() => {
      setLoggedIn(false);
      setUserEmail(''); // очищаем e-mail
      navigate('/sign-in', {replace: true});
    })
    .catch((err) => {
      console.log(`Ошибка при выходе из системы: ${err}`);
    })
  }

  // создаём обработчики для открытия попапов
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  }
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }
  const handleDeleteCardClick = () => {
    setConfirmationPopupOpen(true);
  }
  
  const handleCardLike = (card) => {
    // снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((currentState) => currentState.map((cardElement) => cardElement._id === card._id ? newCard : cardElement));
    })
    .catch((err) => {
        console.log(`Ошибка при лайке/дислайке элемента: ${err}`);
    })
  }
  // выше, в api, мы принимаем текущее состояние - currentState - и используем map для обновления каждого 
  // элемента массива cards
  // NB: в функции handleCardLike в зависимости от isLiked происходит рендер новой карточки с новым значением isLiked

  const handleCardDelete = (card) => {
    setIsLoading(true);
    api.removeCard(card._id)
    .then(() => {
      // делаем неравными id карточки (возвращаем false), чтобы реализовать её удаление
      setCards((currentState) => currentState.filter((cardElement) => cardElement._id !== card._id));
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка при удалении элемента: ${err}`)
    })
    .finally(() => {
      setIsLoading(false);
      closeAllPopups();
    })
  }

  const handleUpdateUser = ({name, about}) => {
    setIsLoading(true);
    api.editUserInfo({name, about})
    .then((data) => {
      setCurrentUser(data)
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка загрузки данных пользователя: ${err}`);
    })
    .finally(() => setIsLoading(false))
  }

  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    api.editAvatar(avatar)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка загрузки аватара: ${err}`);
    })
    .finally(() => setIsLoading(false))
  }

  const handleAddPlaceSubmit = ({name, link}) => {
    setIsLoading(true);
    api.addNewCard({name, link})
    .then((newCard) => {
      // newCard - новая карточка, добавленная с помощью API, оператор ... расширяет копию текущего массива
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка при добавлении новой карточки: ${err}`);
    })
    .finally(() => {
      setIsLoading(false)
      closeAllPopups();
    })
  }

  // функция закрытия всех попапов
  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmationPopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipOpen(false);
  }

  // закрываем попапы по Esc
  useEffect(() => {
    const closeWithEsc = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', closeWithEsc);
    // удаляем событие при размонтировании компонента
    return () => {
      document.removeEventListener('keydown', closeWithEsc);
    }
  }, [
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isConfirmationPopupOpen,
    isInfoTooltipOpen
  ]);  // App размонтируется только когда пользователь закроет вкладку, поэтому
  // добавляем в массив зависимостей все стейт-переменные относящиеся к модальным окнам

 
  return (
    <>
  <CurrentUserContext.Provider value={currentUser}>
    <Header handleLogOut={handleLogOut} />
    <Routes>
      <Route path='/' element={<ProtectedRouteElement 
      element={Main}
      loggedIn={loggedIn}
      onEditAvatar={handleEditAvatarClick}
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onCardClick={handleCardClick}
      onCardLike={handleCardLike}
      onCardDelete={handleDeleteCardClick} // при нажатии на кнопку удаления открываем попап-подтверждение
      cardToBeDeleted={setCardToBeDeleted} // меняем стейт null на карточку (см. компонент Card)
      cards={cards} />}
      />
      <Route path="/sign-up" element={
        <Register onRegistration={handleRegistration} />
      }/>
      <Route path="/sign-in" element={
        <Login handleLogIn={handleLogIn} />
      }/>
      <Route path='*' element={
        !loggedIn ? <Navigate to='/sign-in' /> : <Navigate to='/' />
      } />
    </Routes>
    <Footer />
    <PopupWithConfirmation
      isOpen={isConfirmationPopupOpen}
      textOnButton={isLoading ? "Сохранение..." : "Да"}
      onClose={closeAllPopups}
      onSubmit={handleCardDelete}
      cardItem={cardToBeDeleted}
    />
    <PopupWithImage
      isOpen={selectedCard}
      card={selectedCard}
      onClose={closeAllPopups}
    />
    <EditProfilePopup
      isOpen={isEditProfilePopupOpen} 
      onClose={closeAllPopups}
      onUpdateUser={handleUpdateUser}
      textOnButton={isLoading ? "Сохранение..." : "Сохранить"}
    />
    <EditAvatarPopup 
      isOpen={isEditAvatarPopupOpen} 
      onClose={closeAllPopups}
      onUpdateAvatar={handleUpdateAvatar}
      textOnButton={isLoading ? "Сохранение..." : "Сохранить"}
    />
    <AddPlacePopup
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onAddPlace={handleAddPlaceSubmit}
      textOnButton={isLoading ? "Сохранение..." : "Создать"}
    />
    <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isSucceeded={isSucceeded} />
  </CurrentUserContext.Provider> 
</>
  );
}

export default App;
