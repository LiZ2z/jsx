/* require('es5-shim')
require('es5-shim/es5-sham') */

const Print = require('./Super')
const U = require('./U/index')


U.render(Print, document.getElementById('root'))
console.log(123)

if(module.hot) {
  module.hot.accept()
}
