import Card from "../components/Card.js";

export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  //takes a DOM element and add it to container
  appendItem(element) {
    this._container.append(element);
  }

  //render all card elements
  // renderItems() {
  //   this._items.forEach((cardData) => {
  //     const cardItem = this._renderer(cardData);
  //     this.appendItem(cardItem);
  //   });
  // }

  prependItem(element) {
    this._container.prepend(element);
  }
}
