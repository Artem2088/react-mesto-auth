class Api {
  constructor({ headers, baseUrl }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
  }

  getUserInfo() {
    const requestUrl = this._baseUrl + '/users/me';
    return fetch(requestUrl, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getInitialCards() {
    const requestUrl = this._baseUrl + '/cards';
    return fetch(requestUrl, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getPageNeedData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  updateUserInfo(body) {
    const requestUrl = this._baseUrl + '/users/me';
    return fetch(requestUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }

  addNewCard(body) {
    const requestUrl = this._baseUrl + '/cards';
    return fetch(requestUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }

  removeCard(cardId) {
    const requestUrl = this._baseUrl + `/cards/${cardId}`;
    return fetch(requestUrl, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addCardLike(cardId) {
    const requestUrl = this._baseUrl + `/cards/likes/${cardId}`;
    return fetch(requestUrl, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteCardLike(cardId) {
    const requestUrl = this._baseUrl + `/cards/likes/${cardId}`;
    return fetch(requestUrl, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  updateProfileAvatar(body) {
    const requestUrl = this._baseUrl + `/users/me/avatar`;
    return fetch(requestUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }

}
export default new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '5f9407a9-a0bd-4092-b98d-e17e22763f4f',
    'Content-Type': 'application/json',
  },
});
