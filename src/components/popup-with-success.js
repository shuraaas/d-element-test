import Popup from './popup.js';

export default class PopupWithSuccess extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open() {
    super.open();

    setTimeout(() => {
      this.close();
    }, 1500);
  }
}
