export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._page = document.querySelector('.page');
    this._boundHandleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._page.classList.add('page_no-scroll');
    document.addEventListener('keydown', this._boundHandleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._page.classList.remove('page_no-scroll');
    document.removeEventListener('keydown', this._boundHandleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }
}
