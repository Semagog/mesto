import { handleOpenImage } from "./index.js";
export default class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои
  constructor(data, templateSelector, handleOpenImage) {
    // name и link — приватные поля,
    // они нужны только внутри класса
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenImage = handleOpenImage;
  }

  _getTemplate() {
    // здесь выполним все необходимые операции, чтобы вернуть разметку
    // const cardElement = document
    // .querySelector('.')
    const cardElement = document
      .querySelector(this._templateSelector) // используем this._templateSelector
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }
  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    // добавим свойства классу
    this._image = this._element.querySelector(".element__image");
    this._imageTitle = this._element.querySelector(".element__title");
    this._buttonLike = this._element.querySelector(".element__like");
    this._buttonDelete = this._element.querySelector(".element__delete");

    // Добавим данные
    this._image.src = this._link;
    this._image.alt = this._name;
    this._imageTitle.textContent = this._name;
    /// придумать для лайка
    this._setEventListeners(); // добавим обработчики

    /// придумать для удаления

    // Вернём элемент наружу
    return this._element;
  }
  // добавили метод _handleCardLike
  _handleCardLike() {
    this._buttonLike.classList.toggle("element__liked");
  }
  _handleCardRemove() {
    this._element.remove();
    this._element = null;
  }
  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
      this._handleCardLike();
    });
    this._buttonDelete.addEventListener("click", () => {
      this._handleCardRemove();
    });
    this._image.addEventListener("click", () => {
      this._handleOpenImage(this._link, this._name);
    });
  }
}
