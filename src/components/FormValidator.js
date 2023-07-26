class FormValidator {
  constructor(settings, formElement) {
    this._form = formElement;
    this._inputElementSelector = settings.inputElementSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonSelector = settings.inactiveButtonSelector;
    this._inputErrorSelector = settings.inputErrorSelector;
    this._errorSelectorHide = settings.errorSelectorHide;
    this._errorSelector = settings.errorSelector;
  }

  disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonSelector);
    this._buttonElement.setAttribute("disabled", true);
  }

  _showInputError(inputElement) {
    const errorMessage = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorSelector);
    const errorElement = this._form.querySelector(
      `#${inputElement.id}+ .${this._errorSelector}`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._inputErrorSelector);
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._inputErrorSelector);
    const errorElement = this._form.querySelector(
      `#${inputElement.id}+ .${this._errorSelector}`
    );
    // errorElement.classList.remove(this._errorSelectorHide);
    errorElement.classList.remove(this._inputErrorSelector);
    errorElement.textContent = "";
  }

  toggleInputError(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
      this.disableButton();
    } else {
      this._hideInputError(inputElement);
      this._enableButton();
    }
  }

  // The function takes an array of form input fields
  _hasInvalidInput() {
    // iterate over the array using the some() method
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonSelector);
    this._buttonElement.removeAttribute("disabled", false);
  }

  _setEventListeners() {
    // Find all the form fields and make an array of them
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputElementSelector)
    );
    // Find the submit button in the current form
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.toggleInputError(inputElement);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      // Cancel default behavior for form
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
