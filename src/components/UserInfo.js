export default class UserInfo {
  constructor({ userData, selectors }) {
    this._nameEl = selectors.name;
    this._linkEl = selectors.link;
    this._subtitleEl = selectors.subtitle;
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
    this._userData = {
      ...this._userData,
      ...userData,
    };
  }
}
