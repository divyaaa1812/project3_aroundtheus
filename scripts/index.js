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
const editButton = document.querySelector(".js-profile-edit-button");
const editProfileModal = document.querySelector("#edit-profile");
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardModal = document.querySelector("#add-new-card");
const addNewCardModalCloseButton = addNewCardModal.querySelector(
  "#add-new-card-modal-close-button"
);
const previewImageModal = document.querySelector("#preview-image-modal");
const imageModalCloseButton = document.querySelector(
  "#image-modal-close-button"
);
const editProfileModalCloseButton = document.querySelector(
  "#edit-profile-modal-close-button"
);
//Extract title and subtitle elements
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
//Extract input fields from edit profile modal
const profileTitleInputField = document.querySelector("#profile-title-input");
const profileSubtitleInputField = document.querySelector(
  "#profile-subtitle-input"
);
//find card template
const cardTemplate = document.querySelector("#card-template");
//extract add new card elements
const addNewCardTitle = document.querySelector(".card__title");
const addNewCardLink = document.querySelector(".card__image");
//extract add new card input fields
const addNewCardTitleInput = document.querySelector("#add-title-input");
const addNewCardImageURLInput = document.querySelector("#image-link-input");

//extract form elements
const profileFormElement = editProfileModal.querySelector(
  "#modal-form-content"
);
const addNewCardFormElement = addNewCardModal.querySelector(
  "#add-card-form-content"
);

function openEditProfileModal() {
  editProfileModal.classList.add("modal_opened");
}

function closeEditProfileModal() {
  editProfileModal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = profileTitleInputField.value;
  profileSubtitle.textContent = profileSubtitleInputField.value;
  closeEditProfileModal();
}

function openAddNewCardModal() {
  addNewCardModal.classList.add("modal_opened");
}

function closeAddNewCardModal() {
  addNewCardModal.classList.remove("modal_opened");
}

function openPreviewImageModal(cardData) {
  previewImageModal.classList.add("modal_opened");
  previewImageModal
    .querySelector("#imagePreview")
    .setAttribute("src", cardData.link);
}

function closeImageModal() {
  previewImageModal.classList.remove("modal_opened");
}

function handleAddNewCardFormSubmit(event) {
  event.preventDefault();
  const newCardTitle = addNewCardTitleInput.value;
  const newCardLink = addNewCardImageURLInput.value;
  const cardElement = getCardElement({ name: newCardTitle, link: newCardLink });
  document.querySelector(".cards__list").prepend(cardElement.content);
  closeAddNewCardModal();
}

/* Event Listeners */
editButton.addEventListener("click", openEditProfileModal);
editProfileModalCloseButton.addEventListener("click", closeEditProfileModal);
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

addNewCardButton.addEventListener("click", openAddNewCardModal);
addNewCardModalCloseButton.addEventListener("click", closeAddNewCardModal);
addNewCardFormElement.addEventListener("submit", handleAddNewCardFormSubmit);

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.content.querySelector(".card__title");
  const cardImage = cardElement.content.querySelector(".card__image");
  const favIconElement = cardElement.content.querySelector(".card__fav-icon");
  //del button
  const delIcon = cardElement.content.querySelector(".card__del-button");
  delIcon.addEventListener("click", (event) => {
    event.target.parentElement.parentElement.remove();
    cardElement.remove();
  });
  //open image preview model by clicking on image
  cardImage.addEventListener("click", () => {
    openPreviewImageModal(cardData);
  });
  imageModalCloseButton.addEventListener("click", closeImageModal);

  favIconElement.addEventListener("click", () => {
    favIconElement.classList.toggle("card__fav-icon-selected");
  });
  cardTitle.textContent = cardData.name;
  cardImage.setAttribute("src", cardData.link);
  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  document.querySelector(".cards__list").append(cardElement.content);
});
