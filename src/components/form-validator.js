export default class FormValidator {
  #settings;
  #formElement;
  #inputList;
  #button;

  constructor(settings, formElement) {
    this.#settings = settings;
    this.#formElement = formElement;
    this.#inputList = Array.from(
      this.#formElement.querySelectorAll(this.#settings.inputSelector),
    );
    this.#button = this.#formElement.querySelector(
      this.#settings.submitButtonSelector,
    );
  }

  #showInputError(inputElement, errorMessage) {
    const errorElement = this.#formElement.querySelector(
      `.${inputElement.id}-error`,
    );

    inputElement.classList.add(this.#settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.#settings.errorClass);
  }

  #hideInputError(inputElement) {
    const errorElement = this.#formElement.querySelector(
      `.${inputElement.id}-error`,
    );

    inputElement.classList.remove(this.#settings.inputErrorClass);
    errorElement.classList.remove(this.#settings.errorClass);
    errorElement.textContent = '';
  }

  #setEventListeners() {
    this.#toggleButtonState();

    this.#inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this.#toggleButtonState();
      });
    });
  }

  #toggleButtonState() {
    if (!this.#validate()) {
      this.#button.classList.add(this.#settings.disabledButtonClass);
      this.#button.disabled = true;
    } else {
      this.#button.classList.remove(this.#settings.disabledButtonClass);
      this.#button.disabled = false;
    }
  }

  #validate() {
    this.clearErrors();

    let isValid = true;

    this.#inputList.forEach(inputElement => {
      if (inputElement.name === 'email') {
        const errorMessage = this.#validateEmail(inputElement.value.trim());
        if (errorMessage) {
          this.#showInputError(inputElement, errorMessage);
          isValid = false;
        }
      } else {
        const errorMessage = this.#validateTextInput(inputElement.value.trim());
        if (errorMessage) {
          this.#showInputError(inputElement, errorMessage);
          isValid = false;
        }
      }
    });

    return isValid;
  }

  #validateTextInput(inputElement) {
    if (inputElement === '') {
      return 'Поле обязательно';
    }
    if (inputElement.length < 3) {
      return 'Должно быть более 2-х символов';
    }
    return '';
  }

  #validateEmail(email) {
    if (email === '') {
      return 'Поле обязательно';
    }
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    if (!emailPattern.test(email)) {
      return 'Некорректный адрес электронной почты';
    }
    return '';
  }

  validatePopup() {
    this.#toggleButtonState();
    this.#inputList.forEach(input => this.#hideInputError(input));
  }

  clearErrors() {
    this.#inputList.forEach(input => {
      this.#hideInputError(input);
    });
  }

  enableValidation() {
    this.#setEventListeners();
  }
}
