// еще в работе
import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditImagePopup({onClose}) {

    return(
        <PopupWithForm
        onClose={onClose}
        name='confirm'
        title='Вы уверены?'
        container='popup__container'
        form='popoup__form'
      ></PopupWithForm>
    )
}

export default EditImagePopup;