export default class Api {
  constructor(options) {
    // constructor body
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // _request(url, options) {
  //   return fetch(url, options).then(this._checkResponse);
  // }

  getInitialCards() {
    return fetch("https://around.nomoreparties.co/v1/cohort-3-en/cards/", {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch("https://around.nomoreparties.co/v1/cohort-3-en/users/me", {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editUserInfo(values) {
    return fetch("https://around.nomoreparties.co/v1/cohort-3-en/users/me", {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        name: values.name,
        about: values.subtitle,
      }),
    }).then(this._checkResponse);
  }

  addNewCard(cardValues) {
    return fetch("https://around.nomoreparties.co/v1/cohort-3-en/cards", {
      method: "POST",
      headers: this._headers,

      body: JSON.stringify({
        name: cardValues.name,
        link: cardValues.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(
      `https://around.nomoreparties.co/v1/cohort-3-en/cards/${cardId}`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    ).then(this._checkResponse);
  }

  likeACard(cardId) {
    return fetch(
      `https://around.nomoreparties.co/v1/cohort-3-en/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: this._headers,
      }
    ).then(this._checkResponse);
  }

  unLikeACard(cardId) {
    return fetch(
      `https://around.nomoreparties.co/v1/cohort-3-en/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    ).then(this._checkResponse);
  }

  editAvatarLink(inputValues) {
    return fetch(
      `https://around.nomoreparties.co/v1/cohort-3-en/users/me/avatar`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: inputValues.link,
        }),
      }
    ).then(this._checkResponse);
  }

  // renderData() {
  //   const promises = [
  //     this.getUserInfo,
  //     this.getInitialCards,
  //     this.editUserInfo,
  //     this.addNewCard,
  //     this.deleteCard,
  //     this.likeACard,
  //     this.unLikeACard,
  //     this.editAvatarLink,
  //   ];
  //   return Promise.all(promises);
  // }
}
