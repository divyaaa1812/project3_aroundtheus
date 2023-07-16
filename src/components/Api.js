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

  renderData() {
    const promises = [
      this.getUserInfo,
      this.getInitialCards,
      this.editUserInfo,
    ];
    return Promise.all(promises);
  }
}

// const api = new Api({
//   baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
//   headers: {
//     authorization: "b685d3e0-616a-4dae-bc5b-53892a4f7953",
//     "Content-Type": "application/json",
//   },
// });
