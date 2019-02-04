"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('rxjs/Observable'),
    Observable = _require.Observable; //const URLSearchParams = require('@ungap/url-search-params');
//require('whatwg-fetch');


var httpObservable = function httpObservable(url) {
  var urlParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var urlBody = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return Observable.create(function (observer) {
    var controller = new AbortController();
    var signal = controller.signal;
    var urlInstance = new URL(url);
    console.log(URLSearchParams);
    urlInstance.search = new URLSearchParams(urlParams);
    fetch(url, _objectSpread({}, urlBody, {
      signal: signal
    })).then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        observer.error('Request failed with status code:' + response.status);
      }
    }).then(function (body) {
      observer.next(body);
      observer.complete();
    }).catch(function (err) {
      observer.error(err);
    });
    return function () {
      return controller.abort();
    };
  });
};

module.exports = httpObservable;
