import { parse } from './modules/parse.js';
import enginesImport from './modules/engines.js';
import _ from 'lodash';
import generic from './modules/engines/generic.js'
import engineObject from "./data/engineObject.js"

let polyglot;
export default polyglot = {

	/**
	* Translate the given query using the given engine ID
	* This is really just a wrapper for the parse() + engine[ENGINE].compile() pipeline
	* Output will be run via preProcess() + postProcess()
	* @param {string} query The query to translate
	* @param {string} engine The ID of the engine to use
	* @param {Object} options Optional options structure to pass to the engine
	* @return {string} The translated search query
	*/
	translate: (query, engine, options) => {
		if (!engines[engine]) throw new Error('Engine not found: ' + engine);
		var tree = parse(query, options);
		tree = polyglot.preProcess(tree, options);
		if (engine.id == "lexicalTreeJSON") {
			return engines[engine].compile(tree, options);
		} else {
			return polyglot.postProcess(engines[engine].compile(tree, options), options);
		}
	},

	/**
	* Translate the given query using all the supported engines
	* Calling this function instead of individual 'translate()' calls is much more efficient as the tree needs to be compiled only once
	* Output will be run via preProcess() + postProcess()
	* @param {string} query The query to translate
	* @param {Object} options Optional options structure to pass to each engine
	* @return {Object} The translated search query in each case where the engine ID is the key of the object and the value is the translated string
	*/
	translateAll: (query, options) => {
		var output = {};
		var tree = parse(query, options);
		tree = polyglot.preProcess(tree, options);
		_.forEach(engines, (engine, id) => {
			if (id == "lexicalTreeJSON") { // Dont run postprocess for lexicalTreeJSON
				output[id] = engine.compile(tree, options), options
			} else { 
				output[id] = polyglot.postProcess(engine.compile(_.cloneDeep(tree), options), options)
			}
		});
		return output;
	},

	translateAllGeneric: (query, options) => {
		var output = {};
		var tree = parse(query, options);
		const engines = Object.keys(engineObject);
		engines.forEach(engine => {
			output[engine] = polyglot.postProcess(generic.compile(_.cloneDeep(tree), options, engine), options);
		})
		output['lexicalTreeJSON'] = enginesImport.lexicalTreeJSON.compile(tree, options), options
		return output;
	},


	/**
	* Pre-proess the compile tree before it gets handed to each engines compile function
	* @param {Object} tree The tree to compile
	* @param {Object} [options] Additional options - these are provided downstream from the parent 'parse()' function
	* @return {Object} The mutated tree
	* @see parse()
	*/
	preProcess: (tree, options) => {
		var settings = _.defaults(options, {
		});

		// NOTE: THIS FUNCTION IS CURRENTLY ONLY A STUB

		return tree;
	},


	/**
	* Post process the data from an engine
	* This function applies the following behaviours:
	* - If HTML is true all `\n` characters are replaced with `<br/>`
	* - If HTML is false all <span> item wrappers are removed
	* @param {string} text The output from the engine - called from translate() / translateAll()
	* @param {Object} options Options provided during post-processing - these are provided downstream from the parent 'parse()' function
	* @param {boolean} [options.forceString] Force the output to be a string even if the module returns something unusual (e.g. mongodb driver returns an object)
	* @param {boolean} [options.html=true] Provide HTML output
	* @param {boolean} [options.trim=true] Trim all output lines
	* @returns {string} The post processed text
	* @see parse()
	*/
	postProcess: (text, options) => {
		var settings = _.defaults(options, {
			forceString: true,
			html: true,
			highlighting: false,
			trim: false,
			transposeLines: true,
		});

		if (settings.forceString && !_.isString(text)) text = JSON.stringify(text, null, '\t');

		if (settings.highlighting) {
			text = text
				.replace(/\bOR\b/g, '<font color="purple">OR</font>')
				.replace(/\bAND\b/g, '<font color="purple">AND</font>')
				.replace(/\bNOT\b/g, '<font color="purple">NOT</font>')
		}

		if (settings.html) {
			text = text
				.replace(/\n/g, '<br/>')
				.replace(/\t/g, '<span class="tab"></span>')
		} else if (_.isString(text)) { // Flatten HTML - Yes this is a horrible method, but its quick
			for (var i = 0; i < 10; i ++) {
				text = text.replace(/<(.+)(\s.*)>(.*)<\/\1>/g, '$3');
			}
		}

		if (settings.trim) {
			text = text
				.replace(/^\s+/gm, '')
				.replace(/\s+$/gm, '')
		}

		return text;
	},
};
