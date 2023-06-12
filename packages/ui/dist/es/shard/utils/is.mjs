function n(t) {
  return Object.prototype.toString.call(t);
}
function e(t) {
  return n(t) === "[object Number]";
}
function o(t) {
  return n(t) === "[object Function]";
}
export {
  o as isFunction,
  e as isNumber
};
