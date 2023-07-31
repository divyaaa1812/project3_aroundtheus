export default class Popup {
  constructor({ popupModalSelector }) {
    this._popupModal = document.querySelector(popupModalSelector);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this._popupModal.classList.add("modal_opened");
    this._setEventListeners();
  }

  closeModal() {
    this._popupModal.classList.remove("modal_opened");
    this._removeEventListeners();
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.closeModal();
    }
  };

  _closeModalByClick = (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("modal__close-button")
    ) {
      this.closeModal();
    }
  };

  _removeEventListeners() {
    window.removeEventListener("keydown", this._handleEscClose);
    this._popupModal.removeEventListener("mousedown", this._closeModalByClick);
    this._popupModal
      .querySelector(".modal__close-button")
      .removeEventListener("click", this.closeModal);
  }

  _setEventListeners() {
    window.addEventListener("keydown", this._handleEscClose);
    this._popupModal.addEventListener("mousedown", this._closeModalByClick);
    this._popupModal
      .querySelector(".modal__close-button")
      .addEventListener("click", this.closeModal);
  }
}
