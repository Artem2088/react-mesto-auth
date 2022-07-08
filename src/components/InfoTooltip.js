import React from "react";

function InfoTooltip({isOpen, onClose, image, title}) {
  return (
            <div
          className={
            `popup popup_type_infoTooltip ${isOpen && 'popup_opened'}`
          }
        >
          <div className='popup__container popup__container_ok'>
            <img className="popup__image_imageOk"  src={image} alt={title}/>
              <h2 className='popup__title popup__title_ok'>{title}</h2>
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

export default InfoTooltip;
