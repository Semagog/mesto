export default class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои
  constructor(data) {
    // name и link — приватные поля,
    // они нужны только внутри класса
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    // здесь выполним все необходимые операции, чтобы вернуть разметку
    // const cardElement = document
    // .querySelector('.')
    const cardElement = document
      .querySelector("#template-card")
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }
  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners(); // добавим обработчики

    // Добавим данные
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    /// придумать для лайка

    /// придумать для удаления

    // Вернём элемент наружу
    return this._element;
  }

  // добавили метод _handleCardLike
  _handleCardLike() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__liked");
  }
  _handleCardRemove() {
    this._element
      .querySelector(".element__delete")
      .closest(".element")
      .remove();
  }
  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._handleCardLike();
      });
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleCardRemove();
      });
  }
}
