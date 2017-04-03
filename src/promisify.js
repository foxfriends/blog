'use strict';
export default f => (...args) => new Promise(r => f(...args, r));
