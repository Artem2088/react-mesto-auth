import React from 'react';
import '../index.css';
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
const isOwn = card.owner._id === currentUser._id;
// Создаём переменную, которую после зададим в `className` для кнопки удаления
const cardDeleteButtonClassName = (
  `element__btn-delete ${isOwn ? 'element__btn-delete_visible' : ''}`
); 

// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
const isLiked = card.likes.some(i => i._id === currentUser._id);
// Создаём переменную, которую после зададим в `className` для кнопки лайка
const cardLikeButtonClassName = (
  `element__btn-like ${isLiked ? 'element__btn-like_visible' : ''}`
  ); 

  const handleClick = () => {
    onCardClick(card);
  } 

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleCardDelite = () => {
    onCardDelete(card);
  }

  return (
    <figure className='element'>
      <img
        className='element__image'
        src={card.link}
        alt={`Здесь будет картинка ${card.name}`} 
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        type='button'
        title='Удалить'
        onClick={handleCardDelite}
      />
      <figcaption className='element__info'>
        <h2 className='element__caption'>{card.name}</h2>
        <div className='element__like-container'>
            <button
              className={cardLikeButtonClassName}
              type='button'
              title='Нравится'
              onClick={handleLikeClick}
            />
            <p className='element__like-count'>{card.likes.length}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default Card;
