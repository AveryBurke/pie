// create DOMParser variable from xmldom
var DOMImplementation = require('xmldom-qsa').DOMImplementation
// necessary to create a standalone browserify version
module.exports = {
    DOMImplementation: DOMImplementation
}