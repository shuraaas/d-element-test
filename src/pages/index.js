import './index.scss';

import { settings, formValidators, buttonLetsTalk } from '@utils/constants.js';

import PopupWithForm from '@components/popup-with-form.js';
import FormValidator from '@components/form-validator.js';

const popup = new PopupWithForm({
  popupSelector: '.popup',
  handleFormSubmit: data => {
    console.log(data);
  },
});

const openPopup = () => {
  formValidators['form-submit'].validatePopup();
  popup.open();
};

const enableValidation = config => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(formElement => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);

popup.setEventListeners();

buttonLetsTalk.addEventListener('click', openPopup);
