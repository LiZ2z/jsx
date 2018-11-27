import Component from './component'
import createPlainElement from './create-plain-element'
import createUElement from './create-u-element'
/**
 * 创建元素
 * @param {DOM元素名| U.Component} tagName 
 * @param {object} attributes 
 * @param {...any} children 
 * 
 * @return {DOM节点} el
 */
export default function createElement(tagName, attributes, ...children) {
  // 组件
  if(typeof tagName === 'function' ) {
    const props = Object.assign({}, attributes, {children: children[0]})
    // 构造函数组件
    if(Object.getPrototypeOf(tagName) === Component) {

      return createUElement(tagName, props)
    } 
    // 普通函数式组件
    else {
      return tagName(props)
    }
  }
  // 普通DOM元素
  else {
    return createPlainElement(tagName, attributes, ...children)
  }
}
