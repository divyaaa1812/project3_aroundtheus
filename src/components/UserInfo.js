export default class UserInfo {
  constructor({ $name, $subtitle }) {
    this._$name = $name;
    this._$subtitle = $subtitle;
  }

  //method to dispaly user  name and title when form opens up
  getUserInfo() {
    return {
      name: this._$name.textContent,
      subtitle: this._$subtitle.textContent,
    };
  }

  //this meth to new user data and add it to page
  setUserInfo({ name, subtitle }) {
    this._$name.textContent = name;
    this._$subtitle.textContent = subtitle;
  }
}
