export default class Api {
  #url;
  #headers;

  constructor(config) {
    this.#url = config.baseUrl;
    this.#headers = {
      'Content-Type': 'application/json',
    };
  }

  #checkResult = res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  };

  postData(data) {
    return fetch(`${this.#url}comments`, {
      method: 'POST',
      headers: this.#headers,
      body: JSON.stringify(data),
    }).then(this.#checkResult);
  }
}
