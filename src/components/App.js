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
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from "./Auth";
import imageOk from "../images/Image-OK.svg";
import imageNg from "../images/image-NG.svg";

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState([]);
  const [elements, setElements] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isImage, setIsImage] = useState("");
  const [isTitle, setIsTitle] = useState("");
  const [isEmail, setIsEmail] = useState(false);

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

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/");
            setIsInfoTooltip(false);
            setIsEmail();
          }
        })
        .catch(() => {
          setIsImage(imageNg);
          setIsTitle("Что-то пошло не так! Попробуйте ещё раз.");
          handleOpenInfoTooltip();
        });
    }
  }, []);

  useEffect(() => {
    handleOpenInfoTooltip();
  }, []);

  useEffect(() => {
    handleEmail();
  }, [setLoggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      Api.addCardLike(card._id, !isLiked)
        .then((newCard) => {
          setElements((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      Api.deleteCardLike(card._id, !isLiked)
        .then((newCard) => {
          setElements((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function handleCardDelite(card) {
    const isOwn = card.owner._id === currentUser._id;
    Api.removeCard(card._id, !isOwn).then(() => {
      setElements((state) => state.filter((c) => c._id !== card._id));
    });
  }

  //функции открытия попапов
  const handleOpenInfoTooltip = () => {
    setIsInfoTooltip(true);
  };

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

  const onRegister = (email, password) => {
    Auth.register(email, password)
      .then((data) => {
        setIsImage(imageOk);
        setIsTitle("Вы успешно зарегистрировались!");
        if (data.jwt) {
          localStorage.setItem("jwt", data.jwt);
        }
        setLoggedIn(true);
        navigate("/signin");
      })
      .catch((err) => {
        console.error(err);
        setIsImage(imageNg);
        setIsTitle("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(handleOpenInfoTooltip);
  };

  const onLogin = (email, password) => {
    Auth.login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setIsEmail(email);
        navigate("/");
      })
      .catch((err) => {
        handleOpenInfoTooltip();
        setIsImage(imageNg);
        setIsTitle("Что-то пошло не так! Попробуйте ещё раз.");
        console.error(err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setIsEmail(false);
    navigate("/signin");
  };

  const handleEmail = () => {
    setIsEmail(true);
  };

  //функции закрытия попапов
  const closeAllPopups = () => {
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setIsInfoTooltip(false);
    setSelectedCard({});
  };

  const handlePopupClose = (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closeAllPopups();
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route
              path="/signup"
              element={<Register onRegister={onRegister} />}
            />
            <Route path="/signin" element={<Login onLogin={onLogin} />} />
            <Route
              exact
              path="/"
              element={
                <>
                  <Header handleLogout={handleLogout} email={isEmail} />
                  <ProtectedRoute
                    component={Main}
                    loggedIn={loggedIn}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelite}
                    elements={elements}
                  />
                  <Footer />
                </>
              }
            />
            <Route
              path="*"
              element={<Navigate to={loggedIn ? "/" : "/signin"} />}
            />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onClosePopup={handlePopupClose}
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

          <InfoTooltip
            isOpen={isInfoTooltip}
            onClose={closeAllPopups}
            image={isImage}
            title={isTitle}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
