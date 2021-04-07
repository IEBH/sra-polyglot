"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pubmed = _interopRequireDefault(require("./engines/pubmed.js"));

var _ovid = _interopRequireDefault(require("./engines/ovid.js"));

var _cochrane = _interopRequireDefault(require("./engines/cochrane.js"));

var _embase = _interopRequireDefault(require("./engines/embase.js"));

var _wos = _interopRequireDefault(require("./engines/wos.js"));

var _cinahl = _interopRequireDefault(require("./engines/cinahl.js"));

var _psycinfo = _interopRequireDefault(require("./engines/psycinfo.js"));

var _scopus = _interopRequireDefault(require("./engines/scopus.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import mongodbImport from './engines/mongodb.js'

/**
* Collection of supported engines
* Each engine should specify:
*	title - Human readable name of the engine
*	aliases - Alternative names for each engine
*	compile() - function that takes a parsed tree array and returns a string (string can contain HTML markup of the form <span class="black-underline" v-tooltip="message"> content </span>)
*	open() - optional function that takes a query and provides the direct searching method
*	debugging - optional boolean specifying that the engine is for debugging purposes only
*
* @var {array}
*/
var _default = {
  // PubMed {{{
  pubmed: _pubmed.default,
  // }}}
  // Ovid Medline {{{
  medlineOvid: _objectSpread2(_objectSpread2({}, _ovid.default), {}, {
    title: "Medline (via Ovid)",
    id: "medlineOvid"
  }),
  // }}}
  // Ovid Embase {{{
  embaseOvid: _objectSpread2(_objectSpread2({}, _ovid.default), {}, {
    title: "Embase (via Ovid)",
    id: "embaseOvid"
  }),
  // }}}
  // Embase {{{
  embase: _embase.default,
  // }}}
  // Cochrane Library {{{
  cochrane: _cochrane.default,
  // }}}
  // Web of Science {{{
  wos: _wos.default,
  // }}}
  // CINAHL {{{
  cinahl: _cinahl.default,
  // }}}
  // PsycInfo {{{
  psycinfo: _psycinfo.default,
  // }}}
  // Scopus {{{
  scopus: _scopus.default,
  // }}} 
  // Lexical tree (JSON) {{{
  lexicalTreeJSON: {
    id: 'lexicalTreeJSON',
    title: 'Lexical Tree (JSON)',
    aliases: ['debug'],
    debugging: true,
    // Mark this module for debugging only

    /**
    * Compile a tree structure to JSON output
    * @param {array} tree The parsed tree to process
    * @param {Object} [options] Optional options to use when compiling
    * @return {string} The compiled output
    */
    compile: function compile(tree, options) {
      return tree;
    }
  } // }}}
  // MongoDB {{{
  // mongodb: mongodbImport,
  // }}}

};
exports.default = _default;