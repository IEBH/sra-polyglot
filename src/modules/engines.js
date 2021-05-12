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
export default {
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