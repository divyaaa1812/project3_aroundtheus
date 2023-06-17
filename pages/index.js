import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

// {
//   name: "Lake Louise",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
// },
// {
//   name: "Bald Mountains",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
// },
// {
//   name: "Latemar",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
// },
// {
//   name: "Vanoise National Park",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
// },
// {
//   name: "Lago di Braies",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
// },

const card = new Card(cardData, "#card-template");

export const settings = {
  inputElementSelector: ".modal__text-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonSelector: "modal__button_disabled",
  inputErrorSelector: "modal__input-error_visible",
  errorSelectorHide: "modal__input-error-hide",
  errorSelector: "modal__input-error",
};
const editProfileModalFormElement = document.querySelector("#edit-profile");
const addNewCardModalFormElement = document.querySelector("#add-new-card");

const addNewCardFormValidator = new FormValidator(
  settings,
  addNewCardModalFormElement
);
const editProfileFormValidator = new FormValidator(
  settings,
  editProfileModalFormElement
);

/*Declare Elements */
const editProfileButton = document.querySelector(".js-profile-edit-button");
const editProfileSaveButton = document.querySelector(".modal__button");
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardCreateButton = document.querySelector("#create-button");
const cardsList = document.querySelector(".cards__list");
//Extract title and subtitle elements
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
//Extract input fields from edit profile modal
const profileTitleInputField = document.querySelector("#profile-title-input");
const profileSubtitleInputField = document.querySelector(
  "#profile-subtitle-input"
);
//find card template & extract add new card elements
const cardTemplate = document.querySelector("#card-template");
const addNewCardTitle = document.querySelector(".card__title");
const addNewCardLink = document.querySelector(".card__image");
const addNewCardTitleInput = document.querySelector("#add-title-input");
const addNewCardImageURLInput = document.querySelector("#image-link-input");
const previewImagePopup = document.querySelector("#preview-image-modal");
//extract forms
const profileFormElement = editProfileModalFormElement.querySelector(
  "#modal-form-content"
);
const addNewCardFormElement = addNewCardModalFormElement.querySelector(
  "#add-card-form-content"
);

// close modal by pressing ESC key
function closeModalByEscape(evt) {
  if (evt.key === "Escape") {
    // search for an opened modal
    const openedModal = document.querySelector(".modal_opened");
    // close it
    closeModal(openedModal);
  }
}

function closeModalByClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close-button")
  ) {
    closeModal(evt.currentTarget); // currentTarget is the modal
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
  modal.addEventListener("mousedown", closeModalByClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
  modal.removeEventListener("mousedown", closeModalByClick);
}

function openPreviewImageModal(cardData) {
  openModal(previewImagePopup);
  previewImagePopup
    .querySelector("#imagePreview")
    .setAttribute("src", cardData.link);
  previewImagePopup
    .querySelector("#imagePreview")
    .setAttribute("alt", `Photo of ${cardData.name}`);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = profileTitleInputField.value;
  profileSubtitle.textContent = profileSubtitleInputField.value;
  profileFormElement.reset();
  closeModal(editProfileModalFormElement);
  editProfileFormValidator._disableButton();
}

function handleAddNewCardFormSubmit(event) {
  event.preventDefault();
  const newCardTitle = addNewCardTitleInput.value;
  const newCardLink = addNewCardImageURLInput.value;
  const cardElement = card.getCardElement();
  cardsList.prepend(cardElement);
  addNewCardFormElement.reset();
  closeModal(addNewCardModalFormElement);
  addNewCardFormValidator._disableButton();
}

/* Event Listeners */
editProfileButton.addEventListener("click", () => {
  openModal(editProfileModalFormElement);
  profileTitleInputField.value = profileTitle.textContent;
  profileSubtitleInputField.value = profileSubtitle.textContent;
});
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addNewCardButton.addEventListener("click", () => {
  openModal(addNewCardModalFormElement);
});

addNewCardFormElement.addEventListener("submit", handleAddNewCardFormSubmit);

// function getCardElement(cardData) {
//   const cardElement = cardTemplate
//     .cloneNode(true)
//     .content.querySelector(".card");
//   const cardTitle = cardElement.querySelector(".card__title");
//   const cardImage = cardElement.querySelector(".card__image");
//   // const favIconElement = cardElement.querySelector(".card__fav-icon");
//   // const deleteCardButton = cardElement.querySelector(".card__del-button");
//   // deleteCardButton.addEventListener("click", () => cardElement.remove());
//   cardImage.addEventListener("click", () => {
//     openPreviewImageModal(cardData);
//   });
//   // favIconElement.addEventListener("click", () => {
//   //   favIconElement.classList.toggle("card__fav-icon-selected");
//   // });
//   cardTitle.textContent = cardData.name;
//   cardImage.setAttribute("src", cardData.link);
// cardImage.setAttribute("alt", `Image of ${cardData.name}`);
//   return cardElement;
// }
cardsList.append(card.getCardElement());
editProfileFormValidator.enableValidation();
addNewCardFormValidator.enableValidation();
