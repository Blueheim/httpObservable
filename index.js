import { Observable } from 'rxjs';

const httpObservable = (url, urlBody) {
  return Observable.create(observer => {
    const controller = new AbortController();
    const signal = controller.signal;

    window.fetch(url, { ...urlBody, signal})
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
}

export default httpObservable;
