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
      this._submitBtn.textContent = 'Сохранение...';
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    });
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
