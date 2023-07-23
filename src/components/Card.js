import Api from "../components/Api.js";
import DeleteCardForm from "./DeleteCardForm.js";
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "b685d3e0-616a-4dae-bc5b-53892a4f7953",
    "Content-Type": "application/json",
  },
});

export default class Card {
  constructor(
    cardData,
    cardSelector,
    handleCardClick,
    handleCardDeleteFunctionInIndexComponent
  ) {
    this._cardData = cardData;
    this._id = cardData._id;
    this._name = cardData.name;
    this._link = cardData.link;
    this._owner = cardData.owner._id;
    this._cardId = cardData._id;
    this._likes = cardData.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDeleteFunctionInIndexComponent =
      handleCardDeleteFunctionInIndexComponent;
  }

  _handleFavIconClick = () => {
    //variable to register if current user liked the image or not
    const currentUserLike = this._likes.find((user) => {
      return user._id === "f50447686616d1fa985ca0e1";
    });
    let didCurrentUserLikeThisCard = currentUserLike ? true : false;
    if (didCurrentUserLikeThisCard) {
      // 1. Make a call to network to remove the users like for this card
      api.unLikeACard(this._cardId).then((data) => {
        this._likes = data.likes;
        this._favIconElement.classList.remove("card__fav-icon-selected");
        this._favCountElement.textContent = this._likes.length;
      });
    } else {
      // 1. Make a call to network to add the users like for this card
      api.likeACard(this._cardId).then((data) => {
        this._likes = data.likes;
        // 2. Update state of the like button and update counter
        this._favIconElement.classList.toggle("card__fav-icon-selected");
        this._favCountElement.textContent = this._likes.length;
      });
    }
  };

  _handleDeleteCardFunctionInCardComponent = () => {
    this.deleteCardPopup = new DeleteCardForm(
      "#delete-image-confirm-modal",
      this._handleDeleteCardFormSubmit
    );
    this.deleteCardPopup.openModal();
  };

  _handleDeleteCardFormSubmit = () => {
    this._cardElement.remove();
    this._handleCardDeleteFunctionInIndexComponent(this._cardId);
    if (this.deleteCardPopup) {
      this.deleteCardPopup.closeModal();
    }
  };

  _onCardClick = (ev) => {
    this._handleCardClick(this._cardData);
  };

  getCardElement() {
    this._cardTemplate = document.querySelector(this._cardSelector);
    this._cardElement = this._cardTemplate.content
      .querySelector(".card")
      .cloneNode(true);
    this._deleteCardIcon = this._cardElement.querySelector(".card__del-button");
    if (this._owner === "f50447686616d1fa985ca0e1") {
      this._deleteCardIcon.classList.remove("card__del-button-hidden");
    } else {
      this._deleteCardIcon.classList.add("card__del-button-hidden");
    }
    this._favIconElement = this._cardElement.querySelector(".card__fav-icon");
    const userLikes = this._likes.find((user) => {
      return user._id === "f50447686616d1fa985ca0e1";
    });
    if (userLikes) {
      this._favIconElement.classList.add("card__fav-icon-selected");
    } else {
      this._favIconElement.classList.add("card__fav-icon");
    }
    this._favCountElement = this._cardElement.querySelector(".card__fav_count");
    this._favCountElement.textContent = this._likes.length;
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

  _setEventListeners() {
    this._favIconElement.addEventListener("click", this._handleFavIconClick);
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", this._onCardClick);
    this._deleteCardIcon.addEventListener(
      "click",
      this._handleDeleteCardFunctionInCardComponent
    );
  }
}
