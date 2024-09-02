export const settings = {
  formSelector: '[data-form]',

  inputSelector: '[data-input]',

  submitButtonSelector: '#submit-btn',

  disabledButtonClass: 'button_disabled',

  inputErrorClass: 'form__input_type_error',

  errorClass: 'form__input-error_active',
};

export const formValidators = {};

const page = document.querySelector('.page');

export const buttonLetsTalk = page.querySelector('.talk__button');

export const apiConfig = {
  baseUrl: 'https://jsonplaceholder.typicode.com/',
};
