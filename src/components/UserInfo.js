export default class UserInfo {
  constructor({ name, subtitle, link }) {
    this._name = name;
    this._subtitle = subtitle;
    this._link = link; //profile picture image element to set new value
  }

  //method to dispaly user  name and title when form opens up
  getUserInfo() {
    return {
      name: this._name.textContent,
      subtitle: this._subtitle.textContent,
    };
  }

  //this meth to set user data and add it to page
  setUserInfo({ name, subtitle }) {
    this._name.textContent = name;
    this._subtitle.textContent = subtitle;
  }

  //this meth to set avatar image
  setNewAvatar(data) {
    this._link.setAttribute("src", `${data}`);
  }
}
