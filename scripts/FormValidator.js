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
  _setButtonStates() {
    const hasErrors = this._inputs.some((input) => !input.validity.valid);
    if (hasErrors) {
      this._button.setAttribute("disabled", true);
      this._button.classList.add(this._inactiveButtonClass);
    } else {
      this._button.removeAttribute("disabled", true);
      this._button.classList.remove(this._inactiveButtonClass);
    }
  }
  // функция проверят правильность веденных данных
  _validateInput(input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  }
  _showError(input) {
    // создадим красную надпись внизу инпута
    const error = this._form.querySelector(`.${input.id}-error`);
    // добавим красную надпись если с инпутом все плохо
    input.classList.add(this._inputErrorClass);
    //добавим красную надпись если с инпутом все плохо
    error.classList.add(this._errorClass);
    // сообщение с ошибкой
    error.textContent = input.validationMessage;
  }

  _hideError(input) {
    // создадим красную надпись внизу инпута
    const error = this._form.querySelector(`.${input.id}-error`);
    //удалим красное подчеркивание если с инпутом все ок
    input.classList.remove(this._inputErrorClass);
    //удалим красную надпись если с инпутом все ок
    error.classList.remove(this._errorClass);
    // сообзение с ошибкой скроем
    error.textContent = " ";
  }

  // установим обработчики для валидации попап инпут
  _setHendlers() {
    this._inputs = Array.from(this._form.querySelectorAll(this._input));
    // const button = Array.from(form.querySelectorAll(config.submitButtonSelector))
    this._button = this._form.querySelector(this._submit);
    // пробежимся for each что бы проверять каждую форму в момент ввода
    const currentObject = this;
    this._inputs.forEach((input) => {
      input.addEventListener("input", function () {
        // запускаем проверку инпутов
        currentObject._validateInput(input);
        // запускаем проверку кнопки
        currentObject._setButtonStates();
      });
    });
    /// После сабмита ловим событие ресет и ставим 0 милисекунд что бы форма стала в стоковое состояние
    this._form.addEventListener("reset", () => {
      // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
      setTimeout(() => {
        this._setButtonStates();
      }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
    });
  }

  //  проверяет валидацию для всех поп ап
  enableValidation() {
    this._form = document.querySelector(this._formElement)
    this._setHendlers(this._form)
  //   const forms = Array.from(document.querySelectorAll(this._popupForm));
  //   forms.forEach((form) => {
  //     this._setHendlers(form);
  //   });
  }
}
