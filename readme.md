# U
#### 通过jsx模板语法来编写简易的小应用

一个简易的实现，可以支持通过jsx模板语法来编写简易的小应用，但不具备数据更新功能。最好搭配U-CLI使用

```javascript
import U from 'xiaoguo'
class extends U.Component {
  // 已挂载， 用于注册事件
  componentDidMount(){

  }
  // 已卸载， 用于注销事件
  componentWillUnmount(){

  }
  render(){
    return (
      <div>
      //...
      </div>
    )
  }
}
// or
function(props) {
  return (
      <div>
      //...
      </div>
    )
}
```
