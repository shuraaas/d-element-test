export default class Popup {
  #page;
  #boundHandleEscClose;

  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this.#page = document.querySelector('.page');
    this.#boundHandleEscClose = this.#handleEscClose.bind(this);
  }

  #handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this.popup.classList.add('popup_opened');
    this.#page.classList.add('page_no-scroll');
    document.addEventListener('keydown', this.#boundHandleEscClose);
  }

  close() {
    this.popup.classList.remove('popup_opened');
    this.#page.classList.remove('page_no-scroll');
    document.removeEventListener('keydown', this.#boundHandleEscClose);
  }

  setEventListeners() {
    this.popup.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }
}
