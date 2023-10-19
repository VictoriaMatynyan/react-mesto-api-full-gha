import React from 'react';

//инпуты у попапов отличаются, но их можно выделить в отдельный уникальный компонент
const ProfileFormInput = ({ type, name, idName, placeholder, minLength, maxLength, value, onChange }) => {

  return (
  <>
    <input
      value={value}
      onChange={onChange}
      type={type}
      id={`${idName}-input`}
      placeholder={placeholder}
      className={`popup__input popup__input_type_${idName}`}
      name={name}
      required
      minLength={minLength ? minLength : ''} //min и maxLength генерализованы, чтобы использовать компонент 
      maxLength={maxLength ? maxLength : ''} //в формах без требований по кол-ву символов
      autoComplete="off" 
    />
  </>
    )
}

export default ProfileFormInput;

// убрали из разметки label и span, чтобы адаптировать их под каждую форму и инпут
// тэг label со стилями даже не нужен
// .popup__field {
//   display: flex;
//   position: relative;
//   padding: 0;
//   flex-direction: column;
// }