const Prototype = require('../component/index')

function render(Component, Container) {
  if (process.env.NODE_ENV === 'development') {
    if (typeof Component !== 'function' || ( Component.__proto__ || Object.getPrototypeOf(Component)) !== Prototype) {
      throw new TypeError('render函数第一个参数  '+ Component.name+'  必须是继承于Component的类')
    }
  }
  
  const vm = new Component()

  Container.innerHTML = ''
  Container.appendChild(vm.el)
}

module.exports = render