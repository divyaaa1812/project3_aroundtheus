export default class Popup {
  constructor({ popupModalSelector }) {
    this._popupModalSelector = document.querySelector(popupModalSelector);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this._popupModalSelector.classList.add("modal_opened");
    this.setEventListeners();
  }

  closeModal() {
    this._popupModalSelector.classList.remove("modal_opened");
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
    this._popupModalSelector.removeEventListener(
      "mousedown",
      this._closeModalByClick
    );
    this._popupModalSelector
      .querySelector(".modal__close-button")
      .removeEventListener("click", this.closeModal);
  }

  _setEventListeners() {
    window.addEventListener("keydown", this._handleEscClose);
    this._popupModalSelector.addEventListener(
      "mousedown",
      this._closeModalByClick
    );
    this._popupModalSelector
      .querySelector(".modal__close-button")
      .addEventListener("click", this.closeModal);
  }
}
