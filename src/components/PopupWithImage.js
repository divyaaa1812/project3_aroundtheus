import Popup from "./Popup.js";
class PopupWithImage extends Popup {
  constructor(popupModalSelector, imageSelector) {
    super({ popupModalSelector });
    this.imageSelector = imageSelector;
  }

  openModal({ name, link }) {
    const imageEl = this._popupModalSelector.querySelector(this.imageSelector);
    imageEl.setAttribute("src", link);
    imageEl.setAttribute("alt", name);
    super.openModal();
  }

  closeModal() {
    super.closeModal();
    const imageEl = this._popupModalSelector.querySelector(this.imageSelector);
    imageEl.setAttribute("src", "");
    imageEl.setAttribute("alt", "");
  }

  setEventListeners() {
    super._setEventListeners();
  }

  removeEventListeners() {
    super._removeEventListener();
  }
}

export default PopupWithImage;
