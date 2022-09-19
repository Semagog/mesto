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

// функция проверят правильность феденных данных и меняет состояние кнопки
function validateInput(form, input, config) {
  // создадим красную надпись внизу инпута
  const error = form.querySelector(`.${input.id}-error`);

  if (!input.validity.valid) {
    // добавим красную надпись если с инпутом все плохо
    input.classList.add(config.inputErrorClass);
    //добавим красную надпись если с инпутом все плохо
    error.classList.add(config.errorClass);
    // сообзение с ошибкой
    error.textContent = input.validationMessage;
  } else {
    //удалим красное подчеркивание если с инпутом все ок
    input.classList.remove(config.errorClass);
    //удалим красную надпись если с инпутом все ок
    error.classList.remove(config.errorClass);
    // сообзение с ошибкой скроем
    error.textContent = " ";
  }
}

// установим обработчики для валидации попап инпут
function setHendlers(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  console.log(inputs);
  // пробежимся for each что бы проверять каждую форму в момент ввода
  inputs.forEach((input) => {
    input.addEventListener('input', function (evt) {
      // запускаем проверку инпутов
      validateInput(form, input, config)
    })
  })
}

function enableValidation(config) {
  const form = Array.from(document.querySelectorAll(config.formSelector));

  // form.addEventListener('submit', function (evt) {
  //   console.log(evt);
  //   // evt.preventDefault();
  // });
  setHendlers(form, config);
}

enableValidation(validationConfig);
