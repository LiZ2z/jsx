module.exports = function(file) {
  file = file.replace(/React/ig, 'U').replace(/__source(.*\n\r*){5}/g,'').replace(/var.*jsx"/g, '')
  // console.log(file)
  return file
}