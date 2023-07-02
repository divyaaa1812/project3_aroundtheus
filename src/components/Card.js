// import {
//   closeModal,
//   closeModalByClick,
//   closeModalByEscape,
//   openModal,
// } from "../pages/index.js";
const previewImagePopup = document.querySelector("#preview-image-modal");
import Popup from "./Popup";
export default class Card {
  constructor(cardData, cardSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _handleFavIcon = () => {
    this._favIconElement.classList.toggle("card__fav-icon-selected");
  };

  _handleDelButton = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _openPreviewImage = () => {
    openModal(previewImagePopup);
    previewImagePopup
      .querySelector("#imagePreview")
      .setAttribute("src", `${this._link}`);
    previewImagePopup
      .querySelector("#imagePreview")
      .setAttribute("alt", `Photo of ${this._name}`);
  };

  _setEventListeners() {
    this._favIconElement.addEventListener("click", this._handleFavIcon);
    this._deleteCardButton.addEventListener("click", this._handleDelButton);
    this._addNewCardLink.addEventListener("click", this._openPreviewImage);
  }

  getCardElement() {
    this._cardTemplate = document.querySelector(this._cardSelector);
    this._cardElement = this._cardTemplate.content
      .querySelector(".card")
      .cloneNode(true);
    this._deleteCardButton =
      this._cardElement.querySelector(".card__del-button");
    this._favIconElement = this._cardElement.querySelector(".card__fav-icon");
    this._addNewCardTitle = this._cardElement.querySelector(".card__title");
    this._addNewCardLink = this._cardElement.querySelector(".card__image");
    this._addNewCardTitle.textContent = this._name;
    this._addNewCardLink.setAttribute("src", `${this._link}`);
    this._addNewCardLink.setAttribute("alt", `Image of ${this._name}`);
    //call eventlistener
    this._setEventListeners();
    //return the card element that is created
    return this._cardElement;
  }
}
