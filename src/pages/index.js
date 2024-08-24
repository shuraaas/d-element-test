import './index.scss';

import { settings, formValidators, buttonLetsTalk } from '@utils/constants.js';

import PopupWithForm from '@components/popup-with-form.js';
import PopupWithSuccess from '@components/popup-with-success.js';
import FormValidator from '@components/form-validator.js';

const submitForm = () => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 2000) + 1000;

    setTimeout(() => {
      const isSuccess = Math.random() > 0.5;

      if (isSuccess) {
        resolve('Форма успешно отправлена!');
      } else {
        reject('Что-то пошло не так...');
      }
    }, delay);
  });
};

const popupSuccess = new PopupWithSuccess('.popup_type_success');

const popup = new PopupWithForm({
  popupSelector: '.popup',
  handleFormSubmit: async data => {
    popup.renderLoading(true);
    popup.resetSubmitError();

    try {
      const result = await submitForm();
      console.log(result);
      popup.close();
      popupSuccess.open();
    } catch (error) {
      console.log(error);
      popup.setSubmitError(error);
    } finally {
      popup.renderLoading(false);
    }
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
popupSuccess.setEventListeners();

buttonLetsTalk.addEventListener('click', openPopup);
