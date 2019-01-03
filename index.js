const { Observable } =  require('rxjs/Observable');

const httpObservable = (url, urlBody) => {
  return Observable.create(observer => {
    const controller = new AbortController();
    const signal = controller.signal;

    window.fetch(url, { ...urlBody, signal})
    .then(response => {
      return response.json();
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
}

module.exports = httpObservable;