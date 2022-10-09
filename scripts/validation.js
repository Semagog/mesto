// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//Меняет кнопку на доступную недоступную в зависимости от валидации
function setButtonStates (inputs,button, config) {
 const hasErrors = inputs.some(input => !input.validity.valid);
 if (hasErrors) {
  button.setAttribute('disabled', true);
  button.classList.add(validationConfig.inactiveButtonClass);
 

 }  else {
  button.removeAttribute('disabled', true);
  button.classList.remove(validationConfig.inactiveButtonClass);
  
 }

}

// функция проверят правильность веденных данных и меняет состояние кнопки
function validateInput(form, input, config) {
  // создадим красную надпись внизу инпута
  const error = form.querySelector(`.${input.id}-error`);

  if (!input.validity.valid) {
    // добавим красную надпись если с инпутом все плохо
    input.classList.add(config.inputErrorClass);
    //добавим красную надпись если с инпутом все плохо
    error.classList.add(config.errorClass);
    // сообщение с ошибкой
    error.textContent = input.validationMessage;
  } else {
    //удалим красное подчеркивание если с инпутом все ок
    input.classList.remove(config.inputErrorClass);
    //удалим красную надпись если с инпутом все ок
    error.classList.remove(config.errorClass);
    // сообзение с ошибкой скроем
    error.textContent = " ";
  }
}

// установим обработчики для валидации попап инпут
function setHendlers(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  // const button = Array.from(form.querySelectorAll(config.submitButtonSelector))
  const button = form.querySelector (config.submitButtonSelector);
  // пробежимся for each что бы проверять каждую форму в момент ввода
  inputs.forEach((input) => {
    input.addEventListener('input', function () {
      // запускаем проверку инпутов
      validateInput(form, input, config)
      // запускаем проверку кнопки
      setButtonStates(inputs,button,config)
    })
  })
}

//  проверяет валидацию для всех поп ап
function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form)=> {
    form.addEventListener('submit', function () {
      evt.preventDefault();
    });
    setHendlers(form, config);
  })
}

enableValidation(validationConfig);






