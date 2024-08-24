import './index.scss';

import { buttonLetsTalk } from '../utils/constants.js';

import PopupWithForm from '../components/popup-with-form.js';

const popup = new PopupWithForm({
  popupSelector: '.popup',
  handleFormSubmit: data => {
    console.log(data);
  },
});

const openPopup = () => {
  popup.open();
};

popup.setEventListeners();

buttonLetsTalk.addEventListener('click', openPopup);
