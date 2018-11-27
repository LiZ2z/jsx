/**
 * 提供DOM操作的一些方法
 * 1. 创建元素节点
 * 2. 添加类名
 * 3. 移出类名
 * 
 */

import {isArray} from './utils'

export default function createPlainElement(tagName, attributes, ...children) {

  // 1. 创建属性
  let el = document.createElement(tagName)
  // 2. 设置属性
  // if (Object.keys(attributes).length) {
  for (let attr in attributes) {
    if (attr === '_html') {
      el.innerHTML = attributes[attr]
      continue
    }
    if (attr === 'className') {
      el.setAttribute('class', attributes['className'])
      continue
    }
    el.setAttribute(attr, attributes[attr])
  }
  // }

  // 3. 添加子节点
  if (children.length === 0) return el
  appendChild(el, children)

  return el
}


/**
 * null 不渲染
 * boolean 转成字符串渲染
 * string 渲染
 * number 渲染
 * undefined 转成字符串渲染
 * object 特殊处理 
 */
function appendChild(el, children) {
  let i = 0
  let child = null
  let childType = null
  const len = children.length
  do {
    child = children[i]
    childType = typeof child
    if (childType === 'object') {
      if (isArray(child)) {
        appendChild(el, child)
      } else if (typeof child.nodeType !== 'undefined') {
        el.appendChild(child)
      }
    } else if (childType === 'string' || childType === 'number') {
      el.appendChild(document.createTextNode(String(child)))
    }

    i++
  } while (i < len)

  return el
}


export function addClass(el, className) {
  const oldClass = el.className
  if (oldClass.indexOf(className) > -1) return
  el.className = oldClass.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') + ' ' + className
}


export function removeClass(el, className) {
  if (!className) return
  // 空格判断不完整
  el.className = el.className.replace(new RegExp(`([\\s\\uFEFF\\xA0]?)${className}`, 'g'), '')
}