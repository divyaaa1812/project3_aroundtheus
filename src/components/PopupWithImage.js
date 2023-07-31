import Popup from "./Popup.js";
class PopupWithImage extends Popup {
  constructor(popupModalSelector, imageSelector) {
    super({ popupModalSelector });
    this.imageSelector = imageSelector;
  }

  openModal({ name, link }) {
    const imageEl = this._popupModal.querySelector(this.imageSelector);
    const caption = document.querySelector(".modal__image-caption");
    imageEl.setAttribute("src", link);
    imageEl.setAttribute("alt", name);
    caption.textContent = name;
    super.openModal();
  }

  closeModal() {
    super.closeModal();
    const imageEl = this._popupModal.querySelector(this.imageSelector);
    imageEl.setAttribute("src", "");
    imageEl.setAttribute("alt", "");
  }
}

export default PopupWithImage;
