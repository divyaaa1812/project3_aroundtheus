import Popup from "./Popup";
export default class DeleteCardForm extends Popup {
  constructor(
    popupModalSelector,
    handleFormSubmit,
    deleteConfirmButtonSelector
  ) {
    super({ popupModalSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._deleteConfirmButton = document.querySelector(
      deleteConfirmButtonSelector
    );
  }

  onYesClick = (ev) => {
    ev.preventDefault();
    this._handleFormSubmit(this.cardId, this.cardElement);
  };

  openModal(cardId, cardElement) {
    this.cardId = cardId;
    this.cardElement = cardElement;
    super.openModal();
  }
  _removeEventListeners() {
    super._removeEventListeners();
    this._deleteConfirmButton.removeEventListener("click", this.onYesClick);
  }

  _setEventListeners() {
    super._setEventListeners();
    this._deleteConfirmButton.addEventListener("click", this.onYesClick);
  }
}
