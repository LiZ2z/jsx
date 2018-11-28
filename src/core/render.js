import {
  vmQueue,
  unMountQueue
} from './component'


export function appendChild(children, parent, isExactAppend = false) {
  // 添加到#root节点
  isExactAppend && (parent.innerHTML = '');
  parent.appendChild(children)

  // didMount
  // 最先触发最末端的节点的DidMount
  let vm = unMountQueue[unMountQueue.length - 1]
  while (vm) {
    vm._mounted = true
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
  createObserver(parent)
  appendChild(children, parent, true)
}



/**
 * 创建一个DOM observer, 监听DOM移除事件
 * 如果一个vm的最外层的DOM节点被移除了，这个vm及其子集的vm都可以注销了
 * @param {Element} target 
 */
function createObserver(target) {
  const config = {
    attributes: true,
    childList: true,
    subtree: true
  }

  const observer = new MutationObserver(function (mutationsList) {
    let mutationRecord = null

    for (let i = 0, len = mutationsList.length; i < len; i++) {
      mutationRecord = mutationsList[i]
      if (mutationRecord.type !== 'childList') continue
      if (mutationRecord.removedNodes.length > 0) {
        if (process.env.NODE_ENV === 'development') {
          console.log('A child node has been removed.');
        }
        unMount(mutationRecord.removedNodes)
      }else if (mutationRecord.addedNodes.length > 0) {
        if (process.env.NODE_ENV === 'development') {
          console.log('A child node has been added.');
        }
        mount(mutationRecord.addedNodes)
      }
    }


  });

  observer.observe(target, config);
  // observer.disconnect(parent, config);

}
/**
 * 挂载实例
 */
function mount(nodeList) {
  if (!unMountQueue.length) return
  loop(nodeList, function (vm, i) {
    const fn = vm.componentDidMount
    fn && fn()
  }, unMountQueue)
}


/**
 * 卸载实例
 */
function unMount(nodeList) {
  loop(nodeList, function (vm, i) {
    const fn = vm.componentWillUnmount
    fn && fn()
  }, vmQueue, true)
}

function loop(nodeList, callback, vmQueue, isUnmount) {
  if (!nodeList || nodeList.length === 0) return
  nodeList.forEach(node => {
    // 找到对应vm实例，执行willUnmount方法
    const vmId = node.getAttribute('data-vm-el')
    if (vmId) {
      for (let i = 0, len = vmQueue.length; i < len; i++) {
        const vm = vmQueue[i]
        if (vm._id === vmId) {
          callback(vm, i)
          vmQueue.splice(i, 1)
          if (process.env.NODE_ENV === 'development') {
            console.log(vm._name+ (isUnmount ?'已卸载': '已挂载' ));
          }
          break
        }
      }
    }
    // 卸载包含的子vm
    loop(node.querySelectorAll('[data-vm-el]'), callback, vmQueue)
  })
}