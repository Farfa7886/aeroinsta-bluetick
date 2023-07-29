//cache.js
module.exports = {
  cache: {},
  /**
   * Get a value from a key in the cache
   * @param {string} key Ket to get
   * @returns 
   */
  get: function (key) { return this.cache[key]; },
  /**
   * Sets a value in cache
   * @param {string} key Key
   * @param {*} val Value
   */
  set: function (key, val) { this.cache[key] = val; },
  dumpCache: function () { return this.cache } // this just for testing purpose
}

/* 
var cache = require('./cache');

cache.set('12', 'Hey');
console.log(cache.get('12'));
console.log(cache.dumpCache());
*/