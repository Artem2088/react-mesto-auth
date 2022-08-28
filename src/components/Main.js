import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../../src/index.css';
import Card from './Card';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  elements,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile'>
        <button
          onClick={onEditAvatar}
          className='profile__avatar-edit'
          type='button'
          title='Обновить аватар'
        ></button>
        <img className='profile__avatar' src={currentUser.avatar} />
        <div className='profile__info'>
          <h1 className='profile__name'>{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            className='profile__btn-edit'
            type='button'
            title='Редактировать профиль'
          ></button>
          <p className='profile__about'>{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          className='profile__btn-add'
          type='button'
          title='Обновить фотографию'
        ></button>
      </section>

      <section className='elements'>
        <ul className='elements__list'>
          {elements.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
