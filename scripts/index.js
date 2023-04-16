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
//extract form element
const profileFormElement = editProfileModal.querySelector(
  "#modal-form-content"
);

function openModal() {
  editProfileModal.classList.add("modal_opened");
  //set values for input fields after form is opened
  profileTitleInputField.value = profileTitle.textContent;
  profileSubtitleInputField.value = profileSubtitle.textContent;
}

function closeModal() {
  editProfileModal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = profileTitleInputField.value;
  profileSubtitle.textContent = profileSubtitleInputField.value;
  closeModal();
}

function getCardElement(data) {
  const cardElement = document.querySelector("#card-template").cloneNode(true);
  const cardTitle = cardElement.content.querySelector(".card__title");
  const cardImage = cardElement.content.querySelector(".card__image");
  cardTitle.textContent = data.name;
  cardImage.setAttribute("src", data.link);
  return cardElement;
}

for (let item of initialCards) {
  const cardElement = getCardElement(item);
  document.querySelector(".cards__list").appendChild(cardElement.content);
}

/* Event Listeners */
editButton.addEventListener("click", openModal);
modalCloseButton.addEventListener("click", closeModal);
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
