import { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Api from "../utils/Api";
import AddPlacePopup from "./AddPlacePopup";
import EditImagePopup from "./EditImagePopup";

function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState([]);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    Api.getUserInfo()
      .then((avatar, name, about) => {
        setCurrentUser(avatar, name, about);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    Api.getInitialCards()
      .then((data) => {
        setElements(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    Api.addCardLike(card._id, !isLiked).then((newCard) => {
      setElements((state) =>
        state.map((c) => (c._id === card._id ? newCard : c))
      );
    });
  }

  function handleCardDelite(card) {
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    Api.removeCard(card._id, !isOwn).then(() => {
      setElements((state) => state.filter((c) => c._id !== card._id));
    });
  }

  //функции открытия попапов
  const handleEditAvatarClick = () => {
    setisEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setisEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setisAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleUpdateUser = (data) => {
    Api.updateUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleUpdateAvatar = (data) => {
    Api.updateProfileAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddPlaceSubmit = (data) => {
    Api.addNewCard(data)
      .then((newCard) => {
        setElements([newCard, ...elements]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //функции закрытия попапов
  const closeAllPopups = () => {
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setSelectedCard({});
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelite}
            elements={elements}
          />
          <Footer />
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditImagePopup onClose={closeAllPopups} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
