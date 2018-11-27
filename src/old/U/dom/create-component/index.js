
function createComponent (Component, props) {
  var vm = new Component(props) 

  return vm

}

module.exports = createComponent
