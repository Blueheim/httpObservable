"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('rxjs/Observable'),
    Observable = _require.Observable;

var httpObservable = function httpObservable(_ref) {
  var url = _ref.url,
      _ref$params = _ref.params,
      params = _ref$params === void 0 ? {} : _ref$params,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? {} : _ref$options;
  return Observable.create(function (observer) {
    var controller = new AbortController();
    var signal = controller.signal;
    var urlInstance = new URL(url);
    urlInstance.search = new URLSearchParams(params);
    fetch(urlInstance, _objectSpread({}, options, {
      signal: signal
    })).then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        observer.error(response);
      }
    }).then(function (data) {
      observer.next(data);
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
