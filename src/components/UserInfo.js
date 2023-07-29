export default class UserInfo {
  constructor({ userData, selectors }) {
    this._nameEl = selectors.name;
    this._linkEl = selectors.link;
    this._subtitleEl = selectors.subtitle;
    /*
    {name: 'James Boudin', about: 'Traveller', avatar: 'https://tse2.mm.bing.net/th?id=OIP.kqj97k4nSYxid6qEl-zmvQHaE8&pid=Api&P=0&h=180', _id: 'f50447686616d1fa985ca0e1', cohort: 'cohort-3-en'}
    */
    this._userData = userData;
  }

  setUserFields() {
    this._nameEl.textContent = this._userData.name;
    this._subtitleEl.textContent = this._userData.about;
    this._linkEl.setAttribute("src", this._userData.avatar);
  }

  //method to dispaly user  name and title when form opens up
  getUserInfo() {
    return {
      name: this._userData.name,
      subtitle: this._userData.about,
      id: this._userData._id,
    };
  }

  updateUserData(userData) {
    // i = {a: "one",b: "two"}
    // j = {a: "one-two"}
    // k = {...i} -> {a: "one", b: "two"}
    // k = {...i, ...j} -> {a: "one-two", b: "two"}
    this._userData = {
      ...this._userData,
      ...userData,
    };
  }
}
