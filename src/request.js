'use strict';

function zip(a, b) {
  return a.map((x, i) => [x, b[i]]);
}

function query(strings, ...params) {
  return zip(strings, params).map(([str, arg]) => {
    switch(typeof arg) {
      case 'undefined':
        return str;
      case 'object':
        return str + Object.keys(arg).map((key) => `${key}=${arg[key]}`).join('&');
      default:
        return str + arg;
    }
  }).join('');
}

function request(what, params = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => resolve((console.log(xhr.responseText), JSON.parse(xhr.responseText))));
    xhr.addEventListener('error', () => reject(xhr.status));
    xhr.open('GET', query `/api/${what}.rb?${params}`, true);
    xhr.send();
  });
}

export default request;
