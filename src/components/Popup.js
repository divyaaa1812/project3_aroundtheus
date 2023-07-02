export default class Popup {
  constructor({ popupModalSelector }) {
    this._popupModalSelector = document.querySelector(popupModalSelector);
  }

  openModal() {
    this._popupModalSelector.classList.add("modal_opened");
  }

  closeModal() {
    this._popupModalSelector.classList.remove("modal_opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      closeModal();
    }
  }

  _closeModalByClick(evt) {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("modal__close-button")
    ) {
      closeModal();
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", handleEscClose);
    this._popupModalSelector.addEventListener("mousedown", closeModalByClick);
    document.removeEventListener("keydown", handleEscClose);
    this._popupModalSelector.removeEventListener(
      "mousedown",
      closeModalByClick
    );
  }
}
