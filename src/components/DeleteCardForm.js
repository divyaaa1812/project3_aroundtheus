import Popup from "./Popup";
export default class DeleteCardForm extends Popup {
  constructor(popupModalSelector, handleFormSubmit) {
    super({ popupModalSelector });
    this._handleFormSubmit = handleFormSubmit;
  }

  onYesClick = (ev) => {
    ev.preventDefault();
    this._handleFormSubmit(this.cardId);
  };

  openModal(cardId) {
    this.cardId = cardId;
    super.openModal();
  }
  _removeEventListeners() {
    super._removeEventListeners();
    document
      .querySelector("#delete-confirm-button")
      .removeEventListener("click", this.onYesClick);
  }

  _setEventListeners() {
    super._setEventListeners();
    document
      .querySelector("#delete-confirm-button")
      .addEventListener("click", this.onYesClick);
  }
}
