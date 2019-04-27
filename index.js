const { Observable } = require('rxjs/Observable');

const httpObservable = ({ url, params = {}, options = {} }) => {
  return Observable.create(observer => {
    const controller = new AbortController();
    const signal = controller.signal;

    const urlInstance = new URL(url);

    urlInstance.search = new URLSearchParams(params);

    fetch(urlInstance, { ...options, signal })
      .then(response => {
        response.json().then(data => {
          if (response.ok) {
            observer.next(data);
            observer.complete();
          } else {
            observer.error({
              status: response.status,
              data: data,
            });
          }
        });
      })
      .catch(err => {
        observer.error(err);
      });

    return () => controller.abort();
  });
};

module.exports = httpObservable;
