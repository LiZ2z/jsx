
const U = require('./U/index')
const Sub = require('./Sub')

class Sup extends U.Component{
  constructor(props) {
    super(props)
    this.onFn = this.onFn.bind(this)
    this.clickChild = this.clickChild.bind(this)
  }
  onFn() {
    console.log(123)
  }
  clickChild(v) {
    console.log(v,'点击了子元素')
  }
  
  render() {

    return (
      <div className='wrap'>
        <Sub {...this.props} propMsg={'nihao'} two ={'xixi'} onClick={this.clickChild} />
        <h1 onClick={this.onFn} style='cursor: pointer  '>Click</h1>
      </div>
    )
  }
}

module.exports = Sup