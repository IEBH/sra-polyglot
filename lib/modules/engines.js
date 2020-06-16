'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pubmed = require('./engines/pubmed.js');

var _pubmed2 = _interopRequireDefault(_pubmed);

var _ovid = require('./engines/ovid.js');

var _ovid2 = _interopRequireDefault(_ovid);

var _cochrane = require('./engines/cochrane.js');

var _cochrane2 = _interopRequireDefault(_cochrane);

var _embase = require('./engines/embase.js');

var _embase2 = _interopRequireDefault(_embase);

var _wos = require('./engines/wos.js');

var _wos2 = _interopRequireDefault(_wos);

var _cinahl = require('./engines/cinahl.js');

var _cinahl2 = _interopRequireDefault(_cinahl);

var _psycinfo = require('./engines/psycinfo.js');

var _psycinfo2 = _interopRequireDefault(_psycinfo);

var _scopus = require('./engines/scopus.js');

var _scopus2 = _interopRequireDefault(_scopus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
exports.default = {
    // PubMed {{{
    pubmed: _pubmed2.default,
    // }}}

    // Ovid Medline {{{
    ovid: _ovid2.default,
    // }}}

    // Cochrane Library {{{
    cochrane: _cochrane2.default,
    // }}}

    // Embase {{{
    embase: _embase2.default,
    // }}}

    // Web of Science {{{
    wos: _wos2.default,
    // }}}

    // CINAHL {{{
    cinahl: _cinahl2.default,
    // }}}

    // PsycInfo {{{
    psycinfo: _psycinfo2.default,
    // }}}

    // Scopus {{{
    scopus: _scopus2.default,
    // }}} 

    // Lexical tree (JSON) {{{
    lexicalTreeJSON: {
        id: 'lexicalTreeJSON',
        title: 'Lexical Tree (JSON)',
        aliases: ['debug'],
        debugging: true, // Mark this module for debugging only

        /**
        * Compile a tree structure to JSON output
        * @param {array} tree The parsed tree to process
        * @param {Object} [options] Optional options to use when compiling
        * @return {string} The compiled output
        */
        compile: function compile(tree, options) {
            return tree;
        }
    }
    // }}}

    // MongoDB {{{
    // mongodb: mongodbImport,
    // }}}
};