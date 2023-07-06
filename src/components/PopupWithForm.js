import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupModalSelector, handleFormSubmit) {
    super({ popupModalSelector });
    this._popupForm = document.querySelector(popupModalSelector);
    this._handleFormSubmit = handleFormSubmit;
    this.handleSubmit = this.handleSubmit.bind(this);
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
    super.closeModal();
    this._popupModalSelector.querySelector(".modal__form-content").reset();
  }

  handleSubmit() {
    this._handleFormSubmit(this._getInputValues());
  }

  removeEventListeners() {
    super._removeEventListeners();
    this._popupForm.removeEventListener("submit", this.handleSubmit);
    // this._popupForm
    //   .querySelector(".modal__close-button")
    //   .removeEventListener("click", () => {
    //     this.closeModal();
    //   });
  }

  setEventListeners() {
    super._setEventListeners();
    this._popupForm.addEventListener("submit", this.handleSubmit);
  }
}
