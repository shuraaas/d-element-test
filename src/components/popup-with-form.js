import Popup from './popup.js';

export default class PopupWithForm extends Popup {
  #handleFormSubmit;
  #form;
  #inputList;
  #submitBtn;
  #submitBtnText;
  #submitError;

  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this.#handleFormSubmit = handleFormSubmit;
    this.#form = this.popup.querySelector('[data-form]');
    this.#inputList = this.popup.querySelectorAll('[data-input]');
    this.#submitBtn = this.popup.querySelector('#submit-btn');
    this.#submitBtnText = this.#submitBtn.textContent;
    this.#submitError = this.popup.querySelector('.form__submit-error');
  }

  #getInputValues() {
    this.inputValues = {};

    this.#inputList.forEach(input => {
      this.inputValues[input.name] = input.value;
    });

    return this.inputValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this.#submitBtn.textContent = 'Sending...';
    } else {
      this.#submitBtn.textContent = this.#submitBtnText;
    }
  }

  setSubmitError(error) {
    this.#submitError.textContent = error;
    this.#submitError.classList.add('form__submit-error_active');
  }

  resetSubmitError() {
    this.#submitError.textContent = '';
    this.#submitError.classList.remove('form__submit-error_active');
  }

  setInputValues(data) {
    this.#inputList.forEach(input => {
      input.value = data[input.name];
    });
  }

  open() {
    super.open();
    this.resetSubmitError();
  }

  close() {
    super.close();
    this.#form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this.#form.addEventListener('submit', evt => {
      evt.preventDefault();
      this.#handleFormSubmit(this.#getInputValues());
    });
  }
}
