
function Component (props) {

  this.props = props || {}  
  this.props.children = []
  
  //
  this._init()

}

Component.prototype = {

  constructor: Component,
  // 做个标记
  isComponent: true,
  _init: function() {
    /**
     * render = { el, children }
     */
    var render = this.render()
    this.children = render.children
    this.el = render.el

  },
  
  render: function() {
    return null
  }

}

module.exports = Component