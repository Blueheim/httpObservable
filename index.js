const { Observable } = require('rxjs/Observable');
const URLSearchParams = require('@ungap/url-search-params');
require('whatwg-fetch');

const httpObservable = (url, urlParams = {}, urlBody = {}) => {
  return Observable.create(observer => {
    const controller = new AbortController();
    const signal = controller.signal;

    const urlInstance = new URL(url);

    urlInstance.search = new URLSearchParams(urlParams);

    fetch(url, { ...urlBody, signal })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          observer.error('Request failed with status code:' + response.status);
        }
      })
      .then(body => {
        observer.next(body);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
      });

    return () => controller.abort();
  });
};

module.exports = httpObservable;
