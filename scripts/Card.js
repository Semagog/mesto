export default class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои
  constructor(data, templateSelector) {
    // name и link — приватные поля,
    // они нужны только внутри класса
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    console.log(this._templateSelector)

  }

  _getTemplate() {
    // здесь выполним все необходимые операции, чтобы вернуть разметку
    // const cardElement = document
    // .querySelector('.')
    const cardElement = document
      .querySelector(this._templateSelector) // используем this._templateSelector
      .content
      .querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }
  generateCard() {
   
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners(); // добавим обработчики
       // добавим свойства классу
       this._image = this._element.querySelector(".element__image");
       this._imageTitle = this._element.querySelector(".element__title");
       this._buttonLike =  this._element.querySelector(".element__like");

    // Добавим данные
    this._image.src = this._link;
    this._image.alt = this._name;
    this._imageTitle.textContent = this._name;
    /// придумать для лайка

    /// придумать для удаления

    // Вернём элемент наружу
    return this._element;
  }

  // добавили метод _handleCardLike
  _handleCardLike() {
    this._buttonLike.classList.toggle("element__liked");
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
