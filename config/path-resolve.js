const path = require("path")
module.exports = function(src) {
  return path.join(__dirname, '../', src)
}