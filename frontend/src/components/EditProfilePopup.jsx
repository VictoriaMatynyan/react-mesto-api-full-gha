import React, { useState, useEffect, useContext } from "react"; 
import PopupWithForm from "./PopupWithForm";
import ProfileFormInput from "./ProfileFormInput";
import CurrentUserContext from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, textOnButton }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    // добавляем валидацию формы
    // создаём состояния, которые покажут, были мы в инпуте или нет. При касании инпута, он будет true
    const [nameDirty, setNameDirty] = useState(false);
    const [descriptionDirty, setDescriptionDirty] = useState(false);
    // создаём состояния для отражения ошибки
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    // создаём состояние, которое отвечает за валидность формы в целом
    const [formValid, setFormValid] = useState(false);
    
    // логика валидации поля Имени
    const validateName = (e) => {
        setName(e.target.value);
        if (e.target.value.length < 2 || e.target.value.length > 40) {
            setNameError('Имя должно содержать от 2 до 40 символов');
        } else {
        setNameError('');
        }
    }

    // логика валидации поля О себе
    const validateDescription = (e) => {
        setDescription(e.target.value);
        if (e.target.value.length < 2 || e.target.value.length > 200) {
            setDescriptionError('Описание должно содержать от 2 до 200 символов');
        } else {
            setDescriptionError('');
        }
    }
    
    function handleChangeName(e) {
        setName(e.target.value);
        setNameDirty(true);
        validateName(e);        
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
        setDescriptionDirty(true);
        validateDescription(e);
    }

    function handleSubmit (e) {
        e.preventDefault();
        if (!nameError && !descriptionError) {
            // Передаём значения управляемых компонентов во внешний обработчик,
            // при условии, что валидация формы прошла успешно
            onUpdateUser({
                name,
                about: description,
            });
        }
    }

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]); // если isOpen = true, то useEffect запустится 1 раз и name и description 
    // будут обновлены на текущие currentUser.name и currentUser.about

    // валидация формы
    useEffect(() => {
        if(nameError || descriptionError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [nameError, descriptionError]);

    return (
        <> 
    <PopupWithForm
        isOpen={isOpen}
        name={"edit"}
        onClose={onClose}
        title={"Редактировать профиль"}
        textOnButton={textOnButton}
        onSubmit={handleSubmit}
        disabled={!formValid}
    >
    <ProfileFormInput
        value={name || ""}
        onChange={handleChangeName}
        type={"text"}
        idName={"name"}
        placeholder={"Ваше имя"}
        className={"popup__input popup__input_type_name"}
        minLength={2}
        maxLength={40}
    />
    {<span className="name-input-error popup__input-error">{(nameDirty && nameError) && nameError}</span>}
    <ProfileFormInput
        value={description || ""}
        onChange={handleChangeDescription}
        type={"text"}
        name={"about"}
        idName={"description"}
        placeholder={"О себе"}
        className={"popup__input popup__input_type_description"}
        minLength={2}
        maxLength={200}
    />
    {<span className="description-input-error popup__input-error">{(descriptionDirty && descriptionError) && descriptionError}</span>}
    </PopupWithForm>
        </> 
    )
}

// указание value как {name || ""} предотвращает "Warning: A component is changing a 
// controlled input to be uncontrolled"

export default EditProfilePopup;