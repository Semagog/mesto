const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои
  constructor(name, link) {
    // name и link — приватные поля,
    // они нужны только внутри класса
    this._name = name;
    this._link = link;
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
  _setEventListeners() {
    this._element.querySelector(".element__like").addEventListener("click", () => {
      this._handleCardLike();
    });
  }
}

initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item.name, item.link);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  document.querySelector(".elements__cards").prepend(cardElement);
});
