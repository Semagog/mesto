
// переменные для первого попапа
const buttonEditProfile = document.querySelector ('.profile__edit-button');
const popup = document.querySelector('.popup');
const buttonCloseProfile = popup.querySelector('.popup__close');
const gapProfileName = document.querySelector('.profile__title');
const gapProfileJob = document.querySelector('.profile__subtitle');
// переменные для второго попапа
const buttonOpenAddCard = document.querySelector('.profile__add-button')
const popupAddCardOpen = document.querySelector('.popup-add-card')
const popupAddCardButtonClose = document.querySelector ('.popup-add-card__close')
// Находим форму в DOM
const formElement = document.querySelector ('.popup__container'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector ('.popup__input_gap_name');  // Воспользуйтесь инструментом .querySelector()
const jobInput =  formElement.querySelector ('.popup__input_gap_job');  // Воспользуйтесь инструментом .querySelector()

// ФУНКЦИИ
//функция добавляет открытие форме в профиле через свойство флекс 
function popupOpen () {
popup.classList.add ('popup_opened');
nameInput.value = gapProfileName.textContent;
jobInput.value = gapProfileJob.textContent;
}
//функция добавляет закрытие форме в профиле через удаление флекс 
function popopClose ()  {
  popup.classList.remove ('popup_opened')
  }

/// функция добавляет открытие форме добавления новой карточки через свойство флекс 
function openPopupAddCardButtonForm () {
  popupAddCardOpen.classList.add ('popup-add-card_opened');
}

//функция добавляет закрытие форме через удаление флекс для попапа который создает карточки
function popopAddCardClose ()  {
  popupAddCardOpen.classList.remove ('popup-add-card_opened')
  }

//СЛУШАТЕЛИ
// форма в профиле
buttonEditProfile.addEventListener ('click', popupOpen); 
buttonCloseProfile.addEventListener ('click', popopClose); 
// второй проект добавление карточки
buttonOpenAddCard.addEventListener ('click',openPopupAddCardButtonForm);
popupAddCardButtonClose.addEventListener('click',popopAddCardClose )



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    gapProfileName.textContent = nameInput.value;
    gapProfileJob.textContent = jobInput.value;
    popopClose ();
   
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 
///шаблоны 
const cardTemplate = document.querySelector('#template-card').content.querySelector('.element');


// DOM элементы 
const cardContainer = document.querySelector('.elements__cards');
const popupAddCardForm = document.querySelector('.popup-add-card__container');
const inputTitleAddCardForm = document.querySelector('.popup-add-card__input_gap_title');
const inputImageAddCardForm = document.querySelector('.popup-add-card__input_gap_image');
const popupShowImage = document.querySelector('.popup-show-image');
const popupShowImageSelected = document.querySelector('.popup-show-image__selected');
const popupShowImageDescription = document.querySelector('.popup-show-image__description');
const popupShowImageClose = document.querySelector('.popup-show-image__close');

//Обработчики событий
const handleSubmitAddCardForm = (event) => {
  event.preventDefault ();
  renderCard ({name: inputTitleAddCardForm.value, link: inputImageAddCardForm.value});
  inputTitleAddCardForm.value = '';
  inputImageAddCardForm.value= '';
}
// обработчик который удаляет карточку 
const handleDeleteCard = (evt) => {
evt.target.closest('.element').remove();
}

//Обработчик который лайкает карчтоку
const handleLikeCard  = (evt) => {
  evt.target.closest('.element__like').classList.toggle('element__liked')
}
// обработчик событий открывет на весь экран фотку
const handleOpenImage = (cardData) => {
  popupShowImage.classList.add('popup-show-image_opened')
  popupShowImageSelected.src = cardData.link; 
  popupShowImageDescription.textContent = cardData.name;
}
/// закрывает открытое на весь экран изображение
const handleCloseSelectedImage = () =>{
  popupShowImage.classList.remove('popup-show-image_opened')
}
// обработчик котрый закрывает фотку на весь экран
popupShowImageClose.addEventListener('click', handleCloseSelectedImage)

//Генерация карточки 
const generateCard =  (cardData) => {
  const newCard = cardTemplate.cloneNode(true);
  const titleCard = newCard.querySelector('.element__title');
  const imageCard = newCard.querySelector('.element__image');
  const deleteButton = newCard.querySelector('.element__delete');
  const likeButton = newCard.querySelector('.element__like');
  
  titleCard.textContent = cardData.name;
  imageCard.src = cardData.link;
  imageCard.alt = `Фото ${cardData.name}`;
  deleteButton.addEventListener('click', handleDeleteCard)
  likeButton.addEventListener('click', handleLikeCard)

  imageCard.addEventListener('click',  () => handleOpenImage(cardData));
   
  return newCard;
}



//Рендер карточки
const renderCard = (cardData) => {
  cardContainer.prepend(generateCard(cardData))
}

//отрисовка карточек приниает объект
initialCards.forEach((cardData) => {
  renderCard(cardData);
})

popupAddCardForm.addEventListener('submit', handleSubmitAddCardForm)

