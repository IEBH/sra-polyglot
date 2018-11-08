/**
* Fix to repoint window.ace.acequire -> window.ace.require
* For some reason Brace insists that its own loader be used rather than the built in ES6 compatible one
* This replaces that loader with one that works without returning undefined
*/
window.ace.acequire = window.ace.require;

export default false;
