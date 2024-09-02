import './index.scss';

import {
  settings,
  formValidators,
  buttonLetsTalk,
  apiConfig,
} from '@utils/constants.js';

import PopupWithForm from '@components/popup-with-form.js';
import PopupWithSuccess from '@components/popup-with-success.js';
import FormValidator from '@components/form-validator.js';
import Api from '../api/api.js';

const api = new Api(apiConfig);

const popupSuccess = new PopupWithSuccess('#success-popup');

const popup = new PopupWithForm({
  popupSelector: '#popup',
  handleFormSubmit: async data => {
    popup.renderLoading(true);
    popup.resetSubmitError();

    try {
      const result = await api.postData({
        postId: 1,
        name: data.name,
        email: data.email,
        body: data.message,
      });

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
