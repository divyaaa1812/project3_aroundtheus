import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupModalSelector, handleFormSubmit) {
    super({ popupModalSelector });
    this._popupForm = document.querySelector(popupModalSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputFields = Array.from(
      this._popupForm.querySelectorAll(".modal__text-input")
    );
    let result = {};
    for (let field of inputFields) {
      result[field["name"]] = field["value"];
    }
    return result;
  }

  closeModal() {
    this._removeEventListeners();
    this._popupForm.querySelector(".modal__form-content").reset();
    super.closeModal();
  }

  _removeEventListeners() {
    this._popupForm.removeEventListener("submit", this._handleFormSubmit);
    this._popupForm
      .querySelector(".modal__close-button")
      .removeEventListener("click", () => {
        this.closeModal();
      });
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
    this._popupForm
      .querySelector(".modal__close-button")
      .addEventListener("click", () => {
        this.closeModal();
      });
  }
}
