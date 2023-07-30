export const settings = {
  inputElementSelector: ".modal__text-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonSelector: "modal__button_disabled",
  inputErrorSelector: "modal__input-error_visible",
  errorSelectorHide: "modal__input-error-hide",
  errorSelector: "modal__input-error",
};

export const submitButton = document.querySelector(
  settings.submitButtonSelector
);

export const editProfileModalFormElement =
  document.querySelector("#edit-profile");
export const addNewCardModalFormElement =
  document.querySelector("#add-new-card");
export const editAvatarModalFormElement =
  document.querySelector("#avatar-edit-modal");
export const createButton = document.querySelector("#create-button");

/*Declare Elements */
export const editProfileButton = document.querySelector(
  ".js-profile-edit-button"
);
export const addNewCardButton = document.querySelector(".profile__add-button");
export const cardsList = document.querySelector(".cards__list");
//Extract title and subtitle elements
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const profileAvatar = document.querySelector(".profile__image");
//Extract input fields from edit profile modal
export const avatarEditButton = document.querySelector(
  ".profile__avatar-edit-button"
);
export const avatarSaveButton = document.querySelector("#avatar-save-button");
