import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "../pages/index.css";

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
const addNewCardButton = document.querySelector(".profile__add-button");
const cardsList = document.querySelector(".cards__list");
//Extract title and subtitle elements
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
//Extract input fields from edit profile modal
const profileTitleInputField = document.querySelector("#profile-title-input");
const profileSubtitleInputField = document.querySelector(
  "#profile-subtitle-input"
);

const newCardPopup = new PopupWithForm(
  "#add-new-card",
  handleAddNewCardFormSubmit
);
const addProfilePopup = new PopupWithForm(
  "#edit-profile",
  handleProfileFormSubmit
);
const userInfo = new UserInfo({
  $name: profileTitle,
  $subtitle: profileSubtitle,
});
const userInputValues = newCardPopup._getInputValues();
const cardImagePopup = new PopupWithImage(
  "#preview-image-modal",
  ".modal-preview-image"
);
const section = new Section(
  { items: [userInputValues], renderer: createCard },
  cardsList
);
// To render initial cards declared above in cardData array
const initialCards = new Section(
  { items: cardData, renderer: createCard },
  cardsList
);
initialCards.renderItems();

function handleOpenEditProfileForm() {
  addProfilePopup.openModal();
  const { name, subtitle } = userInfo.getUserInfo();
  profileTitleInputField.value = name;
  profileSubtitleInputField.value = subtitle;
}

function handleProfileFormSubmit() {
  const newEditFormFieldValues = addProfilePopup._getInputValues();
  userInfo.setUserInfo(newEditFormFieldValues);
  addProfilePopup.closeModal();
  editProfileFormValidator.disableButton();
}

function handleAddNewCardFormSubmit() {
  section.renderItems();
  newCardPopup.closeModal();
  addNewCardFormValidator.disableButton();
}

function onCardClick(card) {
  cardImagePopup.openModal(card);
}

function createCard(item) {
  // create instance of Card class
  const card = new Card(item, "#card-template", onCardClick);
  //create a card by calling getCardElement method from Card class
  const cardElement = card.getCardElement();
  //return the card
  return cardElement;
}

/* Event Listeners */
editProfileButton.addEventListener("click", handleOpenEditProfileForm);
addNewCardButton.addEventListener("click", () => {
  newCardPopup.openModal();
});

//instantiate FormValidator class
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
