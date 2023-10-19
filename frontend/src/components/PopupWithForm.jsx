import React from "react";

const PopupWithForm = ({ isOpen, name, onClose, title, children, onSubmit, textOnButton, disabled }) => {

    return (
        <div className={`popup ${isOpen && "popup_opened"}`}>
        <div className="popup__container">
            <button
            className="popup__close-button"
            type="button"
            onClick={onClose} />
            <h3 className="popup__header">{title}</h3>
            <form
            className={`popup__input-form popup__input-form_type_${name}`}
            name={name}
            noValidate
            onSubmit={onSubmit}
            >
                {children}
                <button
                type="submit"
                className={`popup__submit-button ${disabled && "popup__submit-button_inactive"}`}
                disabled={disabled} >
                    {textOnButton}
                </button>
            </form>
        </div>
    </div>
    )
}

export default PopupWithForm;
// текст "Сохранить" задан по умолчанию. Теперь, если пропс textOnButton не передать, возьмётся значение по умолчанию