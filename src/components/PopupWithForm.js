import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupModalSelector, handleFormSubmit, inputList) {
    super({ popupModalSelector });
    this._popupForm = document.querySelector(popupModalSelector);
    this._handleFormSubmit = handleFormSubmit;
    this.handleSubmit = this.handleSubmit.bind(this);
    this._inputFields = this._popupForm.querySelectorAll(".modal__text-input");
  }

  _getInputValues() {
    const inputFields = Array.from(
      this._popupForm.querySelectorAll(".modal__text-input")
    );
    const result = {};
    for (const field of inputFields) {
      result[field["name"]] = field["value"];
    }
    return result;
  }

  setInputValues(data) {
    this._inputFields.forEach((input) => {
      // here you insert the `value` by the `name` of the input
      input.value = data[input.name];
    });
  }

  closeModal() {
    super.closeModal();
    this._popupModalSelector.querySelector(".modal__form-content").reset();
  }

  handleSubmit() {
    this._handleFormSubmit(this._getInputValues());
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popupForm.removeEventListener("submit", this.handleSubmit);
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popupForm.addEventListener("submit", this.handleSubmit);
  }
}
