export const isArray = Array.isArray ? Array.isArray : function (v) {
  return Object.prototype.toString.call(v) === "[object Array]"
}