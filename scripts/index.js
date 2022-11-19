import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
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

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const container = document.querySelector(".elements__cards");
function generateCard(item) {
  const card = new Card(item, ".template-card", handleOpenImage);
  const cardElement = card.generateCard();
  return cardElement;
}
function validationActive(validationConfig, formElement) {
  const formValidate = new FormValidator(validationConfig, formElement);
  formValidate.enableValidation();
}

validationActive(validationConfig, ".popup__container_type_profile");
validationActive(validationConfig, ".popup__container_type_add-card");

// Добавляет карточку из Массива
initialCards.forEach((item) => {
  // // Создадим экземпляр карточки
  // const card = new Card(item,'.template-card');
  // // Создаём карточку и возвращаем наружу
  // const cardElement = card.generateCard();
  // const imageCard = cardElement.querySelector(".element__image");
  // imageCard.addEventListener("click", () => handleOpenImage(item));
  // Добавляем в DOM
  container.prepend(generateCard(item));
});

// Добавляет карточку из полей формы добавления
//Обработчики событий
const handleSubmitAddCardForm = (event) => {
  event.preventDefault();
  const userCardData = {
    name: inputTitleAddCardForm.value,
    link: inputImageAddCardForm.value,
  };
  // const userCard = new Card(userCardData,'.template-card');
  // const userCardElement = userCard.generateCard();
  // generateCard(userCardData);
  // const imageCard = userCardElement.querySelector(".element__image");
  // imageCard.addEventListener("click", () => handleOpenImage(userCardData));
  // Добавляем в DOM
  container.prepend(generateCard(userCardData));
  event.target.reset();
  closePopup(popupAddCardOpen);
};

// переменные для первого попапа
const profilePopup = document.querySelector(".popup_profile");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const gapProfileName = document.querySelector(".profile__title");
const gapProfileJob = document.querySelector(".profile__subtitle");
// переменные для второго попапа
const buttonOpenAddCard = document.querySelector(".profile__add-button");
const popupAddCardOpen = document.querySelector(".popup_add-card");
// Находим форму в DOM
const profileForm = document.querySelector(".popup__container_type_profile"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = profileForm.querySelector(".popup__input_profilename"); // Воспользуйтесь инструментом .querySelector()
const jobInput = profileForm.querySelector(".popup__input_profilejob"); // Воспользуйтесь инструментом .querySelector()

// ФУНКЦИИ
// Если нажать на ESCAPE то закроем поп ап
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}
// Общая функция для открытия и закрытия поп ап

function openPopup(popup) {
  popup.classList.add("popup_opened");
  //добавляем слушатель, который отслеживает нажати esc
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  //отслеживаем нажатие esc и удаляем слушатель, который был добавлен при открытии
  document.removeEventListener("keydown", closeByEscape);
}

//Единая функция для закрытия поп ап
// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll(".popup__close");

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest(".popup");

  // Если нажать на оверлей то закроем поп ап
  popup.addEventListener("click", function (e) {
    if (e.target == e.currentTarget) closePopup(popup);
  });

  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", function (e) {
    closePopup(popup);
  });
});

//Функции частная для Profile Popup
function saveInputDataProfile() {
  openPopup(profilePopup);
  nameInput.value = gapProfileName.textContent;
  jobInput.value = gapProfileJob.textContent;
}

//СЛУШАТЕЛИ
// Слушатели в форме в Profile
buttonEditProfile.addEventListener("click", saveInputDataProfile);

// Слушатели формы addCard
buttonOpenAddCard.addEventListener("click", () => {
  openPopup(popupAddCardOpen);
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent

  gapProfileName.textContent = nameInput.value;
  gapProfileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener("submit", handleProfileFormSubmit);

///шаблоны
//использовал в кард
// const cardTemplate = document
//   .querySelector("#template-card")
//   .content.querySelector(".element");

// DOM элементы
const cardsContainer = document.querySelector(".elements__cards");
const popupAddCardForm = document.querySelector(
  ".popup__container_type_add-card"
);
const inputTitleAddCardForm = document.querySelector(
  ".popup__input_titleaddcard"
);
const inputImageAddCardForm = document.querySelector(
  ".popup__input_imageaddcard"
);

const popupShowImage = document.querySelector(".popup-show-image");
const popupShowImageSelected = document.querySelector(".popup__image-selected");
const popupShowImageDescription = document.querySelector(".popup__description");

// обработчик событий открывет на весь экран фотку
// export const handleOpenImage = (cardData) => {
//   openPopup(popupShowImage);
//   popupShowImageSelected.src = cardData.link;
//   popupShowImageSelected.alt = cardData.name;
//   popupShowImageDescription.textContent = cardData.name;
// };

export function handleOpenImage(link, name) {
  openPopup(popupShowImage);
  popupShowImageSelected.src = link;
  popupShowImageSelected.alt = name;
  popupShowImageDescription.textContent = name;
}
// Обработчик добавления карточки
popupAddCardForm.addEventListener("submit", handleSubmitAddCardForm);
