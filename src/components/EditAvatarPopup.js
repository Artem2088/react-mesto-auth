import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      onClose={onClose}
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      container="popup__container"
      form="popoup__form"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="avatar"
        type="url"
        name="url"
        placeholder="Ссылка на аватар"
        required
        autoComplete="off"
        ref={avatarRef}
        defaultValue=""
      />
      <span className="popup__input-error avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
