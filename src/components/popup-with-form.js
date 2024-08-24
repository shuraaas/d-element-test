import Popup from './popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._boundGetInputValues = this._getInputValues.bind(this);
    this._form = this._popup.querySelector('.form');
    this._inputList = this._popup.querySelectorAll('.form__input');
    this._submitBtn = this._popup.querySelector('.form__button');
    this._submitBtnText = this._submitBtn.textContent;
    this._submitError = this._popup.querySelector('.form__submit-error');
  }

  _getInputValues() {
    this.inputValues = {};

    this._inputList.forEach(input => {
      this.inputValues[input.name] = input.value;
    });

    return this.inputValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = 'Sending...';
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }

  setSubmitError(error) {
    this._submitError.textContent = error;
    this._submitError.classList.add('form__submit-error_active');
  }

  resetSubmitError() {
    this._submitError.textContent = '';
    this._submitError.classList.remove('form__submit-error_active');
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    });
  }

  open() {
    super.open();
    this.resetSubmitError();
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
