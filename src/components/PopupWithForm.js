import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupModalSelector, handleFormSubmit) {
    super({ popupModalSelector });
    this._popupForm = document.querySelector(popupModalSelector);
    this._handleFormSubmit = handleFormSubmit;
    this.handleSubmit = this.handleSubmit.bind(this);
    this._inputFields = this._popupForm.querySelectorAll(".modal__text-input");
    // this._submitBtn = document.querySelector(submitBtn);
    // this._submitBtnText = this._submitBtn.textContent;
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

  // // add 2 params: isLoading and loadingText with a default text
  // renderLoading(isLoading = true, loadingText = "Saving...") {
  //   if (isLoading) {
  //     this._submitBtn.textContent = loadingText;
  //   } else {
  //     this._submitBtn.textContent = this._submitBtnText;
  //   }
  // }
}
