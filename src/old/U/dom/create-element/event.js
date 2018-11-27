module.exports = {
  attachEvent: function (type, el, fn, useCapture) {
    // if(!type || !el || !fn) return

    var attachEvent = null
    
    function bindFn(fn) {
      return function (e) {
        e = e || window.e
        if (!e.preventDefault) {
          e.preventDefault = function () {
            this.returnValue = false
          }
        }
        if (!e.stopPropagation) {
          e.stopPropagation = function () {
            this.cancelBubble = true
          }
        }
        if (!e.target) {
          e.target = e.srcElement
        }
        fn.call(this, e)
      }
    }

    if (document.addEventListener) {
      attachEvent = (function (bindFn) {
        return function (type, el, fn, useCapture) {
          el.bindFn = bindFn(fn)
          el.addEventListener(type, el.bindFn, useCapture || false)
        }
      })(bindFn)
    } else if (document.attachEvent) {
      attachEvent = (function (bindFn) {
        return function (type, el, fn) {
          el.bindFn = bindFn(fn)
          el.attachEvent('on' + type, el.bindFn)
        }
      })(bindFn)
    }

    this.attachEvent = attachEvent
    return attachEvent(type, el, fn, useCapture || false)
  }
}