import pubmedImport from './engines/pubmed.js'
import ovidImport from './engines/ovid.js'
import cochraneImport from './engines/cochrane.js'
import embaseImport from './engines/embase.js'
import wosImport from './engines/wos.js'
import cinahlImport from './engines/cinahl.js'
import psycinfoImport from './engines/psycinfo.js'
import scopusImport from './engines/scopus.js'
// import mongodbImport from './engines/mongodb.js'

/**
* Collection of supported engines
* Each engine should specify:
*	title - Human readable name of the engine
*	aliases - Alternative names for each engine
*	compile() - function that takes a parsed tree array and returns a string (string can contain HTML markup of the form <span msg=""></span> where @msg corresponds to an entry in messages
*	open() - optional function that takes a query and provides the direct searching method
*	debugging - optional boolean specifying that the engine is for debugging purposes only
*
* @var {array}
*/
export default {
    // PubMed {{{
    pubmed: pubmedImport,
    // }}}

    // Ovid Medline {{{
    ovid: ovidImport,
    // }}}

    // Cochrane Library {{{
    cochrane: cochraneImport,
    // }}}

    // Embase {{{
    embase: embaseImport,
    // }}}

    // Web of Science {{{
    wos: wosImport,
    // }}}
    
    // CINAHL {{{
    cinahl: cinahlImport,
    // }}}

    // PsycInfo {{{
    psycinfo: psycinfoImport,
    // }}}

    // Scopus {{{
    scopus: scopusImport,
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
        compile: (tree, options) => tree,
    },
    // }}}

    // MongoDB {{{
    // mongodb: mongodbImport,
    // }}}
}