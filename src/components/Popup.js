export default class Popup {
  constructor({ popupModalSelector }) {
    this._popupModalSelector = document.querySelector(popupModalSelector);
  }

  openModal() {
    this._popupModalSelector.classList.add("modal_opened");
  }

  closeModal() {
    this._popupModalSelector.classList.remove("modal_opened");
    this.removeEventListener();
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

  removeEventListener() {
    window.removeEventListener("keydown", this._handleEscClose);
    this._popupModalSelector.removeEventListener(
      "mousedown",
      this._closeModalByClick
    );
  }
  setEventListeners() {
    window.addEventListener("keydown", this._handleEscClose);
    this._popupModalSelector.addEventListener(
      "mousedown",
      this._closeModalByClick
    );
  }
}
