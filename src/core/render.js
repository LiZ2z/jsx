import {
  unMountQueue
} from './component'

import createObserver from './dom-observer'


export function appendChild(children, parent, isExactAppend = false) {
  // 添加到#root节点
  isExactAppend && (parent.innerHTML = '');
  parent.appendChild(children)

  // didMount
  // 最先触发最末端的节点的DidMount
  let vm = unMountQueue[unMountQueue.length - 1]
  while (vm) {
    vm.__mounted = true
    unMountQueue.pop()
    const fn = vm.componentDidMount
    fn && fn()
    vm = unMountQueue[unMountQueue.length - 1]
  }

}


/**
 * 
 * @param {U.Component} children 
 * @param {DOM节点} parent 
 */
let executed = false
export function render(children, parent) {
  if (executed) {
    if (process.env.NODE_ENV === 'development') {
      throw Error('不能多次执行render')
    }
    return
  }
  executed = true
  appendChild(children, parent, true)

  createObserver(parent)
}



