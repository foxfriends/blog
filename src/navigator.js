'use strict';

let page = 1, search = '', post = null, events = {};
let current;
if((current = window.location.href).indexOf('?') !== -1) {
  parseQuery(current);
} else {
  parsePath(current = window.location.pathname);
}

function setLocation(query) {
  page = +query.page || 1;
  search = query.search || '';
  post = query.post || null;
}

function parseQuery(loc) {
  const query = loc.split('?')[1].split('&').map(p => p.split('=')).reduce((p, c) => ({...p, [c[0]]: c[1]}), {})
  setLocation(query)
}

function parsePath(loc) {
  const parts = loc.split('/');
  const query = {};
  for(let i = 0; i < parts.length; i += 2) {
    query[parts[i]] = parts[i + 1];
  }
  setLocation(query);
  console.log(query);
}

function url() {
  let str = '/';
  if(search !== '') str += `search/${search}/`;
  if(page > 1) str += `page/${page}/`;
  if(post !== null) str = `/post/${post}/`;
  return str;
}

function go(query) {
  setLocation(query);
  (events['go'] || []).forEach(x => x({ state: { page, search, post } }));
  window.history.pushState({ page, search, post }, '', url());
}

function get() {
  return { page, search, post };
}

function on(event, handler) {
  events[event] = events[event] || [];
  events[event].push(handler);
}

export default { get, go, on };
