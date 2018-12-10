import {
  vmQueue
} from './component'

/**
 * 创建一个DOM observer, 监听DOM移除事件
 * 如果一个vm的最外层的DOM节点被移除了，这个vm及其子集的vm都可以注销了
 * @param {Element} target 
 */
export default function createObserver(target) {
  if (window.MutationObserver) {
    createMutationObserver(target)
  } else {
    listenMutationEvent()
  }
}

function createMutationObserver(target) {
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
        } else if (mutationRecord.addedNodes.length > 0) {
          if (process.env.NODE_ENV === 'development') {
            console.log('A child node has been added.');
          }
          mount(mutationRecord.addedNodes)
        }
      }


    });

    observer.observe(target, config);
}

function listenMutationEvent() {
   document.addEventListener('DOMNodeInserted', function (e) {
          mount([e.target||e.srcElement])
  })

  document.addEventListener('DOMNodeRemoved', function (e) {  
    unMount([e.target||e.srcElement])
  })
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
        if (vm.__vmId === vmId) {
          callback(vm, i)
          vmQueue.splice(i, 1)
          if (process.env.NODE_ENV === 'development') {
            console.log(vm.__vmName + (isUnmount ? '已卸载' : '已挂载'));
          }
          break
        }
      }
    }
    // 卸载包含的子vm
    loop(node.querySelectorAll('[data-vm-el]'), callback, vmQueue)
  })
}