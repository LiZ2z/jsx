let id = 0
const AST = {}

export const vmQueue = []
export const unMountQueue = []

// 冒泡
export default class Component {
  constructor(props) {
    // 每个组件有一个单独的id
    this.__mounted = false
    defineProperty(this, '__vmName', '<Component>' +( this.constructor.name|| 'unkown'))
    defineProperty(this, '__vmId', 'u-vm-' + (id++))

    // 挂载props
    this.props = props
    this.componentDidMount && (this.componentDidMount = this.componentDidMount.bind(this))
    this.componentWillUnmount && (this.componentWillUnmount = this.componentWillUnmount.bind(this))

    // 收集所有的vmQueue, 在所有节点被添加被DOM树后，调用hooks函数
    vmQueue.push(this)
    unMountQueue.push(this)

  }
  setState(newState) {

  }

}

function defineProperty(obj, prop, value) {
  Object.defineProperty(obj, prop, {
    value: value,
    configurable: false,
    enumerable: false,
    writable: false
  })
}