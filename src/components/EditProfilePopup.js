import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="edit"
      title="Редактировать профиль"
      container="popup__container"
      form="popoup__form"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          className="popup__input"
          id="name"
          type="text"
          name="title"
          placeholder="О себе"
          minLength="2"
          maxLength="40"
          required
          autoComplete="off"
          onChange={handleNameChange}
          value={name || ""}
        />
        <span className="popup__input-error name-error"></span>
        <input
          className="popup__input"
          id="description"
          type="text"
          name="subtitle"
          placeholder="Хобби"
          minLength="2"
          maxLength="200"
          required
          autoComplete="off"
          onChange={handleDescriptionChange}
          value={description || ""}
        />
        <span className="popup__input-error description-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
