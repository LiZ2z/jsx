
module.exports = {
  isType: function(target, type) {
    return Object.prototype.toString.call(target) === '[object ' + type + ']'
  },
  isArray: function(target) {
    return this.isType(target, 'Array')
  },
  isPlainObject: function(target) {
    return this.isType(target, 'Object')
  },
  isPrimitive: function(value) {
    return (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'symbol' ||
      typeof value === 'boolean'
    )
  }

}