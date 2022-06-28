import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
   const [link, setPlaceLink] = useState('');
   const [name, setPlaceName] = useState('');
   

   function handlPlaceLinkChange(e) {
    setPlaceLink(e.target.value);
   }

   function handlePlaceNameChange(e) {
    setPlaceName(e.target.value);
   }

   useEffect(() => {
    setPlaceName('');
    setPlaceLink('');
  }, [isOpen]); 

    function handleSubmit(e) {
        e.preventDefault();
      
        onAddPlace({
            name,
            link,
        });
      }

    
    return(
        <PopupWithForm
        onClose={onClose}
        name='add'
        title='Новое место'
        isOpen={isOpen}
        container='popup__container'
        form='popoup__form'
        onSubmit={handleSubmit}
      >
        <fieldset className='popup__fieldset'>
          <input
            className='popup__input'
            id='place-name'
            type='text'
            name='name'
            placeholder='Название'
            minLength='2'
            maxLength='30'
            required
            autoComplete='off'
            onChange={handlePlaceNameChange}
            value={name}
          />
          <span className='popup__input-error place-name-error'></span>
          <input
            className='popup__input'
            id='place-link'
            type='url'
            name='url'
            placeholder='Ссылка на картинку'
            required
            autoComplete='off'
            onChange={handlPlaceLinkChange}
            value={link}
          />
          <span className='popup__input-error place-link-error'></span>
        </fieldset>
      </PopupWithForm>
    )
}

export default AddPlacePopup;