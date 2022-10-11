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
// Общая функция для открытия и закрытия поп ап

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//Единая функция для закрытия поп ап
// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll(".popup__close");

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest(".popup");

  // ЭКСПЕРМИЕНТЫ
  popup.addEventListener('click', function (e) {
    if (e.target == e.currentTarget)
    closePopup(popup);
  })
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
const cardTemplate = document
  .querySelector("#template-card")
  .content.querySelector(".element");

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

//Обработчики событий
const handleSubmitAddCardForm = (event) => {
  event.preventDefault();
  renderCard({
    name: inputTitleAddCardForm.value,
    link: inputImageAddCardForm.value,
  });
  event.target.reset();
  closePopup(popupAddCardOpen);
};
// обработчик который удаляет карточку
const handleDeleteCard = (evt) => {
  evt.target.closest(".element").remove();
};

//Обработчик который лайкает карчтоку
const handleLikeCard = (evt) => {
  evt.target.classList.toggle("element__liked");
};

// обработчик событий открывет на весь экран фотку
const handleOpenImage = (cardData) => {
  openPopup(popupShowImage);
  popupShowImageSelected.src = cardData.link;
  popupShowImageSelected.alt = cardData.name;
  popupShowImageDescription.textContent = cardData.name;
};

//Генерация карточки
const generateCard = (cardData) => {
  const newCard = cardTemplate.cloneNode(true);
  const titleCard = newCard.querySelector(".element__title");
  const imageCard = newCard.querySelector(".element__image");
  const deleteButton = newCard.querySelector(".element__delete");
  const likeButton = newCard.querySelector(".element__like");

  titleCard.textContent = cardData.name;
  imageCard.src = cardData.link;
  imageCard.alt = `Фото ${cardData.name}`;
  deleteButton.addEventListener("click", handleDeleteCard);
  likeButton.addEventListener("click", handleLikeCard);

  imageCard.addEventListener("click", () => handleOpenImage(cardData));

  return newCard;
};

//Рендер карточки
const renderCard = (cardData) => {
  cardsContainer.prepend(generateCard(cardData));
};

//отрисовка карточек приниает объект
initialCards.forEach((cardData) => {
  renderCard(cardData);
});

popupAddCardForm.addEventListener("submit", handleSubmitAddCardForm);
