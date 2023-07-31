import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import "../pages/index.css";
import DeleteCardForm from "../components/DeleteCardForm.js";
import * as constant from "../utils/constants.js";

const newCardPopup = new PopupWithForm(
  "#add-new-card",
  handleAddNewCardFormSubmit,
  ".modal__button"
);
const addProfilePopup = new PopupWithForm(
  "#edit-profile",
  handleProfileFormSubmit,
  ".modal__button"
);

const avatarEditPopup = new PopupWithForm(
  "#avatar-edit-modal",
  handleAvatarSaveButton,
  ".modal__button"
);

let userInfo;

const cardImagePopup = new PopupWithImage(
  "#preview-image-modal",
  ".modal-preview-image"
);

const deleteCardPopup = new DeleteCardForm(
  "#delete-image-confirm-modal",
  handleDeleteCardFormSubmit,
  "#delete-confirm-button"
);

//instantiate FormValidator class
const addNewCardFormValidator = new FormValidator(
  constant.settings,
  constant.addNewCardModalFormElement
);
const editProfileFormValidator = new FormValidator(
  constant.settings,
  constant.editProfileModalFormElement
);
const editAvatarFormValidator = new FormValidator(
  constant.settings,
  constant.editAvatarModalFormElement
);
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "b685d3e0-616a-4dae-bc5b-53892a4f7953",
    "Content-Type": "application/json",
  },
});
const section = new Section(
  { items: api.getInitialCards, renderer: createCard },
  constant.cardsList
);

api
  .getUserInfo()
  .then((userData) => {
    userInfo = new UserInfo({
      userData,
      selectors: {
        name: constant.profileTitle,
        subtitle: constant.profileSubtitle,
        link: constant.profileAvatar,
      },
    });
    userInfo.setUserFields();
  })
  .catch((err) => {
    console.log(err);
  });

Promise.all([api.getUserInfo(), api.getInitialCards()])
  // destructure the response
  .then(([userData, cards]) => {
    // set all the data
    userInfo = new UserInfo({
      userData,
      selectors: {
        name: constant.profileTitle,
        subtitle: constant.profileSubtitle,
        link: constant.profileAvatar,
      },
    });
    userInfo.setUserFields();
    section.renderItems(cards);
  })
  .catch((err) => {
    // catch possible errors
  });

function handleOpenEditProfileForm() {
  editProfileFormValidator.disableButton();
  const values = userInfo.getUserInfo();
  addProfilePopup.setInputValues(values);
  addProfilePopup.openModal();
}

function handleProfileFormSubmit(inputValues) {
  constant.submitButton.textContent = "Saving...";
  api
    .editUserInfo(inputValues)
    .then((userData) => {
      userInfo.updateUserData(userData);
      userInfo.setUserFields();
      addProfilePopup.closeModal();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      constant.submitButton.textContent = "Save";
    });
}

function handleAddNewCardButton() {
  addNewCardFormValidator.disableButton();
  newCardPopup.openModal();
}

function createCard(item) {
  // create instance of Card class
  const card = new Card(
    item,
    "#card-template",
    onCardClick,
    handleDeleteCardBinButton,
    onLikeButtonToggle,
    userInfo
  );
  //create a card by calling getCardElement method from Card class
  const cardElement = card.getCardElement();
  //return the card
  return cardElement;
}

function onLikeButtonToggle(cardId, status, callbackFn) {
  if (status === "like") {
    api.likeACard(cardId).then((data) => {
      callbackFn(data);
    });
  } else {
    api.unLikeACard(cardId).then(callbackFn);
  }
}

function handleAddNewCardFormSubmit(inputValues) {
  //set button to Saving.. while api call is made
  constant.createButton.textContent = "Saving...";
  //create a new card with input values from server
  api
    .addNewCard(inputValues)
    .then((data) => {
      const card = createCard(data);
      //Attach new card to begining of container
      section.prependItem(card);
      //close popup after submit
      newCardPopup.closeModal();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      constant.createButton.textContent = "Create";
    });
}

function onCardClick(card) {
  cardImagePopup.openModal(card);
}

function handleAvatarEditButton() {
  avatarEditPopup.openModal();
  editAvatarFormValidator.disableButton();
}

function handleAvatarSaveButton(inputValues) {
  constant.avatarSaveButton.textContent = "Saving...";
  api
    .editAvatarLink(inputValues)
    .then((userData) => {
      userInfo.updateUserData(userData);
      userInfo.setUserFields();
    })
    .then((err) => {
      console.log(err);
    })
    .finally(() => {
      constant.avatarSaveButton.textContent = "Save";
    });
  avatarEditPopup.closeModal();
}

function handleDeleteCardBinButton(id, cardElement) {
  deleteCardPopup.openModal(id, cardElement);
}

function handleDeleteCardFormSubmit(cardId, cardElement) {
  api
    .deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      // show error
      console.log(err);
    })
    .finally(() => {
      deleteCardPopup.closeModal();
    });
}

/* Event Listeners */
constant.editProfileButton.addEventListener("click", handleOpenEditProfileForm);
constant.addNewCardButton.addEventListener("click", handleAddNewCardButton);
constant.avatarEditButton.addEventListener("click", handleAvatarEditButton);

//start form validations
editProfileFormValidator.enableValidation();
addNewCardFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();
