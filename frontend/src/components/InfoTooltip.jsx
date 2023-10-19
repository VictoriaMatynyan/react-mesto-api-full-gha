import React from 'react';
import successRegistration from '../images/registration_success.svg';
import failRegistration from '../images/registration_fail.svg';

const InfoTooltip = ({ isOpen, onClose, isSucceeded }) => {
    return (
        <div className={`popup popup-tooltip ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <button 
                    className="popup__close-button" 
                    type="button"
                    onClick={onClose}>
                </button>
                <img 
                    src={isSucceeded ? successRegistration : failRegistration}
                    alt=""
                    className="popup-tooltip__image" 
                />
                <h2
                className="popup-tooltip__title">
                    {isSucceeded ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
                </h2>
            </div>
        </div>
    )
}

export default InfoTooltip;