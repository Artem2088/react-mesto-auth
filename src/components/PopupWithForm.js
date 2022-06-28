import React from 'react';
import '../index.css';

function PopupWithForm({
  title,
  name,
  children,
  form,
  container,
  onClose,
  buttonText, isOpen, onSubmit
}) {
  return (
    <div
      className={
        `popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`
      }
      
    >
      <div className={container}>
        <form className={form} name={name} noValidate onSubmit={onSubmit}>
          <h2 className='popup__title'>{title}</h2>
          {children}
          <button className='popup__btn-save' type='submit' title='Сохранить'>
          {buttonText || 'Сохранить'}
          </button>
        </form>
        <button
          className='popup__btn-close'
          type='button'
          title='Закрыть'
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
