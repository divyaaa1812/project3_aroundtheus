export default class Api {
  constructor(options) {
    // constructor body
    this.options = options;
  }

  getInitialCards() {
    return fetch("https://around.nomoreparties.co/v1/cohort-3-en/cards/", {
      method: "GET",
      headers: {
        authorization: "b685d3e0-616a-4dae-bc5b-53892a4f7953",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch("https://around.nomoreparties.co/v1/cohort-3-en/users/me", {
      method: "GET",
      headers: {
        authorization: "b685d3e0-616a-4dae-bc5b-53892a4f7953",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        const name = data.name;
        const subtitle = data.about;
        return { name, subtitle };
      });
  }

  editUserInfo(values) {
    return fetch("https://around.nomoreparties.co/v1/cohort-3-en/users/me", {
      method: "PATCH",
      headers: {
        authorization: "b685d3e0-616a-4dae-bc5b-53892a4f7953",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        about: values.subtitle,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        // process the result
        const name = data.name;
        const subtitle = data.about;
        return { name, subtitle };
      })
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }

  addNewCard(cardValues) {
    return fetch("https://around.nomoreparties.co/v1/cohort-3-en/cards", {
      method: "POST",
      headers: {
        authorization: "b685d3e0-616a-4dae-bc5b-53892a4f7953",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cardValues.name,
        link: cardValues.link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }

  deleteCard(cardId) {
    return fetch(
      `https://around.nomoreparties.co/v1/cohort-3-en/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: "b685d3e0-616a-4dae-bc5b-53892a4f7953",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }

  likeACard(cardId) {
    return fetch(
      `https://around.nomoreparties.co/v1/cohort-3-en/cards/likes/${cardId}`,
      {
        method: "PUT",
        headers: {
          authorization: "b685d3e0-616a-4dae-bc5b-53892a4f7953",
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   likes: values,
        // }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }

  unLikeACard(cardId) {
    return fetch(
      `https://around.nomoreparties.co/v1/cohort-3-en/cards/likes/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: "b685d3e0-616a-4dae-bc5b-53892a4f7953",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }

  updateProfilePic(values) {
    return fetch(
      `PATCH https://around.nomoreparties.co/v1/cohort-3-en/users/me/avatar`,
      {
        method: "PATCH",
        headers: {
          authorization: "b685d3e0-616a-4dae-bc5b-53892a4f7953",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: values.avatar,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }

  renderData() {
    const promises = [
      this.getUserInfo,
      this.getInitialCards,
      this.editUserInfo,
      this.addNewCard,
      this.deleteCard,
      this.likeACard,
      this.unLikeACard,
      this.updateProfilePic,
    ];
    return Promise.all(promises);
  }
}
