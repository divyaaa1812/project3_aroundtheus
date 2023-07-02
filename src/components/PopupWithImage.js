import Popup from "./Popup.js";
class PopupWithImage extends Popup {
  constructor(popupModalSelector, imageSelector) {
    super({ popupModalSelector });
    this.imageSelector = imageSelector;
  }

  openModal({ name, link }) {
    this._setEventListeners();
    const imageEl = this._popupModalSelector.querySelector(this.imageSelector);
    imageEl.setAttribute("src", link);
    imageEl.setAttribute("alt", name);
    super.openModal();
  }

  closeModal() {
    super.closeModal();
    this._removeEventListeners();
    const imageEl = this._popupModalSelector.querySelector(this.imageSelector);
    imageEl.setAttribute("src", "");
    imageEl.setAttribute("alt", "");
  }

  _setEventListeners() {
    this._popupModalSelector
      .querySelector(".modal__close-button")
      .addEventListener("click", () => {
        this.closeModal();
      });
  }

  _removeEventListeners() {
    this._popupModalSelector
      .querySelector(".modal__close-button")
      .removeEventListener("click", () => {
        this.closeModal();
      });
  }
}

export default PopupWithImage;
