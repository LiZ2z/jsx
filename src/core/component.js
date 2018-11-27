let id = 0
const AST = {}

export const vmQueue = []
export const unMountQueue = []

// 冒泡
export default class Component {
  constructor(props) {
    // 每个组件有一个单独的id
    this._name = '<Component>'+this.constructor.name
    this._id = 'u-vm-' + (id++)
    this._mounted = false
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