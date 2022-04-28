const openPopupButton = document.querySelector ('.profile__edit-button');
const popup = document.querySelector ('.popup');
const closePopupButton = document.querySelector ('.popup__close');
const gapInput = document.querySelector ('.profile__title');
const gapJob = document.querySelector ('.profile__subtitle');
// Находим форму в DOM
const formElement = document.querySelector ('.popup__container'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector ('.popup__input_gap_name');  // Воспользуйтесь инструментом .querySelector()
let jobInput =  formElement.querySelector ('.popup__input_gap_job');  // Воспользуйтесь инструментом .querySelector()

//функция добавляет открытие форме через свойство флекс 
function popupOpen () {
popup.classList.add ('popup_opened');
nameInput.value = gapInput.textContent;
jobInput.value = gapJob.textContent;
}

//функция добавляет закрытие форме через удаление флекс 
function popopClose ()  {
popup.classList.remove ('popup_opened')
}

openPopupButton.addEventListener ('click', popupOpen); 
closePopupButton.addEventListener ('click', popopClose); 

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    gapInput.textContent = `${nameInput.value}`;
    gapJob.textContent = `${jobInput.value}`;
    popopClose ();
   
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);



