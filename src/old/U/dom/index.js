const createElement = require('./create-element/index')
const createComponent = require('./create-component/index')
const Component = require('../component/index')

function _createElement(tag) {

  if (!tag) return

  var args = Array.prototype.slice.call(arguments)

  if (typeof tag === 'string') {
    
    return createElement.apply(null, args)

  } else if (typeof tag === 'function') {

    /**
     * 在ie 8 9 10中均不支持 Object.setPrototypeOf  故设置原型的时候  只能使用 __proto__
     * 但是ie  9  10 支持 Object.getPrototypeOf 获取原型
     * 使用 __proto__ 设置的原型, 用getPrototypeOf 获取不到, 但是使用 setPrototypeOf 设置的原型 可以通过 __proto__ 获取到
     * 所以优先通过__proto__ 进行验证
     */

    if ((tag.__proto__ || Object.getPrototypeOf(tag)) !== Component) {
      if (process.env.NODE_ENV === 'development') throw new TypeError('自定义的组件 ' + tag.name + ' 需要继承自Component')
      return null
    }

    return createComponent.apply(null, args)

  }

  return null
}

module.exports = _createElement