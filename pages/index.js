import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
const cardData = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

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
export function closeModalByEscape(evt) {
  if (evt.key === "Escape") {
    // search for an opened modal
    const openedModal = document.querySelector(".modal_opened");
    // close it
    closeModal(openedModal);
  }
}

export function closeModalByClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close-button")
  ) {
    closeModal(evt.currentTarget); // currentTarget is the modal
  }
}

export function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
  modal.addEventListener("mousedown", closeModalByClick);
}

export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
  modal.removeEventListener("mousedown", closeModalByClick);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = profileTitleInputField.value;
  profileSubtitle.textContent = profileSubtitleInputField.value;
  profileFormElement.reset();
  closeModal(editProfileModalFormElement);
  editProfileFormValidator.disableButton();
}

function createCard(item) {
  // create instance of Card class
  const card = new Card(item, "#card-template");
  //create a card by calling getCardElement method from Card class
  const cardElement = card.getCardElement();
  //return the card
  return cardElement;
}

function handleAddNewCardFormSubmit(event) {
  event.preventDefault();
  const name = addNewCardTitleInput.value;
  const link = addNewCardImageURLInput.value;
  const cardData = { name, link };
  cardsList.prepend(createCard(cardData));
  addNewCardFormElement.reset();
  closeModal(addNewCardModalFormElement);
  addNewCardFormValidator.disableButton();
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

cardData.forEach((cardData) => {
  // //append the created card to DOM for each itm in card data list declared above
  cardsList.append(createCard(cardData));
});

//instance of FormValidator class
const addNewCardFormValidator = new FormValidator(
  settings,
  addNewCardModalFormElement
);
const editProfileFormValidator = new FormValidator(
  settings,
  editProfileModalFormElement
);
//start form validations
editProfileFormValidator.enableValidation();
addNewCardFormValidator.enableValidation();
