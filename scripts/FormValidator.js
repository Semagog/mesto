// включение валидации вызовом enableValidation
// все настройки передаются при вызове
export default class FormValidator {
  constructor(config, formElement) {
    this._popupForm = config.formSelector;
    this._input = config.inputSelector;
    this._submit = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }
  //Меняет кнопку на доступную недоступную в зависимости от валидации
  _setButtonStates(inputs, button) {
    const hasErrors = inputs.some((input) => !input.validity.valid);
    if (hasErrors) {
      button.setAttribute("disabled", true);
      button.classList.add(this._inactiveButtonClass);
    } else {
      button.removeAttribute("disabled", true);
      button.classList.remove(this._inactiveButtonClass);
    }
  }
  // функция проверят правильность веденных данных и меняет состояние кнопки
  _validateInput(form, input) {
    // создадим красную надпись внизу инпута
    const error = form.querySelector(`.${input.id}-error`);

    if (!input.validity.valid) {
      this._showError(form, input, error)
      // // добавим красную надпись если с инпутом все плохо
      // input.classList.add(this._inputErrorClass);
      // //добавим красную надпись если с инпутом все плохо
      // error.classList.add(this._errorClass);
      // // сообщение с ошибкой
      // error.textContent = input.validationMessage;
    } else {
      this._hideError (form, input,error)
      // //удалим красное подчеркивание если с инпутом все ок
      // input.classList.remove(this._inputErrorClass);
      // //удалим красную надпись если с инпутом все ок
      // error.classList.remove(this._errorClass);
      // // сообзение с ошибкой скроем
      // error.textContent = " ";
    }
  }
  _showError(form, input,error) {
    // добавим красную надпись если с инпутом все плохо
    input.classList.add(this._inputErrorClass);
    //добавим красную надпись если с инпутом все плохо
    error.classList.add(this._errorClass);
    // сообщение с ошибкой
    error.textContent = input.validationMessage;
  }

  _hideError (form, input,error) {
    //удалим красное подчеркивание если с инпутом все ок
    input.classList.remove(this._inputErrorClass);
    //удалим красную надпись если с инпутом все ок
    error.classList.remove(this._errorClass);
    // сообзение с ошибкой скроем
    error.textContent = " ";

  }
  

  // установим обработчики для валидации попап инпут
  _setHendlers(form) {
    const inputs = Array.from(form.querySelectorAll(this._input));
    // const button = Array.from(form.querySelectorAll(config.submitButtonSelector))
    const button = form.querySelector(this._submit);
    // пробежимся for each что бы проверять каждую форму в момент ввода
    let currentObject = this;
    inputs.forEach((input) => {
      input.addEventListener("input", function () {
        // запускаем проверку инпутов
        currentObject._validateInput(form, input);
        // запускаем проверку кнопки
        currentObject._setButtonStates(inputs, button);
      });
    });
    /// После сабмита ловим событие ресет и ставим 0 милисекунд что бы форма стала в стоковое состояние
    form.addEventListener("reset", () => {
      // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
      setTimeout(() => {
        this._setButtonStates(inputs, button);
      }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
    });
  }

  //  проверяет валидацию для всех поп ап
  enableValidation() {
    const forms = Array.from(document.querySelectorAll(this._popupForm));
    forms.forEach((form) => {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
      });
      this._setHendlers(form);
    });
  }
}
