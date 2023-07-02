import Popup from "./Popup.js";
class PopupWithImage extends Popup {
  constructor() {}

  openModal() {
    this._popupModalSelector
      .querySelector("#imagePreview")
      .setAttribute("src", `${this._link}`);
    this._popupModalSelector
      .querySelector("#imagePreview")
      .setAttribute("alt", `Photo of ${this._name}`);
  }
}
