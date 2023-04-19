// create DOMParser variable from xmldom
var DOMParser = require('xmldom-qsa').DOMParser;
var DOMImplementation = require('xmldom-qsa').DOMImplementation

// necessary to create a standalone browserify version
module.exports = {
    DOMParser: DOMParser,
    DOMImplementation: DOMImplementation
}