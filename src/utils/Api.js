import { BASE_URL } from '../utils/Constants.js';

class Api {
  constructor({ headers, BASE_URL }) {
    this._headers = headers;
    this._BASE_URL = BASE_URL;
    this._jwt = null;
  }

  setToken(jwt) {
    this._jwt = jwt;
    this._headers = {
      ...this._headers,
      authorization: `Bearer ${this._token}`,
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
  }

  getUserInfo() {
    const requestUrl = this._BASE_URL + '/users/me';
    return fetch(requestUrl, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  getInitialCards() {
    const requestUrl = this._BASE_URL + '/cards';
    return fetch(requestUrl, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  getPageNeedData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  updateUserInfo(user) {
    const requestUrl = this._BASE_URL + '/users/me';
    return fetch(requestUrl, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then(this._checkResponse);
  }

  addNewCard(body) {
    const requestUrl = this._BASE_URL + '/cards';
    return fetch(requestUrl, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }

  removeCard(cardId) {
    const requestUrl = this._BASE_URL + `/cards/${cardId}`;
    return fetch(requestUrl, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  addCardLike(cardId) {
    const requestUrl = this._BASE_URL + `/cards/likes/${cardId}`;
    return fetch(requestUrl, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  deleteCardLike(cardId) {
    const requestUrl = this._BASE_URL + `/cards/likes/${cardId}`;
    return fetch(requestUrl, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  updateProfileAvatar(user) {
    const requestUrl = this._BASE_URL + `/users/me/avatar`;
    return fetch(requestUrl, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then(this._checkResponse);
  }
}

export default new Api({
  BASE_URL,
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json',
  },
});
