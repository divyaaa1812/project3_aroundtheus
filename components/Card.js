const previewImagePopup = document.querySelector("#preview-image-modal");

const openModal = (modal) => {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
  modal.addEventListener("mousedown", closeModalByClick);
};

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
  modal.removeEventListener("mousedown", closeModalByClick);
}

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

export default class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  _handleFavIcon = () => {
    this._favIconElement.classList.toggle("card__fav-icon-selected");
  };

  _handleDelButton = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  // _openPreviewImage() {
  //   openModal(previewImagePopup);
  //   previewImagePopup
  //     .querySelector("#imagePreview")
  //     .setAttribute("src", this._link);
  //   previewImagePopup
  //     .querySelector("#imagePreview")
  //     .setAttribute("alt", `Photo of ${this._name}`);
  // }

  _setEventListeners() {
    this._favIconElement.addEventListener("click", this._handleFavIcon);
    this._deleteCardButton.addEventListener("click", this._handleDelButton);
    // this._cardImage.addEventListener("click", this._openPreviewImage());
  }

  getCardElement() {
    this._cardTemplate = document.querySelector(this._cardSelector);
    this._cardElement = this._cardTemplate.content
      .querySelector(".card")
      .cloneNode(true);
    this._deleteCardButton =
      this._cardElement.querySelector(".card__del-button");
    this._favIconElement = this._cardElement.querySelector(".card__fav-icon");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle.textContent = this._name;
    this._cardImage.setAttribute("src", `${this._link}`);
    this._cardImage.setAttribute("alt", `Image of ${this._name}`);
    //call eventlistener
    this._setEventListeners();
    //return the card element that is created
    return this._cardElement;
  }
}
