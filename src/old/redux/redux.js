const {createStore} = require('redux')

export default class Store{
  constructor(options){
    this.state = options.state
    this.mutations = options.mutations


    this.store = createStore((state = this.state, action) => {
      const obj = {}
      obj[action.type] = action.value
      return Object.assign({}, state, obj)
    })

  }
  commit(fn) {
    const state = this.store.getState()  || this.state
    
    const action = this.mutations[fn].call(this, state)

    this.store.dispatch(action)
  }
  subscribe(callback) {
    return this.store.subscribe(callback)
  }
  getState() {
    return this.store.getState()
  }
 
}