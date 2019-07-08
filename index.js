var _ = require('lodash');

var polyglot = module.exports = {
	/**
	* List of example search queries
	* See tests/examples.js for the outputs in each case
	* @var {array}
	*/
	examples: [
		{title: 'Failure of antibiotic prescribing for bacterial infections', query: '"Primary Health Care"[Mesh] OR Primary care OR Primary healthcare OR Family practice OR General practice\n\nAND\n\n"Treatment Failure"[Mesh] OR Treatment failure OR Treatment failures\n\nAND\n\n"Bacterial Infections"[Mesh] OR Bacteria OR Bacterial\n\nAND\n\n"Anti-Bacterial Agents"[Mesh] OR Antibacterial Agents OR Antibacterial Agent OR Antibiotics OR Antibiotic'},
		{title: 'Clinical prediction guides for whiplash', query: '"Neck"[Mesh] OR Neck OR Necks OR "Cervical Vertebrae"[Mesh] OR "Cervical Vertebrae" OR "Neck Muscles"[Mesh] OR "Neck Muscles" OR "Neck Injuries"[Mesh] OR "Whiplash Injuries"[Mesh] OR "Radiculopathy"[Mesh] OR "Neck Injuries" OR "Neck Injury" OR Whiplash OR Radiculopathies OR Radiculopathy\n\n AND\n\n "Pain"[Mesh] OR Pain OR Pains OR Aches OR Ache OR Sore\n\n AND\n\n "Decision Support Techniques"[Mesh] OR "Predictive Value of Tests"[Mesh] OR "Observer Variation"[Mesh] OR Decision Support OR Decision Aids OR Decision Aid OR Decision Analysis OR Decision Modeling OR Decision modelling OR Prediction OR Predictions OR Predictor OR Predicting OR Predicted'},
		{title: 'Prevalence of Thyroid Disease in Australia', query: '"Thyroid Diseases"[Mesh] OR "Thyroid diseases" OR "Thyroid disease" OR "Thyroid disorder" OR "Thyroid disorders" OR Goiter OR Goitre OR Hypothyroidism OR Hyperthyroidism OR Thyroiditis OR "Graves disease" OR Hyperthyroxinemia OR Thyrotoxicosis OR  "Thyroid dysgenesis" OR "Thyroid cancer" OR "Thyroid cancers" OR "Thyroid neoplasm" OR "Thyroid neoplasms" OR "Thyroid nodule" OR "Thyroid nodules" OR "Thyroid tumor" OR "Thyroid tumour" OR "Thyroid tumors" OR "Thyroid tumours" OR "Thyroid cyst" OR "Thyroid cysts" OR "Cancer of the thyroid"\n\n AND\n\n "Prevalence"[Mesh] OR "Epidemiology"[Mesh] OR "Prevalence" OR "Prevalences" OR Epidemiology OR Epidemiological\n\n AND\n\n "Australia"[Mesh] OR Australia OR Australian OR Australasian OR Australasia OR Queensland OR Victoria OR "New South Wales" OR "Northern Territory"'},
		{title: 'Prevalence of incidental thyroid cancer: A systematic review of autopsy studies', query: '(("Thyroid Neoplasms"[Mesh] OR "Adenocarcinoma, Follicular"[Mesh] OR "Adenocarcinoma, Papillary"[Mesh] OR OPTC)) OR (((Thyroid OR Follicular OR Papillary OR hurtle cell)) AND (cancer OR cancers OR carcinoma OR carcinomas OR Adenocarcinoma OR Adenocarcinomas neoplasm OR neoplasms OR nodule OR nodules OR tumor OR tumour OR Tumors OR Tumours OR cyst OR cysts))\n\nAND\n\n"Autopsy"[Mesh] OR "Autopsy" OR "Autopsies" OR Postmortem OR Post-mortem OR (Post AND mortem)\n\nAND\n\n"Prevalence"[Mesh] OR "Epidemiology"[Mesh] OR Prevalence OR Prevalences OR Epidemiology OR Epidemiological OR Frequency\n\nAND\n\n"Incidental Findings"[Mesh] OR Incidental OR Unsuspected OR Discovery OR Discoveries OR Findings OR Finding OR Occult OR Hidden'},
		{title: 'Positioning for acute respiratory distress in hospitalised infants and children', query: '# Lung diseases or other infections\nexp Lung Diseases/ OR exp Bronchial Diseases/ OR exp Respiratory Tract Infections/ OR exp Respiratory Insufficiency/ OR ((respir* or bronch*) adj3 (insuffic* or fail* or distress*)).tw. OR (acute lung injur* or ali).tw. OR (ards or rds).tw. OR (respiratory adj5 infect*).tw. OR (pneumon* or bronchopneumon*).tw. OR (bronchit* or bronchiolit*).tw. OR ((neonatal lung or neonatal respiratory) adj1 (diseas* or injur* or infect* or illness*)).tw. OR hyaline membrane diseas*.tw. OR bronchopulmonary dysplasia.tw. OR (croup or laryngotracheobronchit* or epiglottit* or whooping cough or legionel*).tw. OR (laryng* adj2 infect*).tw. OR (acute adj2 (episode or exacerbation*) adj3 (asthma or bronchiectasis or cystic fibrosis)).tw. OR respiratory syncytial viruses/ OR respiratory syncytial virus, human/ OR Respiratory Syncytial Virus Infections/ OR (respiratory syncytial virus* or rsv).tw.\n\nAND\n\n# Posture\nexp Posture/ OR (postur* or position*).tw. OR (supine or prone or semi-prone).tw. OR ((face or facing) adj5 down*).tw. OR (side adj5 (lay or laying or laid or lays or lying or lies)).tw. OR lateral.tw. OR upright.tw. OR (semi-recumbent or semirecumbent or semi-reclin* or semireclin* or reclin* or recumbent).tw. OR ((high or erect or non-erect or lean* or forward) adj5 (sit or sitting)).tw. OR (body adj3 tilt*).tw. OR (elevat* adj3 head*).tw.\n\nAND\n\n# RCTs\n<RCT Filter>'},
	],

	messages: {
		'NO_SINGLE_WILDCARD': 'There is no single character wildcard equievelent, so an unlimited matching length wildcard has been used instead',
		'NO_OPTIONAL_WILDCARD': 'There is no optional single character wildcard equievelent, so an unlimited matching length wildcard has been used instead',
	},

	variables: {
		no_field_tag: [] // Stores offsets for phrases with no field tags (for replacement)
	},

	/**
	* List of templates
	* Each key is the (case insensitive; specify in lowercase) keyword used in angular brackets
	* Each value is an object containing 'name', 'description', 'debugging' and an engines object with an additional 'default' key
	* @var {Object}
	* @example
	* {rct: {engines: {default: 'foo', ovid: 'bar'}}} // `<rct>` => 'foo' in most databases and 'bar' in Ovid MEDLINE
	*/
	templates: {
		// Meta `<engine>` template will output the current engine (useful for tests)
		'engine': {
			name: 'Engine name',
			debugging: true,
			description: 'The current output engine',
			engines: {
				default: 'unknown',
				cinahl: 'cinahl',
				cochrane: 'cochrane',
				embase: 'embase',
				mongodb: 'mongodb',
				ovid: 'ovid',
				psycinfo: 'psycinfo',
				pubmed: 'pubmed',
				scopus: 'scopus',
				wos: 'wos',
			},
		},
		'rct filter': {
			name: 'RCT Filter',
			description: 'Standard Cochrane RCT Filter',
			engines: {
				cinahl: '(MH "Clinical Trials+") OR (MH "Quantitative Studies") OR TI placebo* OR AB placebo* OR (MH "Placebos") OR (MH "Random Assignment") OR TI random* OR AB random* OR TI ((singl* or doubl* or tripl* or trebl*) W1 (blind* or mask*)) OR AB ((singl* or doubl* or tripl* or trebl*) W1 (blind* or mask*)) OR TI clinic* trial* OR AB clinic* trial* OR PT clinical trial',
				embase: "random* OR factorial OR crossover OR placebo OR blind OR blinded OR assign OR assigned OR allocate OR allocated OR 'crossover procedure'/exp OR 'double-blind procedure'/exp OR 'randomized controlled trial'/exp OR 'single-blind procedure'/exp NOT ('animal'/exp NOT ('animal'/exp AND 'human'/exp))",
				ovid: '((randomized controlled trial or controlled clinical trial).pt. or randomized.ab. or randomised.ab. or placebo.ab. or drug therapy.fs. or randomly.ab. or trial.ab. or groups.ab.) not (exp animals/ not humans.sh.)',
				psycinfo: 'SU.EXACT("Treatment Effectiveness Evaluation") OR SU.EXACT.EXPLODE("Treatment Outcomes") OR SU.EXACT("Placebo") OR SU.EXACT("Followup Studies") OR placebo* OR random* OR "comparative stud*" OR  clinical NEAR/3 trial* OR research NEAR/3 design OR evaluat* NEAR/3 stud* OR prospectiv* NEAR/3 stud* OR (singl* OR doubl* OR trebl* OR tripl*) NEAR/3 (blind* OR mask*)',
				pubmed: 'randomized controlled trial[pt] OR controlled clinical trial[pt] OR randomized[tiab] OR randomised[tiab] OR placebo[tiab] OR "drug therapy"[sh] OR randomly[tiab] OR trial[tiab] OR groups[tiab] NOT (Animals[Mesh] not (Animals[Mesh] and Humans[Mesh]))',
				wos: 'TS=(random* or placebo* or allocat* or crossover* or "cross over" or ((singl* or doubl*) NEAR/1 blind*)) OR TI=(trial)',
			},
		},
		'sr filter': {
			name: 'SR Filter',
			description: 'Standard Cochrane SR Filter',
			engines: {
				cinahl: 'TI Medline AB Medline OR TI Pubmed AB Pubmed OR (TI systematic AB systematic AND TI review AB review) OR TI meta-analysis OR AB meta-analysis',
				embase: 'Medline:ti,ab OR Pubmed:ti,ab OR (systematic:ti,ab AND review:ti,ab) OR meta-analysis:pt OR CDSR:jt',
				ovid: 'search:.tw.OR meta analysis.mp,pt.OR review.pt.OR di.xs. OR associated.tw.',
				pubmed: 'search*[Title/Abstract] OR meta analysis[Publication Type] OR meta analysis[Title/Abstract] OR meta analysis[MeSH] OR review[Publication Type] OR diagnosis[MeSH Subheading] OR associated[Title/Abstract]',
				wos: 'Medline OR Pubmed OR (systematic AND review) OR meta-analysis OR Cochrane',
			},
		},
	},


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
		if (!polyglot.engines[engine]) throw new Error('Engine not found: ' + engine);
		var tree = polyglot.parse(query, options);
		tree = polyglot.preProcess(tree, options);
		if (engine.id == "lexicalTreeJSON") {
			return polyglot.engines[engine].compile(tree, options);
		} else {
			return polyglot.postProcess(polyglot.engines[engine].compile(tree, options), options);
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
		var tree = polyglot.parse(query, options);
		tree = polyglot.preProcess(tree, options);
		_.forEach(polyglot.engines, (engine, id) => {
			if (id == "lexicalTreeJSON") { // Dont run postprocess for lexicalTreeJSON
				output[id] = engine.compile(tree, options), options
			} else {
				output[id] = polyglot.postProcess(engine.compile(tree, options), options)
			}
		});
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


	/**
	* Parse a given string into a lexical object tree
	* This tree can then be recompiled via each engines compile()
	* @param {string} query The query string to compile. This can be multiline
	* @param {Object} [options] Optional options to use when parsing
	* @param {boolean} [options.groupLines=false] Wrap lines inside their own groups (only applies if multiple lines are present)
	* @param {boolean} [options.groupLinesAlways=true] Group lines even if there is only one apparent line (i.e. enclose single line queries within brackets)
	* @param {boolean} [options.transposeLines=true] Insert all line references where needed (e.g. `1 - 3/OR`)
	* @param {boolean} [options.removeNumbering=true] Remove any number prefixes from lines - this is a classic copy/paste error from certain online search engines (e.g. `1. Term` -> `term`)
	* @param {boolean} [options.preserveNewlines=true] Preserve newlines in the output as 'raw' tree nodes
	* @return {array} Array representing the parsed tree nodes
	*/
	parse: (query, options) => {
		var settings = _.defaults(options, {
			groupLines: false,
			groupLinesAlways: false,
			removeNumbering: false,
			preserveNewlines: true,
			transposeLines: true,
		});

		polyglot.no_field_tag = []; // Empty array of offsets each time the query is parsed

		var q = query + ''; // Clone query
		var tree = {nodes: []}; // Tree is the full parsed tree
		var branchStack = [tree]; // Stack for where we are within the tree (will get pushed when a new group is encountered)
		var branch = tree; // Branch is the parent of leaf (branch always equals last element of branchStack)
		var lastGroup; // Optional reference to the previously created group (used to pin things)
		var leaf = branch.nodes; // Leaf is the currently active leaf node (usually branch.nodes)
		var afterWhitespace = true; // Set to true when the current character is following whitespace, a newline or the very start of the query
		var lineRefs = {}; // Object lookup for line references (usually something like `1. Foo`), only populated if `transposeLines` is true

		// Operate in line-by-line mode? {{{
		if (settings.transposeLines || settings.groupLines || settings.removeNumbering) {
			var lines = q.split('\n');

			// Remove numbering {{{
			if (settings.removeNumbering) {
				var match;
				lines = lines.map(line => {
					if (match = /^\s*\d+\.?\s(.*)$/.exec(line)) {
						return match[1];
					} else {
						return line;
					}
				});
			}
			// }}}

			// Group line content {{{
			if (settings.groupLines && (settings.groupLinesAlways || lines.length > 1)) {
				// Wrap lines provided they are not blank and are not just 'and', 'or', 'not' by themselves or a comment
				lines = lines.map(line => _.trim(line) && !/^\s*(and|or|not)\s*$/i.test(line) && !/^\s*#/.test(line) ? '(' + line + ')' : line);
			}
			// }}}

			q = lines.join('\n'); // Join up lines again
		}
		// }}}

		// Utility functions {{{
		/**
		* Trim previous leaf content if it has any text
		* The leaf will be removed completely if it is now blank
		*/
		function trimLastLeaf() {
			if (leaf && _.includes(['phrase', 'raw'], leaf.type) && / $/.test(leaf.content)) {
				leaf.content = leaf.content.substr(0, leaf.content.length - 1);
				if (!leaf.content) branch.nodes.pop();
			}
		};
		/**
		* End the previous line branch and create a new one
		* this function is run every time a new raw node is inserted
		*/
		function newLine(currentNumber) {
			lastGroup = branch;
			branch = branchStack.pop();
			leaf = branch.nodes;
			var newGroup = {type: 'line', number: currentNumber, isNumbered: false, nodes: []};
			branch.nodes.push(newGroup);
			branchStack.push(branch);
			branch = newGroup;
			leaf = branch.nodes;
		};
		// }}}

		// Create a group for the first line
		var newGroup = {type: 'line', number: 1, isNumbered: false, nodes: []};
		branch.nodes.push(newGroup);
		branchStack.push(branch);
		branch = newGroup;
		leaf = branch.nodes;
		var lineNumber = 1;

		// Variable to store whether there is user entered line numbering
		var userLineNumber = false;
		// Variable to store byte offset of string at current point
		var offset = 0;

		while (q.length) {
			var cropString = true; // Whether to remove one charcater from the beginning of the string (set to false if the lexical match handles this behaviour itself)
			var match;

			if (/^\(/.test(q)) {
				var newGroup = {type: 'group', nodes: []};
				branch.nodes.push(newGroup);
				branchStack.push(branch);
				branch = newGroup;
				leaf = branch.nodes;
			} else if (/^\)/.test(q)) {
				lastGroup = branch;
				branch = branchStack.pop();
				leaf = branch.nodes;
			} else if ((settings.transposeLines) && (match = /^([0-9]+)\s*-\s*([0-9]+)(?:\/(AND|OR|NOT))/i.exec(q))) { // 1-7/OR
				branch.nodes.push({
					type: 'ref', 
					ref: _.range(match[1], (match[2]+1)/10), 
					cond: match[3].toUpperCase(),
					nodes: []
				});
				offset += match[0].length;
				q = q.substr(match[0].length);
				cropString = false;
			} else if ((settings.transposeLines) && (match = /^(AND|OR|NOT)(?:\/([0-9]+)\s*-\s*([0-9]+))/i.exec(q))) { // OR/1-7
				branch.nodes.push({
					type: 'ref', 
					ref: _.range(match[2], (match[3]+1)/10), 
					cond: match[1].toUpperCase(),
					nodes: []
				});
				offset += match[0].length;
				q = q.substr(match[0].length);
				cropString = false;
			} else if ((settings.transposeLines) && (match = /^([0-9]+) +(AND|OR|NOT)\s+/i.exec(q))) { // 1 AND ...
				branch.nodes.push({
					type: 'ref', 
					ref: [match[1]],
					cond: '',
					nodes: []
				}); 
				offset += match[1].length;
				q = q.substr(match[1].length); // NOTE we only move by the digits, not the whole expression - so we can still handle the AND/OR correctly
				cropString = false;
			} else if ((settings.transposeLines) && (match = /^(AND|OR|NOT) +([0-9]+)/i.exec(q))) { // AND 2...
				trimLastLeaf();
				switch(match[1].toLowerCase()) {
					case "and":
						branch.nodes.push({type: 'joinAnd'});
						break;
					case "or":
						branch.nodes.push({type: 'joinOr'});
						break;
					case "not":
						branch.nodes.push({type: 'joinNot'});
						break;
				}
				leaf = undefined;
				cropString = false;

				branch.nodes.push({
					type: 'ref', 
					ref: [match[2]],
					cond: '',
					nodes: []
				}); 
				offset += match[0].length; 
				q = q.substr(match[0].length); 
			} else if ((settings.transposeLines) && (match = /^([0-9]+\.?)\s+/i.exec(q))) { // 1 or 1. (Line number)
				lineNumber = parseInt(match[1], 10)
				branch.number = lineNumber
				branch.isNumbered = true
				userLineNumber = true
				offset += match[0].length-1;
				q = q.substr(match[0].length-1);
			} 
			else if (afterWhitespace && (match = /^and\b/i.exec(q))) {
				trimLastLeaf();
				branch.nodes.push({type: 'joinAnd'});
				leaf = undefined;
				offset += match[0].length;
				q = q.substr(match[0].length);
				cropString = false;
			} else if (afterWhitespace && (match = /^or\b/i.exec(q))) {
				trimLastLeaf();
				branch.nodes.push({type: 'joinOr'});
				leaf = undefined;
				offset += match[0].length;
				q = q.substr(match[0].length);
				cropString = false;
			} else if (afterWhitespace && (match = /^not\b/i.exec(q))) {
				trimLastLeaf();
				branch.nodes.push({type: 'joinNot'});
				leaf = undefined;
				offset += match[0].length;
				q = q.substr(match[0].length);
				cropString = false;
			} else if (afterWhitespace && (match = /^(near\/|near|adj|n)(\d+)\b/i.exec(q))) {
				trimLastLeaf();
				branch.nodes.push({type: 'joinNear', proximity: _.toNumber(match[2])});
				leaf = undefined;
				offset += match[0].length;
				q = q.substr(match[0].length);
				cropString = false;
			} else if (match = /^\[(mesh terms|mesh|mh)(:NoExp)?\]/i.exec(q)) { // Mesh term - PubMed syntax
				leaf.type = 'mesh';
				leaf.recurse = ! match[2];
				if (/^["“”].*["“”]$/.test(leaf.content)) leaf.content = leaf.content.substr(1, leaf.content.length - 2); // Remove wrapping '"' characters
				offset += match[0].length;
				q = q.substr(match[0].length);
				cropString = false;
			} else if ((match = /^(exp "(.*?)"\/)\s*/i.exec(q)) || (match = /^(exp (.*?)\/)\s*/i.exec(q))) { // Mesh term - Ovid syntax (exploded)
				branch.nodes.push({type: 'mesh', recurse: true, content: match[2]});
				offset += match[1].length;
				q = q.substr(match[1].length);
				cropString = false;
				afterWhitespace = true;
			} else if (/^\//.test(q) && leaf && leaf.type && leaf.type == 'phrase' && !/-/.test(leaf.content)) { // Mesh term - Ovid syntax (non-exploded)
				leaf.type = 'mesh';
				leaf.recurse = false;
			} else if (match = /^<(.*?)>/.exec(q)) {
				branch.nodes.push({type: 'template', content: match[1].toLowerCase()});
				offset += match[0].length;
				q = q.substr(match[0].length);
				cropString = false;
			} else if (match = /^(\n)+/.exec(q)) {
				if (settings.preserveNewlines) {
					var number_newline = match[0].length
					branch.nodes.push({type: 'raw', content: '\n'.repeat(number_newline)});
					leaf = undefined;
				}
				lineNumber += match[0].length;
				newLine(lineNumber);
				offset += match[0].length;
				q = q.substr(match[0].length);
				cropString = false;
				afterWhitespace = true;
			} else if (match = /^(\r)+/.exec(q)) {
				offset += match[0].length;
				q = q.substr(match[0].length);
				cropString = false;
				afterWhitespace = true;
			} else if (
				(match = /^\.(mp)\. \[mp=.+?\]/i.exec(q)) // term.INITIALS. [JUNK] (special case for Ovid automated output)
				|| (match = /^\.(tw|ti,ab|ab,ti|ti|ab|mp|nm|pt|fs|sh|xm)\.?/i.exec(q)) // term.INITIALS.
				|| (match = /^:(tw|ti,ab|ab,ti|ti|ab|mp|nm|pt|fs|sh|xm)/i.exec(q)) // term:INITIALS
			) { // Field specifier - Ovid syntax
				// Figure out the leaf to use (usually the last one) or the previously used group {{{
				var useLeaf = {};
				if (_.isObject(leaf) && leaf.type == 'phrase') {
					useLeaf = leaf;
				} else if (_.isArray(leaf) && lastGroup) {
					useLeaf = lastGroup;
				}
				// }}}

				switch (match[1].toLowerCase()) {
					case 'ti':
						useLeaf.field = 'title';
						break;
					case 'ab,ti':
					case 'ti,ab':
						useLeaf.field = 'title+abstract';
						break;
					case 'tw':
						useLeaf.field = 'title+abstract+tw';
						break;
					case 'mp':
						useLeaf.field = 'title+abstract+other';
						break;
					case 'ab':
						useLeaf.field = 'abstract';
						break;
					case 'fs':
						useLeaf.field = 'floatingSubheading';
						break;
					case 'sh':
						useLeaf.type = 'mesh';
						useLeaf.recurse = false;
						break;
					case 'nm':
						useLeaf.field = 'substance';
						break;
					case 'pt':
						useLeaf.field = 'publicationType';
						break;
					case 'kf':
						useLeaf.field = 'author';
						break;
					case 'xm':
						useLeaf.type = 'mesh';
						useLeaf.recurse = true;
						break;
				}
				offset += match[0].length;
				q = q.substr(match[0].length);
				cropString = false;
			} else if (match = /^\[(tiab|ti|tw|ab|nm|sh|pt)\]/i.exec(q)) { // Field specifier - PubMed syntax
				// Figure out the leaf to use (usually the last one) or the previously used group {{{
				var useLeaf;
				if (_.isObject(leaf) && leaf.type == 'phrase') {
					useLeaf = leaf;
				} else if (_.isArray(leaf) && lastGroup) {
					useLeaf = lastGroup;
				}
				// }}}

				switch (match[1].toLowerCase()) {
					case 'tiab':
						useLeaf.field = 'title+abstract';
						break;
					case 'tw':
						useLeaf.field = 'title+abstract+other';
						break;
					case 'ti':
						useLeaf.field = 'title';
						break;
					case 'ab':
						useLeaf.field = 'abstract';
						break;
					case 'nm':
						useLeaf.field = 'substance';
						break;
					case 'sh':
						useLeaf.field = 'floatingSubheading';
						break;
					case 'pt':
						useLeaf.field = 'publicationType';
						break;
				}
				offset += match[0].length;
				q = q.substr(match[0].length);
				cropString = false;
			} else if (match = /^#([^\)\n]+)/.exec(q)) {
				trimLastLeaf();
				branch.nodes.push({type: 'comment', content: match[1]});
				leaf = undefined;
				offset += match[0].length;
				q = q.substr(match[0].length);
				cropString = false;
			} 
			else {
				var nextChar = q.substr(0, 1);
				if ((_.isUndefined(leaf) || _.isArray(leaf)) && nextChar != ' ') { // Leaf pointing to array entity - probably not created fallback leaf to append to
					if (/^["“”]$/.test(nextChar) && (match = /^["“”](.*?)["“”]/.exec(q))) { // First character is a speachmark - slurp until we see the next one
						leaf = {type: 'phrase', content: match[1], offset: offset};
						branch.nodes.push(leaf);
						offset += match[0].length;
						q = q.substr(match[0].length);
						cropString = false;
					} else if (match = /^[^\s\W]+/.exec(q)) { // Slurp the phrase until the space or close brackets
						leaf = {type: 'phrase', content: match[0], offset: offset};
						branch.nodes.push(leaf);
						offset += match[0].length;
						q = q.substr(match[0].length);
						cropString = false;
					} else { // All other first chars - just dump into a buffer and let it fill slowly
						leaf = {type: 'phrase', content: nextChar, offset: offset};
						branch.nodes.push(leaf);
					}
				} else if (_.isObject(leaf) && leaf.type == 'phrase') {
					leaf.content += nextChar;
				}

				afterWhitespace = nextChar == ' '; // Is the nextChar whitespace? Then set the flag
			}

			if (cropString) {
				offset += 1; // Increment offset by 1
				q = q.substr(1); // Crop 1 character
			}
		}

		if (settings.transposeLines) {
			polyglot.tools.visit(tree.nodes, ['ref'], (node, path) => {
				var reference;
				var line;
				// Find the matching line
				for (reference in node.ref) {
					for (line in tree.nodes) {
						// If custom numbering is used only use nodes that are numbered by the user
						if (userLineNumber) {
							if (tree.nodes[line].number == node.ref[reference] && tree.nodes[line].isNumbered) {
								// Copy the nodes from that line into the reference nodes
								// TODO/FIXME: Wont work for 1-3/OR, need to push instead but then undefined branch error
								node.nodes.push(Array.from(tree.nodes[line].nodes));
								// Pop the raw node
								node.nodes[reference].pop();
								break;
							}
						} else {
							if (tree.nodes[line].number == node.ref[reference]) {
								// Copy the nodes from that line into the reference nodes
								// TODO/FIXME: Wont work for 1-3/OR, need to push instead but then undefined branch error
								node.nodes.push(Array.from(tree.nodes[line].nodes));
								// Pop the raw node
								node.nodes[reference].pop();
								break;
							}
						}	
					}
				}
			});
		}

		return tree.nodes;
	},

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
	engines: {
		// PubMed {{{
		pubmed: {
			id: 'pubmed',
			title: 'PubMed',
			aliases: ['pubmed', 'p', 'pm', 'pubm'],

			/**
			* Compile a tree structure to PubMed output
			* @param {array} tree The parsed tree to process
			* @param {Object} [options] Optional options to use when compiling
			* @param {boolean} [options.replaceWildcards=true] Whether to replace wildcard characters (usually '?' or '$') within phrase nodes with this engines equivelent
			* @return {string} The compiled output
			*/
			compile: (tree, options) => {
				var settings = _.defaults(options, {
					replaceWildcards: true,
				});

				// Apply wildcard replacements
				if (settings.replaceWildcards) polyglot.tools.replaceContent(tree, ['phrase'], [
					{subject: /\?/g, value: '?'},
					{subject: /\$/g, value: '*'},
					{subject: /#/g, value: '<span msg="NO_SINGLE_WILDCARD">*</span>'},
				]);

				var compileWalker = tree =>
					tree
						.map((branch, branchIndex) => {
							var buffer = '';
							switch (branch.type) {
								case 'line':
									buffer += compileWalker(branch.nodes);
									break;
								case 'group':
									if (branch.field) {
										// If the group has a filter decorate all its children with that field
										// This mutates the tree for the other engine compile functions
										branch.nodes = polyglot.tools.visit(branch.nodes, ['phrase'], b => b.field = branch.field);
										branch.nodes = polyglot.tools.visit(branch.nodes, ['group'], b => b.field = branch.field);
									} 
									buffer += '(' + compileWalker(branch.nodes) + ')';					
									break;
									case 'ref':
										var node;
										for (node in branch.nodes) {
											if (node == 0) {
												buffer += '(' + compileWalker(branch.nodes[node]) + ')';
											} else {
												buffer += ' ' + branch.cond + ' (' + compileWalker(branch.nodes[node]) + ')';
											}	
										}
									break;
								case 'phrase':
									if (branch.field) {
										buffer +=
											polyglot.tools.quotePhrase(branch, 'pubmed', settings.highlighting) +
											(
												(branch.field == 'title') ? settings.highlighting ? '<font color="LightSeaGreen">[ti]</font>' : '[ti]' :
												branch.field == 'abstract' ? settings.highlighting ? polyglot.tools.createTooltip('<font color="LightSeaGreen">[tiab]</font>', 'PubMed cannot search abstract field term independently') : '[tiab]' :
												branch.field == 'title+abstract' ? settings.highlighting ? '<font color="LightSeaGreen">[tiab]</font>' : '[tiab]' :
												branch.field == 'title+abstract+tw' ? settings.highlighting ? '<font color="LightSeaGreen">[tiab]</font>' : '[tiab]' :
												branch.field == 'title+abstract+other' ? settings.highlighting ? '<font color="LightSeaGreen">[tw]</font>' : '[tw]' :
												branch.field == 'floatingSubheading' ? settings.highlighting ? '<font color="LightSeaGreen">[sh]</font>' : '[sh]' :
												branch.field == 'publicationType' ? settings.highlighting ? '<font color="LightSeaGreen">[pt]</font>' : '[pt]' :
												branch.field == 'substance' ? settings.highlighting ? '<font color="LightSeaGreen">[nm]</font>' : '[nm]' :
												'' // Unsupported field suffix for PubMed
											);
									} else {
										// If no field tag exists create popover with ability to replace field tag
										if (polyglot.no_field_tag.indexOf(branch.offset + branch.content.length) === -1) {
											polyglot.no_field_tag.push(branch.offset + branch.content.length);
										}
										if (settings.highlighting) {
											buffer += polyglot.tools.createPopover(polyglot.tools.quotePhrase(branch, 'pubmed', settings.highlighting), branch.offset + branch.content.length);
										} else {
											buffer += polyglot.tools.quotePhrase(branch, 'pubmed', settings.highlighting);
										}
									}
									break;
								case 'joinNear':
								case 'joinAnd':
									buffer += 'AND';
									break;
								case 'joinOr':
									buffer += 'OR';
									break;
								case 'joinNot':
									buffer += 'NOT';
									break;
								case 'mesh':
									if (settings.highlighting) {
										buffer += polyglot.tools.createTooltip('<font color="blue">' + polyglot.tools.quotePhrase(branch, 'pubmed') + '[Mesh' + (branch.recurse ? '' : ':NoExp') + ']</font>', 
																				"Polyglot does not translate subject terms (e.g Emtree to MeSH), this needs to be done manually")
									} else {
										buffer += polyglot.tools.quotePhrase(branch, 'pubmed') + '[Mesh' + (branch.recurse ? '' : ':NoExp') + ']';
									}
									break;
								case 'raw':
									buffer += branch.content;
									break;
								case 'template':
									buffer += polyglot.tools.resolveTemplate(branch.content, 'pubmed');
									break;
								case 'comment':
									// Do nothing
									break;
								default:
									throw new Error('Unsupported object tree type: ' + branch.type);
							}

							return buffer
								// Add spacing provided... its not a raw buffer or the last entity within the structure
								+ (
									branch.type == 'raw' || // Its not a raw node
									branch.type == 'line' || // Its not a line node
									branchIndex == tree.length-1 || // Its not the last item in the sequence
									(branchIndex < tree.length-1 && tree[branchIndex+1] && tree[branchIndex+1].type && tree[branchIndex+1].type == 'raw')
									? '' : ' '
								);
						})
						.join('');
				return compileWalker(tree);
			},
			open: query => ({
				method: 'GET',
				action: 'https://www.ncbi.nlm.nih.gov/pubmed',
				fields: {
					term: query,
				},
			}),
			openTerms: 'any search box',
		},
		// }}}
		// Ovid Medline {{{
		ovid: {
			id: 'ovid',
			title: 'Ovid Medline / Ovid Embase',
			aliases: ['ovid', 'o', 'ov'],

			/**
			* Compile a tree structure to Ovid MEDLINE output
			* @param {array} tree The parsed tree to process
			* @param {Object} [options] Optional options to use when compiling
			* @param {boolean} [options.replaceWildcards=true] Whether to replace wildcard characters (usually '?' or '$') within phrase nodes with this engines equivelent
			* @return {string} The compiled output
			*/
			compile: (tree, options) => {
				var settings = _.defaults(options, {
					replaceWildcards: true,
				});

				// Apply wildcard replacements
				if (settings.replaceWildcards) polyglot.tools.replaceContent(tree, ['phrase'], [
					{subject: /\?/g, value: '?'},
				]);
				
				var compileWalker = (tree, expand = true) =>
					tree
						.map((branch, branchIndex) => {
							var buffer = '';
							switch (branch.type) {
								case 'line':
									buffer += compileWalker(branch.nodes);
									break;
								case 'group':
									if (branch.field) {
										buffer += '(' + compileWalker(branch.nodes, false) + ')' 
										if (expand) {
											buffer +=
											(
												branch.field == 'title' ? settings.highlighting ? '<font color="LightSeaGreen">.ti.</font>' : '.ti.' :
												branch.field == 'abstract' ? settings.highlighting ? '<font color="LightSeaGreen">.ab.</font>' : '.ab.' :
												branch.field == 'title+abstract' ? settings.highlighting ? '<font color="LightSeaGreen">.ti,ab.</font>' : '.ti,ab.' :
												branch.field == 'title+abstract+tw' ? settings.highlighting ? '<font color="LightSeaGreen">.tw.</font>' : '.tw.' :
												branch.field == 'title+abstract+other' ? settings.highlighting ? '<font color="LightSeaGreen">.mp.</font>' : '.mp.' :
												branch.field == 'floatingSubheading' ? settings.highlighting ? '<font color="LightSeaGreen">.fs.</font>' : '.fs.' :
												branch.field == 'publicationType' ? settings.highlighting ? '<font color="LightSeaGreen">.pt.</font>' : '.pt.' :
												branch.field == 'substance' ? settings.highlighting ? '<font color="LightSeaGreen">.nm.</font>' : '.nm.' :
												'' // Unsupported field suffix for Ovid
											);
										}
									} else {
										buffer += '(' + compileWalker(branch.nodes) + ')';
									}
									break;
								case 'ref':
									var node;
									for (node in branch.nodes) {
										if (node == 0) {
											buffer += '(' + compileWalker(branch.nodes[node]) + ')';
										} else {
											buffer += ' ' + branch.cond + ' (' + compileWalker(branch.nodes[node]) + ')';
										}	
									}
									break;
								case 'phrase':
									if (branch.field && expand) {
										buffer +=
											branch.content +
											(
												branch.field == 'title' ? settings.highlighting ? '<font color="LightSeaGreen">.ti.</font>' : '.ti.' :
												branch.field == 'abstract' ? settings.highlighting ? '<font color="LightSeaGreen">.ab.</font>' : '.ab.' :
												branch.field == 'title+abstract' ? settings.highlighting ? '<font color="LightSeaGreen">.ti,ab.</font>' : '.ti,ab.' :
												branch.field == 'title+abstract+tw' ? settings.highlighting ? '<font color="LightSeaGreen">.tw.</font>' : '.tw.' :
												branch.field == 'title+abstract+other' ? settings.highlighting ? '<font color="LightSeaGreen">.mp.</font>' : '.mp.' :
												branch.field == 'floatingSubheading' ? settings.highlighting ? '<font color="LightSeaGreen">.fs.</font>' : '.fs.' :
												branch.field == 'publicationType' ? settings.highlighting ? '<font color="LightSeaGreen">.pt.</font>' : '.pt.' :
												branch.field == 'substance' ? settings.highlighting ? '<font color="LightSeaGreen">.nm.</font>' : '.nm.' :
												'' // Unsupported field suffix for Ovid
											)
									} else {
										if (settings.highlighting) {
											buffer += polyglot.tools.createPopover(branch.content, branch.offset + branch.content.length);
										} else {
											buffer += branch.content;
										}
									}
									break;
								case 'joinAnd':
									buffer += 'AND';
									break;
								case 'joinOr':
									buffer += 'OR';
									break;
								case 'joinNot':
									buffer += 'NOT';
									break;
								case 'joinNear':
									if (settings.highlighting) buffer += '<font color="purple">';
									buffer += 'ADJ' + branch.proximity;
									if (settings.highlighting) buffer += '</font>';
									break;
								case 'mesh':
									if (settings.highlighting) {
										buffer += polyglot.tools.createTooltip('<font color="blue">' + (branch.recurse ? 'exp ' : '') + branch.content + '/</font>',
																				"Polyglot does not translate subject terms (e.g MeSH to Emtree), this needs to be done manually")
									} else {
										buffer += (branch.recurse ? 'exp ' : '') + branch.content + '/';
									}
									break;
								case 'raw':
									buffer += branch.content;
									break;
								case 'template':
									buffer += polyglot.tools.resolveTemplate(branch.content, 'ovid');
									break;
								case 'comment':
									// Do nothing
									break;
								default:
									throw new Error('Unsupported object tree type: ' + branch.type);
							}

							return buffer
								// Add spacing provided... its not a raw buffer or the last entity within the structure
								+ (
									branch.type == 'raw' || // Its not a raw node
									branch.type == 'line' || // Its not a line node
									branchIndex == tree.length-1 || // Its not the last item in the sequence
									(branchIndex < tree.length-1 && tree[branchIndex+1] && tree[branchIndex+1].type && tree[branchIndex+1].type == 'raw')
									? '' : ' '
								);
						})
						.join('');
				return compileWalker(tree);
			},
			open: query => ({
				method: 'POST',
				action: 'http://ovidsp.tx.ovid.com.ezproxy.bond.edu.au/sp-3.17.0a/ovidweb.cgi',
				fields: {
					textBox: query,
				},
			}),
			openTerms: 'any search box',
		},
		// }}}
		// Cochrane Library {{{
		cochrane: {
			id: 'cochrane',
			title: 'Cochrane Library',
			aliases: ['cochrane', 'c', 'cl'],

			/**
			* Compile a tree structure to Cochrane Library output
			* @param {array} tree The parsed tree to process
			* @param {Object} [options] Optional options to use when compiling
			* @param {boolean} [options.replaceWildcards=true] Whether to replace wildcard characters (usually '?' or '$') within phrase nodes with this engines equivelent
			* @return {string} The compiled output
			*/
			compile: (tree, options) => {
				var settings = _.defaults(options, {
					replaceWildcards: true,
				});

				// Apply wildcard replacements
				if (settings.replaceWildcards) polyglot.tools.replaceContent(tree, ['phrase'], [
					{subject: /\?/g, value: '<span msg="NO_OPTIONAL_WILDCARD">?</span>'},
					{subject: /\$/g, value: '<span msg="NO_OPTIONAL_WILDCARD">*</span>'},
					{subject: /#/g, value: '<span msg="NO_SINGLE_WILDCARD">*</span>'},
				]);

				var compileWalker = (tree, expand = true) =>
					tree
						.map((branch, branchIndex) => {
							var buffer = '';
							switch (branch.type) {
								case 'line':
									buffer += compileWalker(branch.nodes);
									break;
								case 'group':
									if (branch.field && branch.field == 'floatingSubheading') {
										if (settings.highlighting) buffer += '<font color="blue">';
										buffer += '[mh /' + polyglot.tools.quotePhrase(branch, 'cochrane') + ']';
										if (settings.highlighting) buffer += '</font>';
									} else if (branch.field) {
										buffer += '(' + compileWalker(branch.nodes, false) + ')' 
										if (expand) {
											buffer +=
											(
												branch.field == 'title' ? settings.highlighting ? '<font color="LightSeaGreen">:ti</font>' : ':ti' :
												branch.field == 'abstract' ? settings.highlighting ? '<font color="LightSeaGreen">:ab</font>' : ':ab' :
												branch.field == 'title+abstract' ? settings.highlighting ? '<font color="LightSeaGreen">:ti,ab</font>' : ':ti,ab' :
												branch.field == 'title+abstract+tw' ? settings.highlighting ? '<font color="LightSeaGreen">:ti,ab</font>' : ':ti,ab' :
												branch.field == 'title+abstract+other' ? settings.highlighting ? '<font color="LightSeaGreen">:ti,ab,kw</font>' : ':ti,ab,kw' :
												branch.field == 'floatingSubheading' ? settings.highlighting ? '<font color="LightSeaGreen">:fs</font>' : ':fs' :
												branch.field == 'publicationType' ? settings.highlighting ? '<font color="LightSeaGreen">:pt</font>' : ':pt' :
												branch.field == 'substance' ? settings.highlighting ? '<font color="LightSeaGreen">:kw</font>' : ':kw' :
												'' // Unsupported field suffix for PubMed
											);
										}
									} else {
										buffer += '(' + compileWalker(branch.nodes) + ')';
									}
									break;
								case 'ref':
									var node;
									for (node in branch.nodes) {
										if (node == 0) {
											buffer += '(' + compileWalker(branch.nodes[node]) + ')';
										} else {
											buffer += ' ' + branch.cond + ' (' + compileWalker(branch.nodes[node]) + ')';
										}	
									}
									break;
								case 'phrase':
									if (branch.field && branch.field == 'floatingSubheading') {
										if (settings.highlighting) buffer += '<font color="blue">';
										buffer += '[mh /' + polyglot.tools.quotePhrase(branch, 'cochrane') + ']';
										if (settings.highlighting) buffer += '</font>';
									} else if (branch.field && expand) {
										buffer +=
											polyglot.tools.quotePhrase(branch, 'cochrane', settings.highlighting) +
											(
												branch.field == 'title' ? settings.highlighting ? '<font color="LightSeaGreen">:ti</font>' : ':ti' :
												branch.field == 'abstract' ? settings.highlighting ? '<font color="LightSeaGreen">:ab</font>' : ':ab' :
												branch.field == 'title+abstract' ? settings.highlighting ? '<font color="LightSeaGreen">:ti,ab</font>' : ':ti,ab' :
												branch.field == 'title+abstract+tw' ? settings.highlighting ? '<font color="LightSeaGreen">:ti,ab</font>' : ':ti,ab' :
												branch.field == 'title+abstract+other' ? settings.highlighting ? '<font color="LightSeaGreen">:ti,ab,kw</font>' : ':ti,ab,kw' :
												branch.field == 'floatingSubheading' ? settings.highlighting ? '<font color="LightSeaGreen">:fs</font>' : ':fs' :
												branch.field == 'publicationType' ? settings.highlighting ? '<font color="LightSeaGreen">:pt</font>' : ':pt' :
												branch.field == 'substance' ? settings.highlighting ? '<font color="LightSeaGreen">:kw</font>' : ':kw' :
												'' // Unsupported field suffix for PubMed
											);
									} else {
										if (settings.highlighting) {
											buffer += polyglot.tools.createPopover(polyglot.tools.quotePhrase(branch, 'cochrane', settings.highlighting), branch.offset + branch.content.length);
										} else {
											buffer += polyglot.tools.quotePhrase(branch, 'cochrane', settings.highlighting);
										}
									}
									break;
								case 'joinAnd':
									buffer += 'AND';
									break;
								case 'joinOr':
									buffer += 'OR';
									break;
								case 'joinNot':
									buffer += 'NOT';
									break;
								case 'joinNear':
									if (settings.highlighting) buffer += '<font color="purple">'
									buffer += 'NEAR/' + branch.proximity;
									if (settings.highlighting) buffer += '</font>'
									break;
								case 'mesh':
									if (settings.highlighting) {
										buffer += polyglot.tools.createTooltip('<font color="blue">' + '[mh ' + (branch.recurse ? '' : '^') + polyglot.tools.quotePhrase(branch, 'cochrane') + ']</font>',
																				"Polyglot does not translate subject terms (e.g Emtree to MeSH), this needs to be done manually")
									} else {
										buffer += '[mh ' + (branch.recurse ? '' : '^') + polyglot.tools.quotePhrase(branch, 'cochrane') + ']';
									}
									break;
								case 'raw':
									buffer += branch.content;
									break;
								case 'template':
									buffer += polyglot.tools.resolveTemplate(branch.content, 'cochrane');
									break;
								case 'comment':
									// Do nothing
									break;
								default:
									throw new Error('Unsupported object tree type: ' + branch.type);
							}

							return buffer
								// Add spacing provided... its not a raw buffer or the last entity within the structure
								+ (
									branch.type == 'raw' || // Its not a raw node
									branch.type == 'line' || // Its not a line node
									branchIndex == tree.length-1 || // Its not the last item in the sequence
									(branchIndex < tree.length-1 && tree[branchIndex+1] && tree[branchIndex+1].type && tree[branchIndex+1].type == 'raw')
									? '' : ' '
								);
						})
						.join('');
				return compileWalker(tree);
			},
			open: query => ({
				method: 'POST',
				action: 'http://onlinelibrary.wiley.com/cochranelibrary/search',
				fields: {
					'submitSearch': 'Go',
					'searchRows[0].searchCriterias[0].fieldRestriction': null,
					'searchRows[0].searchCriterias[0].term': query,
					'searchRows[0].searchOptions.searchProducts': null,
					'searchRows[0].searchOptions.searchStatuses': null,
					'searchRows[0].searchOptions.searchType': 'All',
					'searchRows[0].searchOptions.publicationStartYear': null,
					'searchRows[0].searchOptions.publicationEndYear': null,
					'searchRows[0].searchOptions.disableAutoStemming': null,
					'searchRows[0].searchOptions.reviewGroupIds': null,
					'searchRows[0].searchOptions.onlinePublicationStartYear': null,
					'searchRows[0].searchOptions.onlinePublicationEndYear': null,
					'searchRows[0].searchOptions.onlinePublicationStartMonth': 0,
					'searchRows[0].searchOptions.onlinePublicationEndMonth': 0,
					'searchRows[0].searchOptions.dateType:pubAllYears': null,
					'searchRows[0].searchOptions.onlinePublicationLastNoOfMonths': 0,
					'searchRow.ordinal': 0,
					'hiddenFields.currentPage': 1,
					'hiddenFields.strategySortBy': 'last-modified-date;desc',
					'hiddenFields.showStrategies': 'false',
					'hiddenFields.containerId': null,
					'hiddenFields.etag': null,
					'hiddenFields.originalContainerId': null,
					'hiddenFields.searchFilters.filterByProduct:cochraneReviewsDoi': null,
					'hiddenFields.searchFilters.filterByIssue': 'all',
					'hiddenFields.searchFilters.filterByType': 'All',
					'hiddenFields.searchFilters.displayIssuesAndTypesFilters': 'true',
				}
			}),
			openTerms: 'use search manager box',
		},
		// }}}
		// Embase {{{
		embase: {
			id: 'embase',
			title: 'Embase',
			aliases: ['embase', 'e', 'eb'],

			/**
			* Compile a tree structure to Embase output
			* @param {array} tree The parsed tree to process
			* @param {Object} [options] Optional options to use when compiling
			* @param {boolean} [options.replaceWildcards=true] Whether to replace wildcard characters (usually '?' or '$') within phrase nodes with this engines equivelent
			* @return {string} The compiled output
			*/
			compile: (tree, options) => {
				var settings = _.defaults(options, {
					replaceWildcards: true,
				});

				// Apply wildcard replacements
				if (settings.replaceWildcards) polyglot.tools.replaceContent(tree, ['phrase'], [
					{subject: /\?/g, value: '<span msg="NO_OPTIONAL_WILDCARD">?</span>'},
					{subject: /\$/g, value: '<span msg="NO_OPTIONAL_WILDCARD">*</span>'},
					{subject: /#/g, value: '<span msg="NO_SINGLE_WILDCARD">*</span>'},
				]);

				var compileWalker = (tree, expand = true) =>
					tree
						.map((branch, branchIndex) => {
							var buffer = '';
							switch (branch.type) {
								case 'line':
									buffer += compileWalker(branch.nodes);
									break;
								case 'group':
									if (branch.field) {
										buffer += '(' + compileWalker(branch.nodes, false) + ')' 
										if (expand) {
											buffer +=
											(
												branch.field == 'title' ? settings.highlighting ? '<font color="LightSeaGreen">:ti</font>' : ':ti' :
												branch.field == 'abstract' ? settings.highlighting ? '<font color="LightSeaGreen">:ab</font>' : ':ab' :
												branch.field == 'title+abstract' ? settings.highlighting ? '<font color="LightSeaGreen">:ti,ab</font>' : ':ti,ab' :
												branch.field == 'title+abstract+tw' ? settings.highlighting ? '<font color="LightSeaGreen">:ti,ab</font>' : ':ti,ab' :
												branch.field == 'title+abstract+other' ? settings.highlighting ? '<font color="LightSeaGreen">:ti,ab,de,tn</font>' : ':ti,ab,de,tn' :
												branch.field == 'floatingSubheading' ? settings.highlighting ? '<font color="LightSeaGreen">:lnk</font>' : ':lnk' :
												branch.field == 'publicationType' ? settings.highlighting ? '<font color="LightSeaGreen">:it</font>' : ':it' :
												branch.field == 'substance' ? settings.highlighting ? '<font color="LightSeaGreen">:tn</font>' : ':tn' :
												'' // Unsupported field suffix for EmBase
											);
										}
									} else {
										buffer += '(' + compileWalker(branch.nodes) + ')';
									}
									break;
								case 'ref':
									var node;
									for (node in branch.nodes) {
										if (node == 0) {
											buffer += '(' + compileWalker(branch.nodes[node]) + ')';
										} else {
											buffer += ' ' + branch.cond + ' (' + compileWalker(branch.nodes[node]) + ')';
										}	
									}
									break;
								case 'phrase':
									if (branch.field && expand) {
										buffer +=
											polyglot.tools.quotePhrase(branch, 'embase', settings.highlighting) +
											(
												branch.field == 'title' ? settings.highlighting ? '<font color="LightSeaGreen">:ti</font>' : ':ti' :
												branch.field == 'abstract' ? settings.highlighting ? '<font color="LightSeaGreen">:ab</font>' : ':ab' :
												branch.field == 'title+abstract' ? settings.highlighting ? '<font color="LightSeaGreen">:ti,ab</font>' : ':ti,ab' :
												branch.field == 'title+abstract+tw' ? settings.highlighting ? '<font color="LightSeaGreen">:ti,ab</font>' : ':ti,ab' :
												branch.field == 'title+abstract+other' ? settings.highlighting ? '<font color="LightSeaGreen">:ti,ab,de,tn</font>' : ':ti,ab,de,tn' :
												branch.field == 'floatingSubheading' ? settings.highlighting ? '<font color="LightSeaGreen">:lnk</font>' : ':lnk' :
												branch.field == 'publicationType' ? settings.highlighting ? '<font color="LightSeaGreen">:it</font>' : ':it' :
												branch.field == 'substance' ? settings.highlighting ? '<font color="LightSeaGreen">:tn</font>' : ':tn' :
												'' // Unsupported field suffix for EmBase
											);
									} else {
										if (settings.highlighting) {
											buffer += polyglot.tools.createPopover(polyglot.tools.quotePhrase(branch, 'embase', settings.highlighting), branch.offset + branch.content.length);
										} else {
											buffer += polyglot.tools.quotePhrase(branch, 'embase', settings.highlighting);
										}
									}
									break;
								case 'joinAnd':
									buffer += 'AND';
									break;
								case 'joinOr':
									buffer += 'OR';
									break;
								case 'joinNot':
									buffer += 'NOT';
									break;
								case 'joinNear':
									if (settings.highlighting) buffer += '<font color="purple">';
									buffer += 'NEAR/' + branch.proximity;
									if (settings.highlighting) buffer += '</font>';
									break;
								case 'mesh':
									if (settings.highlighting) {
										buffer += polyglot.tools.createTooltip('<font color="blue">' + "'" + branch.content + "'/" + (branch.recurse ? 'exp' : 'de') + '</font>',
																				"Polyglot does not translate subject terms (e.g MeSH to Emtree), this needs to be done manually")
									} else {
										buffer += "'" + branch.content + "'/" + (branch.recurse ? 'exp' : 'de');
									}
									break;
								case 'raw':
									buffer += branch.content;
									break;
								case 'template':
									buffer += polyglot.tools.resolveTemplate(branch.content, 'embase');
									break;
								case 'comment':
									// Do nothing
									break;
								default:
									throw new Error('Unsupported object tree type: ' + branch.type);
							}

							return buffer
								// Add spacing provided... its not a raw buffer or the last entity within the structure
								+ (
									branch.type == 'raw' || // Its not a raw node
									branch.type == 'line' || // Its not a line node
									branchIndex == tree.length-1 || // Its not the last item in the sequence
									(branchIndex < tree.length-1 && tree[branchIndex+1] && tree[branchIndex+1].type && tree[branchIndex+1].type == 'raw')
									? '' : ' '
								);
						})
						.join('');
				return compileWalker(tree);
			},
			open: query => ({
				method: 'GET',
				action: 'http://www.embase.com.ezproxy.bond.edu.au/search',
				fields: {
					sb: 'y',
					search_query: query.replace(/\n+/g, ' '),
				},
			}),
			openTerms: 'any search box',
		},
		// }}}
		// Web of Science {{{
		wos: {
			id: 'wos',
			title: 'Web of Science',
			aliases: ['webofscience', 'w', 'wos', 'websci'],

			/**
			* Compile a tree structure to Web of Science output
			* @param {array} tree The parsed tree to process
			* @param {Object} [options] Optional options to use when compiling
			* @param {boolean} [options.replaceWildcards=true] Whether to replace wildcard characters (usually '?' or '$') within phrase nodes with this engines equivelent
			* @return {string} The compiled output
			*/
			compile: (tree, options) => {
				var settings = _.defaults(options, {
					replaceWildcards: true,
				});

				// Apply wildcard replacements
				if (settings.replaceWildcards) polyglot.tools.replaceContent(tree, ['phrase'], [
					{subject: /\?/g, value: '$'},
					{subject: /\$/g, value: '*'},
					{subject: /#/g, value: '<span msg="NO_SINGLE_WILDCARD">*</span>'},
				]);

				var compileWalker = tree =>
					tree
						.map((branch, branchIndex) => {
							var buffer = '';
							switch (branch.type) {
								case 'line':
									buffer += compileWalker(branch.nodes);
									break;
								case 'group':
									buffer += '(' + compileWalker(branch.nodes) + ')';
									break;
								case 'ref':
									var node;
									for (node in branch.nodes) {
										if (node == 0) {
											buffer += '(' + compileWalker(branch.nodes[node]) + ')';
										} else {
											buffer += ' ' + branch.cond + ' (' + compileWalker(branch.nodes[node]) + ')';
										}	
									}
									break;
								case 'phrase':
									buffer += polyglot.tools.quotePhrase(branch, 'wos', settings.highlighting);
									break;
								case 'joinAnd':
									buffer += 'AND';
									break;
								case 'joinOr':
									buffer += 'OR';
									break;
								case 'joinNot':
									buffer += 'NOT';
									break;
								case 'joinNear':
									buffer += 'NEAR/' + branch.proximity;
									break;
								case 'mesh':
									if (settings.highlighting) {
										buffer += polyglot.tools.createTooltip(polyglot.tools.quotePhrase(branch, 'wos', settings.highlighting),
																				"Web of Science does not support MeSH terms")
									} else {
										buffer += polyglot.tools.quotePhrase(branch, 'wos');
									}
									break;
								case 'raw':
									buffer += branch.content;
									break;
								case 'template':
									buffer += polyglot.tools.resolveTemplate(branch.content, 'wos');
									break;
								case 'comment':
									// Do nothing
									break;
								default:
									throw new Error('Unsupported object tree type: ' + branch.type);
							}

							return buffer
								// Add spacing provided... its not a raw buffer or the last entity within the structure
								+ (
									branch.type == 'raw' || // Its not a raw node
									branch.type == 'line' || // Its not a line node
									branchIndex == tree.length-1 || // Its not the last item in the sequence
									(branchIndex < tree.length-1 && tree[branchIndex+1] && tree[branchIndex+1].type && tree[branchIndex+1].type == 'raw')
									? '' : ' '
								);
						})
						.join('');
				return compileWalker(tree);
			},
			open: query => ({
				method: 'POST',
				action: 'http://apps.webofknowledge.com.ezproxy.bond.edu.au/UA_GeneralSearch.do',
				fields: {
					fieldCount: '1',
					action: 'search',
					product: 'UA',
					search_mode: 'GeneralSearch',
					SID: 'W15WDD6M2xkKPbfGfGY',
					max_field_count: '25',
					max_field_notice: 'Notice: You cannot add another field.',
					input_invalid_notice: 'Search Error: Please enter a search term.',
					exp_notice: 'Search Error: Patent search term could be found in more than one family (unique patent number required for Expand option) ',
					input_invalid_notice_limits: ' <br/>Note: Fields displayed in scrolling boxes must be combined with at least one other search field.',
					sa_params: "UA||W15WDD6M2xkKPbfGfGY|http://apps.webofknowledge.com.ezproxy.bond.edu.au|'",
					formUpdated: 'true',
					'value(input1)': query,
					'value(select1)': 'TS',
					x: '798',
					y: '311',
					'value(hidInput1)': null,
					limitStatus: 'collapsed',
					ss_lemmatization: 'On',
					ss_spellchecking: 'Suggest',
					SinceLastVisit_UTC: null,
					SinceLastVisit_DATE: null,
					period: 'Range Selection',
					range: 'ALL',
					startYear: '1900',
					endYear: (new Date()).getYear(),
					update_back2search_link_param: 'yes',
					ssStatus: 'display:none',
					ss_showsuggestions: 'ON',
					ss_query_language: 'auto',
					ss_numDefaultGeneralSearchFields: '1',
					rs_sort_by: 'PY.D;LD.D;SO.A;VL.D;PG.A;AU.A',
				},
			}),
			openTerms: 'any search box',
		},
		// }}}
		// CINAHL {{{
		cinahl: {
			id: 'cinahl',
			title: 'CINAHL',
			aliases: ['cinahl', 'ci', 'cnal'],

			/**
			* Compile a tree structure to CINAHL output
			* @param {array} tree The parsed tree to process
			* @param {Object} [options] Optional options to use when compiling
			* @param {boolean} [options.replaceWildcards=true] Whether to replace wildcard characters (usually '?' or '$') within phrase nodes with this engines equivelent
			* @return {string} The compiled output
			*/
			compile: (tree, options) => {
				var settings = _.defaults(options, {
					replaceWildcards: true,
				});

				// Apply wildcard replacements
				if (settings.replaceWildcards) polyglot.tools.replaceContent(tree, ['phrase'], [
					{subject: /#/g, value: '<span msg="NO_SINGLE_WILDCARD">*</span>'},
					{subject: /\?/g, value: '#'},
					{subject: /\$/g, value: '*'},
				]);

				var compileWalker = tree =>
					tree
						.map((branch, branchIndex) => {
							var buffer = '';
							switch (branch.type) {
								case 'line':
									buffer += compileWalker(branch.nodes);
									break;
								case 'group':
									buffer += '(' + compileWalker(branch.nodes) + ')';
									break;
								case 'ref':
									var node;
									for (node in branch.nodes) {
										if (node == 0) {
											buffer += '(' + compileWalker(branch.nodes[node]) + ')';
										} else {
											buffer += ' ' + branch.cond + ' (' + compileWalker(branch.nodes[node]) + ')';
										}	
									}
									break;
								case 'phrase':
									if (branch.field && (branch.field == 'title+abstract' || branch.field == 'title+abstract+tw')) {
										buffer +=
											'TI ' + polyglot.tools.quotePhrase(branch, 'cinahl', settings.highlighting) +
											' OR ' +
											'AB ' + polyglot.tools.quotePhrase(branch, 'cinahl', settings.highlighting);
									} else if (branch.field) {
										buffer += _.trimStart(
											(
												branch.field == 'title' ? 'TI' :
												branch.field == 'abstract' ? 'AB' :
												branch.field == 'floatingSubheading' ? 'MW' :
												branch.field == 'publicationType' ? 'PT' :
												branch.field == 'substance' ? 'MW' :
												''
											)
											+ ' ' + polyglot.tools.quotePhrase(branch, 'cinahl', settings.highlighting)
										);

									} else {
										if (settings.highlighting) {
											buffer += polyglot.tools.createPopover(polyglot.tools.quotePhrase(branch, 'cinahl', settings.highlighting), branch.offset + branch.content.length);
										} else {
											buffer += polyglot.tools.quotePhrase(branch, 'cinahl', settings.highlighting);
										}
									}
									break;
								case 'joinAnd':
									buffer += 'AND';
									break;
								case 'joinOr':
									buffer += 'OR';
									break;
								case 'joinNot':
									buffer += 'NOT';
									break;
								case 'joinNear':
									buffer += 'N' + branch.proximity;
									break;
								case 'mesh':
									if (settings.highlighting) {
										buffer += polyglot.tools.createTooltip('<font color="blue">' + '(MH "' + branch.content + (branch.recurse ? '+' : '') + '")</font>',
																				"Polyglot does not translate subject terms (e.g Emtree to MeSH), this needs to be done manually")
									} else {
										buffer += '(MH "' + branch.content + (branch.recurse ? '+' : '') + '")';
									}
									break;
								case 'raw':
									buffer += branch.content;
									break;
								case 'template':
									buffer += polyglot.tools.resolveTemplate(branch.content, 'cinahl');
									break;
								case 'comment':
									// Do nothing
									break;
								default:
									throw new Error('Unsupported object tree type: ' + branch.type);
							}

							return buffer
								// Add spacing provided... its not a raw buffer or the last entity within the structure
								+ (
									branch.type == 'raw' || // Its not a raw node
									branch.type == 'line' || // Its not a line node
									branchIndex == tree.length-1 || // Its not the last item in the sequence
									(branchIndex < tree.length-1 && tree[branchIndex+1] && tree[branchIndex+1].type && tree[branchIndex+1].type == 'raw')
									? '' : ' '
								);
						})
						.join('');
				return compileWalker(tree);
			},
			open: query => ({
				method: 'POST',
				action: 'http://web.a.ebscohost.com.ezproxy.bond.edu.au/ehost/resultsadvanced',
				fields: {
					bquery: query,
				},
			}),
			openTerms: 'any search box',
		},
		// }}}
		// PsycInfo {{{
		psycinfo: {
			id: 'psycinfo',
			title: 'PsycInfo',
			aliases: ['p', 'pi'],

			/**
			* Compile a tree structure to PsycInfo output
			* @param {array} tree The parsed tree to process
			* @param {Object} [options] Optional options to use when compiling
			* @param {boolean} [options.replaceWildcards=true] Whether to replace wildcard characters (usually '?' or '$') within phrase nodes with this engines equivelent
			* @return {string} The compiled output
			*/
			compile: (tree, options) => {
				var settings = _.defaults(options, {
					replaceWildcards: true,
				});

				// Apply wildcard replacements
				if (settings.replaceWildcards) polyglot.tools.replaceContent(tree, ['phrase'], [
					{subject: /\?/g, value: '?'},
					{subject: /\$/g, value: '*'},
				]);

				var compileWalker = tree =>
					tree
						.map((branch, branchIndex) => {
							var buffer = '';
							switch (branch.type) {
								case 'line':
									buffer += compileWalker(branch.nodes);
									break;
								case 'group':
									buffer += '(' + compileWalker(branch.nodes) + ')';
									break;
								case 'ref':
									var node;
									for (node in branch.nodes) {
										if (node == 0) {
											buffer += '(' + compileWalker(branch.nodes[node]) + ')';
										} else {
											buffer += ' ' + branch.cond + ' (' + compileWalker(branch.nodes[node]) + ')';
										}	
									}
									break;
								case 'phrase':
									if (branch.field) {
										buffer +=
											branch.content +
											(
												branch.field == 'title' ? '.ti' :
												branch.field == 'abstract' ? '.ab' :
												branch.field == 'title+abstract' ? '.ti,ab' :
												branch.field == 'title+abstract+tw' ? '.ti,ab' :
												branch.field == 'title+abstract+other' ? '.mp.' :
												branch.field == 'floatingSubheading' ? '.hw' :
												branch.field == 'publicationType' ? '.pt' :
												branch.field == 'substance' ? '.hw' :
												''
											)
									} else {
										if (settings.highlighting) {
											buffer += polyglot.tools.createPopover(branch.content, branch.offset + branch.content.length);
										} else {
											buffer += branch.content;
										}
									}
									break;
								case 'joinAnd':
									buffer += 'AND';
									break;
								case 'joinOr':
									buffer += 'OR';
									break;
								case 'joinNot':
									buffer += 'NOT';
									break;
								case 'joinNear':
									buffer += 'ADJ' + branch.proximity;
									break;
								case 'mesh':
									if (settings.highlighting) {
										buffer += polyglot.tools.createTooltip(polyglot.tools.quotePhrase(branch, 'psycinfo', settings.highlighting),
																				"PsycInfo does not support MeSH terms")
									} else {
										buffer +=  polyglot.tools.quotePhrase(branch, 'psycinfo');
									}
									break;
								case 'raw':
									buffer += branch.content;
									break;
								case 'template':
									buffer += polyglot.tools.resolveTemplate(branch.content, 'psycinfo');
									break;
								case 'comment':
									// Do nothing
									break;
								default:
									throw new Error('Unsupported object tree type: ' + branch.type);
							}

							return buffer
								// Add spacing provided... its not a raw buffer or the last entity within the structure
								+ (
									branch.type == 'raw' || // Its not a raw node
									branch.type == 'line' || // Its not a line node
									branchIndex == tree.length-1 || // Its not the last item in the sequence
									(branchIndex < tree.length-1 && tree[branchIndex+1] && tree[branchIndex+1].type && tree[branchIndex+1].type == 'raw')
									? '' : ' '
								);
						})
						.join('');
				return compileWalker(tree);
			},
			open: query => ({
				method: 'POST',
				action: 'http://ovidsp.tx.ovid.com.ezproxy.bond.edu.au/sp-3.17.0a/ovidweb.cgi',
				fields: {
					textBox: query,
				},
			}),
			openTerms: 'any search box',
		},
		// }}}
		// Scopus {{{
		scopus: {
			id: 'scopus',
			title: 'Scopus',
			aliases: ['s', 'so'],

			/**
			* Compile a tree structure to Scopus output
			* @param {array} tree The parsed tree to process
			* @param {Object} [options] Optional options to use when compiling
			* @param {boolean} [options.replaceWildcards=true] Whether to replace wildcard characters (usually '?' or '$') within phrase nodes with this engines equivelent
			* @return {string} The compiled output
			*/
			compile: (tree, options) => {
				var settings = _.defaults(options, {
					replaceWildcards: true,
				});

				// Apply wildcard replacements
				if (settings.replaceWildcards) polyglot.tools.replaceContent(tree, ['phrase'], [
					{subject: /\?/g, value: '<span msg="NO_OPTIONAL_WILDCARD">?</span>'},
					{subject: /\$/g, value: '<span msg="NO_OPTIONAL_WILDCARD">*</span>'},
					{subject: /#/g, value: '<span msg="NO_SINGLE_WILDCARD">?</span>'},
				]);

				var compileWalker = tree =>
					tree
						.map((branch, branchIndex) => {
							var buffer = '';
							switch (branch.type) {
								case 'line':
									buffer += compileWalker(branch.nodes);
									break;
								case 'group':
									buffer += '(' + compileWalker(branch.nodes) + ')';
									break;
								case 'ref':
									var node;
									for (node in branch.nodes) {
										if (node == 0) {
											buffer += '(' + compileWalker(branch.nodes[node]) + ')';
										} else {
											buffer += ' ' + branch.cond + ' (' + compileWalker(branch.nodes[node]) + ')';
										}	
									}
									break;
								case 'phrase':
									if (branch.field) {
										buffer += (
											branch.field == 'title' ? 'TITLE("' + branch.content + '")' :
											branch.field == 'abstract' ? 'ABS("' + branch.content + '")' :
											branch.field == 'title+abstract' ? 'TITLE-ABS("' + branch.content + '")' :
											branch.field == 'title+abstract+tw' ? 'TITLE-ABS("' + branch.content + '")' :
											branch.field == 'title+abstract+other' ? 'TITLE-ABS-KEY("' + branch.content + '")' :
											branch.field == 'floatingSubheading' ? 'INDEXTERMS("' + branch.content + '")' :
											branch.field == 'publicationType' ? 'DOCTYPE("' + branch.content + '")' :
											branch.field == 'substance' ? 'CHEM("' + branch.content + '")' :
											'"' + branch.content + '"'
										);
									} else {
										if (settings.highlighting) {
											buffer += polyglot.tools.createPopover('"' + branch.content + '"', branch.offset + branch.content.length);
										} else {
											buffer += '"' + branch.content + '"';										
										}
									}
									break;
								case 'joinAnd':
									buffer += 'AND';
									break;
								case 'joinOr':
									buffer += 'OR';
									break;
								case 'joinNot':
									buffer += 'NOT';
									break;
								case 'joinNear':
									buffer += 'W/' + branch.proximity;
									break;
								case 'mesh':
									if (settings.highlighting) {
										buffer += polyglot.tools.createTooltip('<font color="blue">' + 'INDEXTERMS("' + branch.content + '")</font>',
																				"Polyglot does not translate subject terms (e.g Emtree to MeSH), this needs to be done manually")
									} else {
										buffer += 'INDEXTERMS("' + branch.content + '")';
									}
									break;
								case 'raw':
									buffer += branch.content;
									break;
								case 'template':
									buffer += polyglot.tools.resolveTemplate(branch.content, 'scopus');
									break;
								case 'comment':
									// Do nothing
									break;
								default:
									throw new Error('Unsupported object tree type: ' + branch.type);
							}

							return buffer
								// Add spacing provided... its not a raw buffer or the last entity within the structure
								+ (
									branch.type == 'raw' || // Its not a raw node
									branch.type == 'line' || // Its not a line node
									branchIndex == tree.length-1 || // Its not the last item in the sequence
									(branchIndex < tree.length-1 && tree[branchIndex+1] && tree[branchIndex+1].type && tree[branchIndex+1].type == 'raw')
									? '' : ' '
								);
						})
						.join('');
				return compileWalker(tree);
			},
			open: query => ({
				method: 'POST',
				action: 'http://ovidsp.tx.ovid.com.ezproxy.bond.edu.au/sp-3.17.0a/ovidweb.cgi',
				fields: {
					textBox: query,
				},
			}),
			openTerms: 'use advanced search box',
		},
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
		// mongodb: {
		// 	id: 'mongodb',
		// 	title: 'MongoDB Query Format',
		// 	aliases: ['mongo'],
		// 	debugging: true, // Mark this module for debugging only

		// 	/**
		// 	* Compile a tree structure to a MongoDB query
		// 	* @param {array} tree The parsed tree to process
		// 	* @param {Object} [options] Optional options to use when compiling
		// 	* @return {Object} The compiled MongoDB query output
		// 	*/
		// 	compile: (tree, options) => {
		// 		var settings = _.defaults(options, {
		// 			replaceWildcards: true,
		// 			translatePhraseField: t => ({'title': t}),
		// 			meshField: 'mesh',
		// 			translateTitleAbstract: t => ({$or: [{title: t}, {abstract: t}]}),
		// 		});

		// 		// Apply wildcard replacements
		// 		if (settings.replaceWildcards) polyglot.tools.replaceContent(tree, ['phrase'], [
		// 			{subject: /[\?\$]/g, value: '*'},
		// 		]);

		// 		var compileWalker = tree =>
		// 			_(tree)
		// 				.map((branch, branchIndex) => {
		// 					var buffer = {};
		// 					switch (branch.type) {
		// 						case 'line':
		// 							buffer += compileWalker(branch.nodes);
		// 							break;
		// 						case 'group':
		// 							if (branch.field && branch.field == 'title+abstract') {
		// 								// FIXME: Not yet properly supported
		// 								buffer['TITLE+ABSTRACT'] = compileWalker(branch.nodes);
		// 							} else if (branch.field) {
		// 								buffer[branch.field] = compileWalker(branch.nodes);
		// 							} else {
		// 								buffer = settings.translatePhraseField(compileWalker(branch.nodes));
		// 							}
		// 							break;
		// 						case 'ref':
		// 							var node;
		// 							for (node in branch.nodes) {
		// 								if (node == 0) {
		// 									buffer += '(' + compileWalker(branch.nodes[node]) + ')';
		// 								} else {
		// 									buffer += ' ' + branch.cond + ' (' + compileWalker(branch.nodes[node]) + ')';
		// 								}	
		// 							}
		// 							break;
		// 						case 'phrase':
		// 							if (branch.field && branch.field == 'title+abstract') {
		// 								buffer = settings.translateTitleAbstract(branch.content);
		// 							} else if (branch.field) {
		// 								buffer[branch.field] = branch.content;
		// 							} else {
		// 								buffer = settings.translatePhraseField(branch.content);
		// 							}
		// 							break;
		// 						case 'joinNear':
		// 						case 'joinAnd':
		// 							buffer = {$and: []};
		// 							break;
		// 						case 'joinOr':
		// 							buffer = {$or: []};
		// 							break;
		// 						case 'joinNot':
		// 							buffer = {$not: {}};
		// 							break;
		// 						case 'mesh':
		// 							// FIXME: No ability to recurse
		// 							buffer[settings.meshField] = {$in: [branch.content]};
		// 							break;
		// 						case 'raw':
		// 							// Do nothing
		// 							break;
		// 						case 'template':
		// 							buffer = polyglot.tools.resolveTemplate(branch.content, 'mongodb');
		// 							break;
		// 						case 'comment':
		// 							// Do nothing
		// 							break;
		// 						default:
		// 							throw new Error('Unsupported object tree type: ' + branch.type);
		// 					}

		// 					return buffer;
		// 				})
		// 				// Renest + combine $or/$and conditions {{{
		// 				// NOTE: Highly experimental - causes bugs under some circumstances
		// 				// .thru(tree => polyglot.tools.renestConditions(tree))
		// 				// .thru(tree => polyglot.tools.combineConditions(tree))
		// 				// }}}
		// 				// Remove array structure if there is only one child (i.e. `[{foo: 'foo!'}]` => `{foo: 'foo!'}`) {{{
		// 				.thru(tree => {
		// 					if (_.isArray(tree) && tree.length == 1) tree = tree[0];
		// 					return tree;
		// 				})
		// 				// }}}
		// 				.value();

		// 		return compileWalker(tree);
		// 	},
		// },
		// }}}
	},


	/**
	* Collection of utility functions to apply common behaviour to a compiled tree
	* @var {Object}
	*/
	tools: {
		/**
		* Apply a series of text replacements to every matching node object within a tree
		* This function mutates tree
		* @param {array} tree The tree sturcture to operate on
		* @param {null|array} types Type filter to apply. If falsy all are used
		* @param {array} replacements Array of replacements to apply. Each must be of the form `{subject: STRING|REGEXP, value: STRING|FUNCTION}`
		* @return {array} The input tree element with the replacements applied
		*/
		replaceContent: (tree, types, replacements) => {
			polyglot.tools.visit(tree, types, branch => {
				if (!branch.content) return;
				replacements.forEach(replacement => {
					branch.content = branch.content.replace(replacement.subject, replacement.value);
				});
			});
			return tree;
		},


		/**
		* Visit the given node types within a deeply nested tree and run a function
		* This function may mutate the input tree depending on the actions of the callbacks
		* NOTE: If the return value of the callback is `"DEL"` the node is deleted
		* @param {array} tree The tree sturcture to operate on
		* @param {null|array} types Node filter to apply to (if falsy all are used)
		* @param {function} callback The callback to call with each node. Called as (node, path)
		* @return {array} The input tree
		*/
		visit: (tree, types, callback) => {
			var removals = []; // Stack of removal paths we are performing when done

			var treeWalker = (tree, path) => {
				tree.forEach((branch, branchKey) => {
					var nodePath = path.concat(branchKey);

					// Fire callback if it matches
					if (!types || _.includes(types, branch.type)) {
						var result = callback(branch, nodePath);
						if (result === 'DEL') removals.push(nodePath);
					}

					// Walk down nodes if its a group
					if (branch.type == 'group' || branch.type == 'line') treeWalker(branch.nodes, nodePath.concat(['nodes']));
				});
			};

			treeWalker(tree, []);

			// Crop all items marked as removals
			removals
				.reverse() // Walk in reverse order so we don't screw up arrays
				.forEach(path => {
					var nodeName = path.pop();
					var parent = path.length ? _.get(tree, path) : tree;
					delete parent[nodeName];
				});

			return tree;
		},


		/**
		* Retrieve the contents of a template by its ID
		* NOTE: If the specific engine definition is not found 'default' is used (and it will be pre-parsed via .translate())
		* @param {string} template The template to resolve
		* @param {string} engine The current engine (used to get the correct sub-templating string)
		* @return {string} The resolved template
		*/
		resolveTemplate: (template, engine) => {
			if (!polyglot.templates[template]) return 'UNKNOWN-TEMPLATE:' + template;
			if (polyglot.templates[template].engines[engine]) return polyglot.templates[template].engines[engine];
			if (polyglot.templates[template].engines.default) return polyglot.translate(polyglot.templates[template].engines.default, engine);
			return '';
		},


		/**
		* Determine if a phrase needs to be enclosed within speachmarks and return the result
		* @param {Object} branch Phrase branch to examine
		* @param {string} engine Optional engine ID to examine for other enclose methods
		* @param {boolean} highlighting Optional bool to determine if html color styling is added
		* @return {string} The phrase enclosed as needed
		*/
		quotePhrase: (branch, engine, highlighting = false) => {
			var text = _.trimEnd(branch.content);

			return (
				/\s/.test(text)
				? highlighting? '<font color="DarkBlue">"' + text  + '"</font>' : '"' + text + '"'
				: text
			);
		},


		/**
		* Convert the '$or' / '$and' nodes within a tree into a nested structure
		* This function will also flatten identical branches (i.e. run-on multiple $and / $or into one array)
		* @param {Object} tree The object tree to recombine
		* @returns {Object} The recombined tree
		*/
		renestConditions: tree => {
			if (!_.isArray(tree)) return tree; // Not an array - skip

			// Transform arrays of the form: [X1, $or/$and, X2] => {$or/$and: [X1, X2]}
			return tree.reduce((res, branch, index, arr) => {
				var firstKey = _(branch).keys().first();
				if (firstKey == '$or' || firstKey == '$and') { // Is a combinator
					var expression = {};
					expression[firstKey] = [
						res.pop(), // Right side is the last thing we added to the buffer
						arr.splice(index+1, 1)[0], // Left side is the next thing we're going to look at in the array
					];
					res.push(expression);
				} else { // Unknown - just push to array and carry on processing
					res.push(branch);
				}

				return res;
			}, []);
		},


		/**
		* Combine multiple run-on $and / $or conditional branches into one branch
		* This function is a companion function to renestConditions and should be called directly afterwards if needed
		* @param {Object} tree The tree to traverse
		* @param {Object} [options] Additional options to accept
		* @param {number} [options.depth=10] The maximum depth to traverse before giving up, set to 0 to infinitely recurse
		* @return {Object} The collapsed tree
		* @example
		* {left, joinAnd, right} => {joinAnd: [left, right]}
		* @example
		* {foo, joinOr, bar, joinOr, baz} => {joinOr: [foo, bar, baz]}
		*/
		combineConditions: (tree, options) => {
			var settings = _.defaults(options, {
				depth: 10,
			});

			var collapses = [];
			var traverseTree = (branch, path = []) => { // Recurse into each tree node and make a bottom-up list of nodes we need to collapse
				_.forEach(branch, (v, k) => { // Use _.map if its an array and _.mapValues if we're examining an object
					if (_.isObject(v)) {
						var firstKey = _(branch).keys().first();
						if (path.length > 1 && (firstKey == '$or' || firstKey == '$and')) { // Mark for cleanup later (when we can do a bottom-up traversal)
							var lastKey = _.findLast(collapses, i => i.key == '$and' || i.key == '$or'); // Collapse only identical keys
							if (!lastKey || lastKey.key == firstKey) {
								collapses.push({key: firstKey, path: path});
							}
						}
						if (settings.depth && path.length > settings.depth) return; // Stop recursing after depth has been reached
						traverseTree(v, path.concat([k]));
					}
				});
			};
			traverseTree(tree);

			collapses.forEach(collapse => {
				var parent = _.get(tree, collapse.path.slice(0, -1));
				var child = _.get(tree, collapse.path.concat([collapse.key]));
				if (!child || !parent || !parent.length) return;
				var child2 = parent[1];

				if (child2) child.push(child2);

				// Wrap $or conditions (that have an '$and' parent) in an object {{{
				var lastParent = _(collapse.path).slice(0, -1).findLast(_.isString);
				if (lastParent && lastParent == '$and' && collapse.key == '$or') child = {$or: child};
				// }}}

				_.set(tree, collapse.path.slice(0, -1), child);
			});

			return tree;
		},

		/**
		* Create a tooltip with a specified message
		* @param {string} content Content to append tooltip to
		* @param {string} message Message to contain inside tooltip
		*/
		createTooltip(content, message) {
			return `<span class="black-underline" v-tooltip="'` + message + `'">`
					+ content 
					+ '</span>'
		},

		/**
		* Create a popover with options to replace empty field tags with specified field tag
		* @param {string} content Content to append popover to
		*/
		createPopover(content, offset) {
			return '<v-popover offset="8" placement="right">'
					+ '<span class="blue-underline">' + content + '</span>'
					+ '<template slot="popover">'
					+ '<h3 class="popover-header">Add Field Tag</h3>'
					+ '<input class="tooltip-content" v-model="customField" placeholder="Field tag" />'
					+ '<div class="replace-all">'
					+ '<input type="checkbox" id="checkbox" v-model="replaceAll">'
					+ '<label for="checkbox">Replace All</label>'
					+ '</div>'
					+ '<div class="replace-buttons">'
					+ '<button v-on:click="replaceFields(customField, replaceAll, ' + offset + ')" type="button" class="btn btn-primary">Replace</button>'
					+ '<button v-close-popover type="button" class="btn btn-dark">Close</button>'
					+ '</div>'
					+ '</template>'
					+ '</v-popover>';
		},
	},
};
