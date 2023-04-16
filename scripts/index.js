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

const editButton = document.querySelector(".js-profile-edit-button");
const editProfileModal = document.querySelector(".js-modal");
const modalCloseButton = document.querySelector(".js-modal-close-button");
//Extract title and subtitle elements
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
//Extract input fields from modal
const profileTitleInputField = document.querySelector("#profile-title-input");
const profileSubtitleInputField = document.querySelector(
  "#profile-subtitle-input"
);

function openModal() {
  editProfileModal.classList.add("modal_opened");
  //set values for input fileds after form is opened
  profileTitleInputField.value = profileTitle.textContent;
  profileSubtitleInputField.value = profileSubtitle.textContent;
}
editButton.addEventListener("click", openModal);

function closeModal() {
  editProfileModal.classList.remove("modal_opened");
}
modalCloseButton.addEventListener("click", closeModal);

for (i = 0; i <= initialCards.length; i++) {}

function getCardElement(data) {
  const cardElement = document.querySelector("#card-template").cloneNode(true);
  console.log(cardElement);
  const cardTitle = document.querySelector(".card__title");
  const images = document.querySelector(".card__image");
}
