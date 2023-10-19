import React from "react";
import { useForm } from "react-hook-form"
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, textOnButton }) => {

    //создаём настройки для валидации формы через react-hook-form
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm({
        mode: "onChange"
    });

    // создаём хендлер для отправки формы и передаём данные из полей формы
    const onSubmit = (avatar) => {
        onUpdateAvatar(avatar); 
        reset({ avatar: '' });
    }

    return (
        <>
    <PopupWithForm
        isOpen={isOpen}
        name={"update"}
        onClose={onClose}
        title={"Обновить аватар"}
        textOnButton={textOnButton}
        onSubmit={handleSubmit(onSubmit)}
        disabled={!isValid}
        >
    <input
        {...register('avatar', { required: true,
        pattern: {
            value: /^(http[s]?:\/\/)(www\.)?[^\s$.?#].[^\s]*$/,
            message: 'Введите URL, пожалуйста :)'}
        })}
        type={"url"}
        placeholder={"Ссылка на картинку"}
        className={"popup__input popup__input_type_update"}
        required
        autoComplete="off" 
    />
    {
    <span className={`popup__input-span ${errors?.avatar && "popup__input-error"}`}>{errors?.avatar?.message}</span>
    }
    </PopupWithForm>
        </>
    )
}

export default EditAvatarPopup;

// UPD: рефакторинг после 1 ревью:
// - переписала валидацию со useState на useForm (react-hook-form).