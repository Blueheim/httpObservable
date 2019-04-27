const { Observable } = require('rxjs/Observable');

const httpObservable = ({ url, params = {}, options = {} }) => {
  return Observable.create(observer => {
    const controller = new AbortController();
    const signal = controller.signal;

    const urlInstance = new URL(url);

    urlInstance.search = new URLSearchParams(params);

    fetch(urlInstance, { ...options, signal })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          observer.error(response);
        }
      })
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
      });

    return () => controller.abort();
  });
};

module.exports = httpObservable;
