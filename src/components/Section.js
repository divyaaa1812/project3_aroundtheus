import Card from "../components/Card.js";

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  //takes a DOM element and add it to container
  appendItem(element) {
    this._containerSelector.append(element);
  }

  //render all card elements
  renderItems() {
    this._items.forEach((cardData) => {
      const cardItem = this._renderer(cardData);
      this.appendItem(cardItem);
    });
  }

  prependItem(item) {
    const cardItem = this._renderer(item);
    this._containerSelector.prepend(cardItem);
  }
}
