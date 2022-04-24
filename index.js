const openPopupButton = document.querySelector ('.profile__edit-button');
const popup = document.querySelector ('.popup');
const closePopupButton = document.querySelector ('.popup__close');
const savePopupButton = popup.querySelector ('.popup__save');

//функция добавляет открытие форме через свойство флекс 
function popupOpenToggle () {
popup.classList.toggle ('popup_opened')
}

// функция нажатие на облась вне формы ее закрывают
function popupOverlayClickHandler (evt) {
    if (evt.target == evt.currentTarget) {
        popupOpenToggle (); }}

//открытие и закрытие формы в действии
openPopupButton.addEventListener ('click', popupOpenToggle);
closePopupButton.addEventListener ('click', popupOpenToggle);
savePopupButton

//// закрытие формы при нажатии на область в хедере в действии
popup.addEventListener ('click', popupOverlayClickHandler);


 // Находим форму в DOM
let formElement = document.querySelector ('.popup__container'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector ('.popup__name');  // Воспользуйтесь инструментом .querySelector()
let jobInput =  formElement.querySelector ('.popup__job');  // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let nameValue = nameInput.value;     
    let jobValue = jobInput.value;  


    // Выберите элементы, куда должны быть вставлены значения полей
    let gapInput = document.querySelector ('.profile__title');
    let gapJob = document.querySelector ('.profile__subtitle');

    // Вставьте новые значения с помощью textContent
    gapInput.textContent = `${nameValue}`;
    gapJob.textContent = `${jobValue}`;
   
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
savePopupButton.addEventListener ('click', popupOpenToggle);



