const event = require('./event')
const util = require('../../lib/util')

function createElement(tagName, props) {
  var tag = document.createElement(tagName)

  // 添加属性 或  绑定事件
  if (props && util.isPlainObject(props)) {

    var prop = null

    for (prop in props) {

      if (prop.indexOf('on') === 0) {

        var fn = props[prop]

        if (fn !== undefined && !fn) return false
 
        // 绑定事件, prop.slice(2).toLowerCase()  好像有点问题
        if(process.env.NODE_ENV === 'development') {

          if (fn === undefined) {
            throw new ReferenceError('你给元素 ' + tag.tagName + ' 的 ' + prop + ' 事件绑定了一个函数, 但是你未定义此函数')
          } else if (typeof fn !== 'function') {
            throw new TypeError('元素 ' + tag.tagName + ' 的 ' + prop + ' 事件应该绑定一个函数, 而不是' + typeof fn)
          }

        }

        event.attachEvent(prop.slice(2).toLowerCase(), tag, fn )

      } else {
        
        tag.setAttribute((prop !== 'className' ? prop : 'class'), props[prop])

      }

    }

  }

  // 添加子元素
  var children = Array.prototype.slice.call(arguments, 2)

  return appendChild(tag, children)

}


function appendChild (parent, children) {

  if (!children.length) return parent

  var childVmList = []

  var child = null,
    childNode = null

  for (var i = 0, len = children.length; i < len; i++) {

    child = children[i]
    
    if (util.isPrimitive(child)) { // 传入的是 Primitive 类型的值 num bool str
      
      childNode = document.createTextNode(child)
      
    } else if(util.isArray(child)) { // 传入的是数组

      appendChild(parent, child)

      childNode = null

    } else { // 普通元素
      if(child.isComponent) {
        childVmList.push(child)
      }

      childNode = child.el
      
    }

    if(!childNode) continue;
    
    
    parent.appendChild(childNode)

  }

  return {
    el: parent,
    children: childVmList
  }
}


module.exports = createElement