import React from 'react';
import { useForm } from 'react-hook-form';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, textOnButton }) => {
    
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset
    } = useForm({
        mode: "onChange"
    });

    const onSubmit = ({ name, link }) => {
        onAddPlace({ name, link });
        reset({ name: '', link: '' });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            title={"Новое место"}
            textOnButton={textOnButton}
            onSubmit={handleSubmit(onSubmit)}
            disabled={!isValid}
        >
            <input
                className='popup__input'
                type={"text"}
                {...register('name', { required: true, 
                    minLength: {
                        value: 2,
                        message: "Хотя бы 2 символа..."}, 
                    maxLength: {
                        value: 30,
                        message: "Это уже перебор :) Максимум 30 символов."}
                    })
                }
                placeholder={"Название"}
                autoComplete="off"
            />
            {<span className={`popup__input-span ${errors?.name && "popup__input-error"}`}>{errors?.name?.message}</span>}
            <input
                className='popup__input'
                type={"url"}
                {...register('link', { required: true,
                    pattern: {
                        value: /^(http[s]?:\/\/)(www\.)?[^\s$.?#].[^\s]*$/,
                        message: 'Введите URL, пожалуйста :)'}
                    })
                }
                placeholder={"Ссылка на картинку"}
                autoComplete="off"
            />
            {<span className={`popup__input-span ${errors?.link && "popup__input-error"}`}>{errors?.link?.message}</span>}
        </PopupWithForm>
    )
}

export default AddPlacePopup;

// UPD: рефакторинг после 1 ревью:
// - переписала валидацию со useState на useForm (react-hook-form),
// - убрала импорт компонента для инпута, т.к. useForm работает непосредственно с инпутами, а не с компонентами.
// код от этого даже стал лаконичнее