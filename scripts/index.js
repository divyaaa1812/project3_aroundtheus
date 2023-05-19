import { disableButton, validationConfig } from "./formValidation.js";

const initialCards = [
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

/*Declare Elements */
const editProfileButton = document.querySelector(".js-profile-edit-button");
const editProfilePopup = document.querySelector("#edit-profile");
const editProfileModalCloseButton = document.querySelector(
  "#edit-profile-modal-close-button"
);
const editProfileSaveButton = document.querySelector(".modal__button");
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardPopup = document.querySelector("#add-new-card");
const addNewCardModalCloseButton = addNewCardPopup.querySelector(
  "#add-new-card-modal-close-button"
);
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
const imageModalCloseButton = document.querySelector(
  "#image-modal-close-button"
);

//extract forms
const profileFormElement = editProfilePopup.querySelector(
  "#modal-form-content"
);
const addNewCardFormElement = addNewCardPopup.querySelector(
  "#add-card-form-content"
);

//close modal by pressing ESC key
function closeModalByEscape(evt) {
  if (evt.key === "Escape") {
    // search for an opened modal
    const openedModal = document.querySelector(".modal_opened");
    // close it
    closeModal(openedModal);
  }
}

//close modal by clicking on overlay
function closeModalByOverlayClick(evt) {
  // target is the element on which the event happened
  // currentTarget is the modal
  // if they are the same then we should close the modal
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains(".modal__close-button")
  ) {
    debugger;
    closeModal(evt.target);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
  modal.addEventListener("mousedown", closeModalByOverlayClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
  modal.removeEventListener("mousedown", closeModalByOverlayClick);
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
  closeModal(editProfilePopup);
}

function handleAddNewCardFormSubmit(event) {
  event.preventDefault();
  const newCardTitle = addNewCardTitleInput.value;
  const newCardLink = addNewCardImageURLInput.value;
  const cardElement = getCardElement({ name: newCardTitle, link: newCardLink });
  cardsList.prepend(cardElement);
  addNewCardFormElement.reset();
  closeModal(addNewCardPopup);
  disableButton(addNewCardCreateButton, validationConfig);
}

/* Event Listeners */
editProfileButton.addEventListener("click", () => {
  openModal(editProfilePopup);
  profileTitleInputField.value = profileTitle.textContent;
  profileSubtitleInputField.value = profileSubtitle.textContent;
});
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addNewCardButton.addEventListener("click", () => {
  openModal(addNewCardPopup);
});

addNewCardFormElement.addEventListener("submit", handleAddNewCardFormSubmit);

function getCardElement(cardData) {
  const cardElement = cardTemplate
    .cloneNode(true)
    .content.querySelector(".card");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const favIconElement = cardElement.querySelector(".card__fav-icon");
  const deleteCardButton = cardElement.querySelector(".card__del-button");
  deleteCardButton.addEventListener("click", () => cardElement.remove());
  cardImage.addEventListener("click", () => {
    openPreviewImageModal(cardData);
  });
  favIconElement.addEventListener("click", () => {
    favIconElement.classList.toggle("card__fav-icon-selected");
  });
  cardTitle.textContent = cardData.name;
  cardImage.setAttribute("src", cardData.link);
  cardImage.setAttribute("alt", `Image of ${cardData.name}`);
  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.append(cardElement);
});
