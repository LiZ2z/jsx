const U = require('./U/index')
import store from './redux/store'

store.subscribe(() => {
      console.log(store.getState())
    })

class Sub extends U.Component {

  constructor(props) {
    super(props)
    console.log(this)
  }
  sendMsg() {
    this.props.onClick('点击了Title')
    store.commit('toggleLogin')
  
  }
  mounted() {
    console.log('sub mounted')
  }
  render() {
    var bool = false
    var arr = [
      "a", 'b', 'c'
    ]
    return (
      <div className={'wrap ' + (bool ? 'true' : 'false')}  >
        <h1 onClick={() => this.sendMsg()}>title</h1>
        <h2>来自父元素的信息: {this.props.propMsg}</h2>
        {
          arr.map(item => {
            return (<p>{item}</p>)
          })
        }
        {
          bool ? <span>真确</span> : <span>xxxx</span>
        }
      </div>
    )
  }
}

module.exports = Sub