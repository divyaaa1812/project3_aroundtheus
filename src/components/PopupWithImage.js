import Popup from "./Popup.js";
class PopupWithImage extends Popup {
  constructor(popupModalSelector, imageSelector) {
    super({ popupModalSelector });
    this.imageSelector = imageSelector;
  }

  openModal({ name, link }) {
    this.setEventListeners();
    const imageEl = this._popupModalSelector.querySelector(this.imageSelector);
    imageEl.setAttribute("src", link);
    imageEl.setAttribute("alt", name);
    super.openModal();
  }

  closeModal() {
    super.closeModal();
    this.removeEventListeners();
    const imageEl = this._popupModalSelector.querySelector(this.imageSelector);
    imageEl.setAttribute("src", "");
    imageEl.setAttribute("alt", "");
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupModalSelector
      .querySelector(".modal__close-button")
      .addEventListener("click", () => {
        this.closeModal();
      });
  }

  removeEventListeners() {
    super.removeEventListener();
    this._popupModalSelector
      .querySelector(".modal__close-button")
      .removeEventListener("click", () => {
        this.closeModal();
      });
  }
}

export default PopupWithImage;
