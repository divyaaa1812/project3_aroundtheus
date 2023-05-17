// Get form elementmodal__form_input_field_error_visibles for validation
validationConfig = {
  formElementSelector: ".modal__form-content",
  inputElementSelector: ".modal__text-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonSelector: "modal__button_disabled",
  inputErrorSelector: "modal__input-error_visible",
  errorSelector: "modal__input-error_hide",
};

// Validate error message is displayed for input fields
const showInputError = (formElement, inputElement) => {
  const errorMessage = inputElement.validationMessage;
  inputElement.classList.add("modal__input-error_visible");
  const errorElement = formElement.querySelector(
    `#${inputElement.id}+.modal__input-error`
  );
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.inputErrorSelector);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  inputElement.classList.remove("modal__input-error_visible");
  const errorElement = formElement.querySelector(
    `#${inputElement.id}+.modal__input-error`
  );
  errorElement.classList.remove(validationConfig.errorSelector);
  errorElement.classList.remove(validationConfig.inputElementSelector);
  errorElement.textContent = "";
};

const toggleInputError = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

// The function takes an array of input fields and the button element,
// whose state need to be changed

const toggleButtonState = (inputList, buttonElement) => {
  // If there is at least one invalid input
  if (hasInvalidInput(inputList)) {
    // make the button inactive
    buttonElement.classList.add("modal__button_disabled");
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove("modal__button_disabled");
    buttonElement.removeAttribute("disabled", "disabled");
  }
};

// The function takes an array of form input fields
const hasInvalidInput = (inputList) => {
  // iterate over the array using the some() method
  return inputList.some((inputElement) => {
    // If the field is invalid, the callback will return true.
    // The method will then stop, and hasInvalidInput() function will return true
    return !inputElement.validity.valid;
  });
};

const setEventListeners = (formElement, validationConfig) => {
  // Find all the form fields and make an array of them
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputElementSelector)
  );
  // Find the submit button in the current form
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      toggleInputError(formElement, inputElement);
      // Call the toggleButtonState() and pass an array of fields and the button element
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (validationConfig) => {
  // Find all forms and store in array
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formElementSelector)
  );
  // Iterate over array
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      // Cancel default behavior for each form
      evt.preventDefault();
    });
    // Call the setEventListeners() function for each form
    setEventListeners(formElement, validationConfig);
  });
};

enableValidation(validationConfig);
