'use strict';

angular.module('ngPolyglot', []).service('Polyglot', function () {

	var polyglot;
	return polyglot = {
		/**
  * List of example search queries
  * See tests/examples.js for the outputs in each case
  * @var {array}
  */
		examples: [{ title: 'Failure of antibiotic prescribing for bacterial infections', query: '"Primary Health Care"[Mesh] OR Primary care OR Primary healthcare OR Family practice OR General practice\n\nAND\n\n"Treatment Failure"[Mesh] OR Treatment failure OR Treatment failures\n\nAND\n\n"Bacterial Infections"[Mesh] OR Bacteria OR Bacterial\n\nAND\n\n"Anti-Bacterial Agents"[Mesh] OR Antibacterial Agents OR Antibacterial Agent OR Antibiotics OR Antibiotic' }, { title: 'Clinical prediction guides for whiplash', query: '"Neck"[Mesh] OR Neck OR Necks OR "Cervical Vertebrae"[Mesh] OR "Cervical Vertebrae" OR "Neck Muscles"[Mesh] OR "Neck Muscles" OR "Neck Injuries"[Mesh] OR "Whiplash Injuries"[Mesh] OR "Radiculopathy"[Mesh] OR "Neck Injuries" OR "Neck Injury" OR Whiplash OR Radiculopathies OR Radiculopathy\n\n AND\n\n "Pain"[Mesh] OR Pain OR Pains OR Aches OR Ache OR Sore\n\n AND\n\n "Decision Support Techniques"[Mesh] OR "Predictive Value of Tests"[Mesh] OR "Observer Variation"[Mesh] OR Decision Support OR Decision Aids OR Decision Aid OR Decision Analysis OR Decision Modeling OR Decision modelling OR Prediction OR Predictions OR Predictor OR Predicting OR Predicted' }, { title: 'Prevalence of Thyroid Disease in Australia', query: '"Thyroid Diseases"[Mesh] OR "Thyroid diseases" OR "Thyroid disease" OR "Thyroid disorder" OR "Thyroid disorders" OR Goiter OR Goitre OR Hypothyroidism OR Hyperthyroidism OR Thyroiditis OR "Graves disease" OR Hyperthyroxinemia OR Thyrotoxicosis OR  "Thyroid dysgenesis" OR "Thyroid cancer" OR "Thyroid cancers" OR "Thyroid neoplasm" OR "Thyroid neoplasms" OR "Thyroid nodule" OR "Thyroid nodules" OR "Thyroid tumor" OR "Thyroid tumour" OR "Thyroid tumors" OR "Thyroid tumours" OR "Thyroid cyst" OR "Thyroid cysts" OR "Cancer of the thyroid"\n\n AND\n\n "Prevalence"[Mesh] OR "Epidemiology"[Mesh] OR "Prevalence" OR "Prevalences" OR Epidemiology OR Epidemiological\n\n AND\n\n "Australia"[Mesh] OR Australia OR Australian OR Australasian OR Australasia OR Queensland OR Victoria OR "New South Wales" OR "Northern Territory"' }, { title: 'Prevalence of incidental thyroid cancer: A systematic review of autopsy studies', query: '(("Thyroid Neoplasms"[Mesh] OR "Adenocarcinoma, Follicular"[Mesh] OR "Adenocarcinoma, Papillary"[Mesh] OR OPTC)) OR (((Thyroid OR Follicular OR Papillary OR hurtle cell)) AND (cancer OR cancers OR carcinoma OR carcinomas OR Adenocarcinoma OR Adenocarcinomas neoplasm OR neoplasms OR nodule OR nodules OR tumor OR tumour OR Tumors OR Tumours OR cyst OR cysts))\n\nAND\n\n"Autopsy"[Mesh] OR "Autopsy" OR "Autopsies" OR Postmortem OR Post-mortem OR (Post AND mortem)\n\nAND\n\n"Prevalence"[Mesh] OR "Epidemiology"[Mesh] OR Prevalence OR Prevalences OR Epidemiology OR Epidemiological OR Frequency\n\nAND\n\n"Incidental Findings"[Mesh] OR Incidental OR Unsuspected OR Discovery OR Discoveries OR Findings OR Finding OR Occult OR Hidden' }, { title: 'Positioning for acute respiratory distress in hospitalised infants and children', query: '# Lung diseases or other infections\nexp Lung Diseases/ OR exp Bronchial Diseases/ OR exp Respiratory Tract Infections/ OR exp Respiratory Insufficiency/ OR ((respir* or bronch*) adj3 (insuffic* or fail* or distress*)).tw. OR (acute lung injur* or ali).tw. OR (ards or rds).tw. OR (respiratory adj5 infect*).tw. OR (pneumon* or bronchopneumon*).tw. OR (bronchit* or bronchiolit*).tw. OR ((neonatal lung or neonatal respiratory) adj1 (diseas* or injur* or infect* or illness*)).tw. OR hyaline membrane diseas*.tw. OR bronchopulmonary dysplasia.tw. OR (croup or laryngotracheobronchit* or epiglottit* or whooping cough or legionel*).tw. OR (laryng* adj2 infect*).tw. OR (acute adj2 (episode or exacerbation*) adj3 (asthma or bronchiectasis or cystic fibrosis)).tw. OR respiratory syncytial viruses/ OR respiratory syncytial virus, human/ OR Respiratory Syncytial Virus Infections/ OR (respiratory syncytial virus* or rsv).tw.\n\nAND\n\n# Posture\nexp Posture/ OR (postur* or position*).tw. OR (supine or prone or semi-prone).tw. OR ((face or facing) adj5 down*).tw. OR (side adj5 (lay or laying or laid or lays or lying or lies)).tw. OR lateral.tw. OR upright.tw. OR (semi-recumbent or semirecumbent or semi-reclin* or semireclin* or reclin* or recumbent).tw. OR ((high or erect or non-erect or lean* or forward) adj5 (sit or sitting)).tw. OR (body adj3 tilt*).tw. OR (elevat* adj3 head*).tw.\n\nAND\n\n# RCTs\n<RCT Filter>' }],

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
					ovid: 'ovid',
					psycinfo: 'psycinfo',
					pubmed: 'pubmed',
					scopus: 'scopus',
					wos: 'wos'
				}
			},
			'rct filter': {
				name: 'RCT Filter',
				description: 'Standard Cochrane RCT Filter',
				engines: {
					cinahl: '(MH "Clinical Trials+") OR (MH "Quantitative Studies") OR TI placebo* OR AB placebo* OR (MH "Placebos") OR (MH "Random Assignment") OR TI random* OR AB random* OR TI ((singl* or doubl* or tripl* or trebl*) W1 (blind* or mask*)) OR AB ((singl* or doubl* or tripl* or trebl*) W1 (blind* or mask*)) OR TI clinic* trial* OR AB clinic* trial* OR PT clinical trial',
					embase: "random* OR factorial OR crossover OR placebo OR blind OR blinded OR assign OR assigned OR allocate OR allocated OR 'crossover procedure'/exp OR 'double-blind procedure'/exp OR 'randomized controlled trial'/exp OR 'single-blind procedure'/exp NOT ('animal'/exp NOT ('animal'/exp AND 'human'/exp))",
					ovid: '((randomized controlled trial or controlled clinical trial).pt. or randomized.ab. or randomised.ab. or placebo.ab. or drug therapy.fs. or randomly.ab. or trial.ab. or groups.ab.) not (exp animals/ not humans.sh.)',
					pubmed: 'randomized controlled trial[pt] OR controlled clinical trial[pt] OR randomized[tiab] OR randomised[tiab] OR placebo[tiab] OR "drug therapy"[MeSH] OR randomly[tiab] OR trial[tiab] OR groups[tiab] NOT (Animals[Mesh] not (Animals[Mesh] and Humans[Mesh]))',
					wos: 'TS=(random* or placebo* or allocat* or crossover* or "cross over" or ((singl* or doubl*) NEAR/1 blind*)) OR TI=(trial)'
				}
			},
			'sr filter': {
				name: 'SR Filter',
				description: 'Standard Cochrane SR Filter',
				engines: {
					cinahl: 'TI Medline AB Medline OR TI Pubmed AB Pubmed OR (TI systematic AB systematic AND TI review AB review) OR TI meta-analysis OR AB meta-analysis',
					embase: 'Medline:ti,ab OR Pubmed:ti,ab OR (systematic:ti,ab AND review:ti,ab) OR meta-analysis:pt OR CDSR:jt',
					ovid: 'Medline.tw. OR Pubmed.tw. OR (systematic.tw. AND review.tw.) OR meta-analysis.pt. OR CDSR.jn.',
					pubmed: 'Medline[tiab] OR Pubmed[tiab] OR (systematic[tiab] AND review[tiab]) OR meta-analysis[ptyp] OR CDSR[so]',
					wos: 'Medline OR Pubmed OR (systematic AND review) OR meta-analysis OR Cochrane'
				}
			}
		},

		/**
  * Translate the given query using the given engine ID
  * This is really just a wrapper for the parse() + engine[ENGINE].compile() pipeline
  * @param {string} query The query to translate
  * @param {string} engine The ID of the engine to use
  * @param {Object} options Optional options structure to pass to the engine
  * @return {string} The translated search query
  */
		translate: function translate(query, engine, options) {
			if (!this.engines[engine]) throw new Error('Engine not found: ' + engine);
			var tree = this.parse(query, options);
			return this.engines[engine].compile(tree, options);
		},

		/**
  * Translate the given query using all the supported engines
  * @param {string} query The query to translate
  * @param {Object} options Optional options structure to pass to each engine
  * @return {Object} The translated search query in each case where the engine ID is the key of the object and the value is the translated string
  */
		translateAll: function translateAll(query, options) {
			var output = {};
			var tree = this.parse(query, options);
			_.forEach(this.engines, function (engine, id) {
				return output[id] = engine.compile(tree, options);
			});
			return output;
		},

		/**
  * Parse a given string into a lexical object tree
  * This tree can then be recompiled via each engines compile()
  * @param {string} query The query string to compile. This can be multiline
  * @param {Object} [options] Optional options to use when parsing
  * @param {boolean} [options.groupLines=true] Wrap lines inside their own groups (only applies if multiple lines are present)
  * @param {boolean} [options.groupLinesAlways=true] Group lines even if there is only one apparent line (i.e. enclose single line queries within brackets)
  * @param {boolean} [options.preserveNewlines=true] Preserve newlines in the output as 'raw' tree nodes
  * @return {array} Array representing the parsed tree nodes
  */
		parse: function parse(query, options) {
			var settings = _.defaults(options, {
				groupLines: true,
				groupLinesAlways: false,
				preserveNewlines: true
			});

			var q = query + ''; // Clone query
			var tree = { nodes: [] }; // Tree is the full parsed tree
			var branchStack = [tree]; // Stack for where we are within the tree (will get pushed when a new group is encountered)
			var branch = tree; // Branch is the parent of leaf (branch always equals last element of branchStack)
			var lastGroup; // Optional reference to the previously created group (used to pin things)
			var leaf = branch.nodes; // Leaf is the currently active leaf node (usually branch.nodes)
			var afterWhitespace = true; // Set to true when the current character is following whitespace, a newline or the very start of the query

			if (settings.groupLines) {
				var lines = q.split('\n');
				if (settings.groupLinesAlways || lines.length > 1) {
					q = lines
					// Wrap lines provided they are not blank and are not just 'and', 'or', 'not' by themselves or a comment
					.map(function (line) {
						return _.trim(line) && !/^\s*(and|or|not)\s*$/i.test(line) && !/^\s*#/.test(line) ? '(' + line + ')' : line;
					}).join('\n');
				}
			}

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
			// }}}

			while (q.length) {
				var cropString = true; // Whether to remove one charcater from the beginning of the string (set to false if the lexical match handles this behaviour itself)
				var match;

				if (/^\(/.test(q)) {
					var newGroup = { type: 'group', nodes: [] };
					branch.nodes.push(newGroup);
					branchStack.push(branch);
					branch = newGroup;
					leaf = branch.nodes;
				} else if (/^\)/.test(q)) {
					lastGroup = branch;
					branch = branchStack.pop();
					leaf = branch.nodes;
				} else if (afterWhitespace && (match = /^and/i.exec(q))) {
					trimLastLeaf();
					branch.nodes.push({ type: 'joinAnd' });
					leaf = undefined;
					q = q.substr(match[0].length);
					cropString = false;
				} else if (afterWhitespace && (match = /^or/i.exec(q))) {
					trimLastLeaf();
					branch.nodes.push({ type: 'joinOr' });
					leaf = undefined;
					q = q.substr(match[0].length);
					cropString = false;
				} else if (afterWhitespace && (match = /^not/i.exec(q))) {
					trimLastLeaf();
					branch.nodes.push({ type: 'joinNot' });
					leaf = undefined;
					q = q.substr(match[0].length);
					cropString = false;
				} else if (afterWhitespace && (match = /^(near\/|near|adj|n)([0-9]+)/i.exec(q))) {
					trimLastLeaf();
					branch.nodes.push({ type: 'joinNear', proximity: _.toNumber(match[2]) });
					leaf = undefined;
					q = q.substr(match[0].length);
					cropString = false;
				} else if (match = /^\[mesh(:NoExp)?\]/i.exec(q)) {
					// Mesh term - PubMed syntax
					leaf.type = 'mesh';
					leaf.recurse = !match[1];
					if (/^["“”].*["“”]$/.test(leaf.content)) leaf.content = leaf.content.substr(1, leaf.content.length - 2); // Remove wrapping '"' characters
					q = q.substr(match[0].length);
					cropString = false;
				} else if (!afterWhitespace && /^\//.test(q) && leaf.type == 'phrase' && /^exp /i.test(leaf.content)) {
					// Mesh term - Ovid syntax (exploded)
					leaf.type = 'mesh';
					leaf.recurse = true;
					leaf.content = leaf.content.substr(4); // Remove 'exp ' prefix
				} else if (/^\//.test(q) && leaf.type == 'phrase') {
					// Mesh term - Ovid syntax (non-exploded)
					leaf.type = 'mesh';
					leaf.recurse = false;
				} else if (match = /^<(.*?)>/.exec(q)) {
					branch.nodes.push({ type: 'template', content: match[1].toLowerCase() });
					q = q.substr(match[0].length);
					cropString = false;
				} else if (match = /^(\n+)/.exec(q)) {
					if (settings.preserveNewlines) {
						branch.nodes.push({ type: 'raw', content: match[0] });
						leaf = undefined;
					}
					q = q.substr(match[0].length);
					cropString = false;
					afterWhitespace = true;
				} else if ((match = /^\.(tw|ti|ab|pt|fs|sh|xm)\./i.exec(q)) || (match = /^:(tw|ti,ab|ti|ab|pt|fs|sh|xm)/i.exec(q))) {
					// Field specifier - Ovid syntax
					// Figure out the leaf to use (usually the last one) or the previously used group {{{
					var useLeaf;
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
						case 'ti,ab':
						case 'tw':
							useLeaf.field = 'title+abstract';
							break;
						case 'ab':
							useLeaf.field = 'abstract';
							break;
						case 'pt':
							useLeaf.field = 'practiceGuideline';
							break;
						case 'fs':
							useLeaf.field = 'floatingSubheading';
							break;
						case 'sh':
							useLeaf.type = 'mesh';
							useLeaf.recurse = false;
							break;
						case 'xm':
							useLeaf.type = 'mesh';
							useLeaf.recurse = true;
							break;
					}
					q = q.substr(match[0].length);
					cropString = false;
				} else if (match = /^\[(tiab|ti|ab)\]/i.exec(q)) {
					// Field specifier - PubMed syntax
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
						case 'ti':
							useLeaf.field = 'title';
							break;
						case 'ab':
							useLeaf.field = 'abstract';
							break;
					}
					q = q.substr(match[0].length);
					cropString = false;
				} else if (match = /^#(.*?)[)\n]/.exec(q)) {
					trimLastLeaf();
					branch.nodes.push({ type: 'comment', content: _.trim(match[1]) });
					leaf = undefined;
					q = q.substr(match[0].length);
					cropString = false;
				} else {
					var nextChar = q.substr(0, 1);
					if ((_.isUndefined(leaf) || _.isArray(leaf)) && nextChar != ' ') {
						// Leaf pointing to array entity - probably not created fallback leaf to append to
						if (/^["“”]$/.test(nextChar) && (match = /^["“”](.*?)["“”]/.exec(q))) {
							// First character is a speachmark - slurp until we see the next one
							leaf = { type: 'phrase', content: match[1] };
							branch.nodes.push(leaf);
							q = q.substr(match[0].length);
							cropString = false;
						} else {
							// All other first chars - just dump into a buffer and let it fill slowly
							leaf = { type: 'phrase', content: nextChar };
							branch.nodes.push(leaf);
						}
					} else if (_.isObject(leaf) && leaf.type == 'phrase') {
						leaf.content += nextChar;
					}
					afterWhitespace = !afterWhitespace && nextChar == ' ';
				}

				if (cropString) q = q.substr(1); // Crop 1 character
			}

			return tree.nodes;
		},

		/**
  * Collection of supported engines
  * Each engine should specify:
  *	title - Human readable name of the engine
  *	aliases - Alternative names for each engine
  *	compile() - function that takes a parsed tree array and returns a string
  *	open() - optional function that takes a query and provides the direct searching method
  *	debugging - optional boolean specifying that the engine is for debugging purposes only
  *
  * @var {array}
  */
		engines: {
			// PubMed {{{
			pubmed: {
				title: 'PubMed',
				aliases: ['pubmed', 'p', 'pm', 'pubm'],

				/**
    * Compile a tree structure to PubMed output
    * @param {array} tree The parsed tree to process
    * @param {Object} [options] Optional options to use when compiling
    * @param {boolean} [options.replaceWildcards=true] Whether to replace wildcard characters (usually '?' or '$') within phrase nodes with this engines equivelent
    * @return {string} The compiled output
    */
				compile: function compile(tree, options) {
					var settings = _.defaults(options, {
						replaceWildcards: true
					});

					// Apply wildcard replacements
					if (settings.replaceWildcards) polyglot.tools.replaceContent(tree, ['phrase'], [{ subject: /[\?\$]/g, value: '*' }]);

					var compileWalker = function compileWalker(tree) {
						return tree.map(function (branch, branchIndex) {
							var buffer = '';
							switch (branch.type) {
								case 'group':
									if (branch.field) {
										buffer += '(' + compileWalker(branch.nodes) + ')' + (branch.field == 'title' ? '[ti]' : branch.field == 'abstract' ? '[ab]' : branch.field == 'title+abstract' ? '[tiab]' : '' // Unsupported field suffix for PubMed
										);
									} else {
										buffer += '(' + compileWalker(branch.nodes) + ')';
									}
									break;
								case 'phrase':
									if (branch.field) {
										buffer += (/\s/.test(branch.content) ? '"' + branch.content + '"' : branch.content) + (branch.field == 'title' ? '[ti]' : branch.field == 'abstract' ? '[ab]' : branch.field == 'title+abstract' ? '[tiab]' : '' // Unsupported field suffix for PubMed
										);
									} else {
										buffer += /\s/.test(branch.content) ? '"' + branch.content + '"' : branch.content;
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
									buffer += (/\s/.test(branch.content) ? '"' + branch.content + '"' : branch.content) + '[Mesh' + (branch.recurse ? '' : ':NoExp') + ']';
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
							+ (branch.type == 'raw' || // Its not a raw node
							branchIndex == tree.length - 1 || // or the last item in the sequence
							branchIndex < tree.length - 1 && tree[branchIndex + 1].type == 'raw' || branchIndex > 0 && tree[branchIndex - 1].type == 'raw' // or the next item is a raw node
							? '' : ' ');
						}).join('');
					};
					return compileWalker(tree);
				},
				open: function open(query) {
					return {
						method: 'GET',
						action: 'https://www.ncbi.nlm.nih.gov/pubmed',
						fields: {
							term: query
						}
					};
				}
			},
			// }}}
			// Ovid Medline {{{
			ovid: {
				title: 'Ovid Medline',
				aliases: ['ovid', 'o', 'ov'],

				/**
    * Compile a tree structure to Ovid MEDLINE output
    * @param {array} tree The parsed tree to process
    * @param {Object} [options] Optional options to use when compiling
    * @param {boolean} [options.replaceWildcards=true] Whether to replace wildcard characters (usually '?' or '$') within phrase nodes with this engines equivelent
    * @return {string} The compiled output
    */
				compile: function compile(tree, options) {
					var settings = _.defaults(options, {
						replaceWildcards: true
					});

					// Apply wildcard replacements
					if (settings.replaceWildcards) polyglot.tools.replaceContent(tree, ['phrase'], [{ subject: /[\?\$]/g, value: '$' }]);

					var compileWalker = function compileWalker(tree) {
						return tree.map(function (branch, branchIndex) {
							var buffer = '';
							switch (branch.type) {
								case 'group':
									if (branch.field) {
										buffer += '(' + compileWalker(branch.nodes) + ')' + (branch.field == 'title' ? ':ti' : branch.field == 'abstract' ? ':ab' : branch.field == 'title+abstract' ? ':ti,ab' : '' // Unsupported field suffix for PubMed
										);
									} else {
										buffer += '(' + compileWalker(branch.nodes) + ')';
									}
									break;
								case 'phrase':
									if (branch.field) {
										buffer += branch.content + (branch.field == 'title' ? ':ti' : branch.field == 'abstract' ? ':ab' : branch.field == 'title+abstract' ? ':ti,ab' : '' // Unsupported field suffix for PubMed
										);
									} else {
										buffer += branch.content;
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
									buffer += (branch.recurse ? 'exp ' : '') + branch.content + '/';
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
							+ (branch.type == 'raw' || // Its not a raw node
							branchIndex == tree.length - 1 || // or the last item in the sequence
							branchIndex < tree.length - 1 && tree[branchIndex + 1].type == 'raw' || branchIndex > 0 && tree[branchIndex - 1].type == 'raw' // or the next item is a raw node
							? '' : ' ');
						}).join('');
					};
					return compileWalker(tree);
				},
				open: function open(query) {
					return {
						method: 'POST',
						action: 'http://ovidsp.tx.ovid.com.ezproxy.bond.edu.au/sp-3.17.0a/ovidweb.cgi',
						fields: {
							textBox: query
						}
					};
				}
			},
			// }}}
			// Cochrane CENTRAL {{{
			cochrane: {
				title: 'Cochrane CENTRAL',
				aliases: ['cochrane', 'c'],

				/**
    * Compile a tree structure to Cochrane CENTRAL output
    * @param {array} tree The parsed tree to process
    * @param {Object} [options] Optional options to use when compiling
    * @param {boolean} [options.replaceWildcards=true] Whether to replace wildcard characters (usually '?' or '$') within phrase nodes with this engines equivelent
    * @return {string} The compiled output
    */
				compile: function compile(tree, options) {
					var settings = _.defaults(options, {
						replaceWildcards: true
					});

					// Apply wildcard replacements
					if (settings.replaceWildcards) polyglot.tools.replaceContent(tree, ['phrase'], [{ subject: /[\?\$]/g, value: '?' }]);

					var compileWalker = function compileWalker(tree) {
						return tree.map(function (branch, branchIndex) {
							var buffer = '';
							switch (branch.type) {
								case 'group':
									if (branch.field) {
										buffer += '(' + compileWalker(branch.nodes) + ')' + (branch.field == 'title' ? ':ti' : branch.field == 'abstract' ? ':ab' : branch.field == 'title+abstract' ? ':ti,ab' : '' // Unsupported field suffix for PubMed
										);
									} else {
										buffer += '(' + compileWalker(branch.nodes) + ')';
									}
									break;
								case 'phrase':
									if (branch.field) {
										buffer += (/\s/.test(branch.content) ? '"' + branch.content + '"' : branch.content) + (branch.field == 'title' ? ':ti' : branch.field == 'abstract' ? ':ab' : branch.field == 'title+abstract' ? ':ti,ab' : '' // Unsupported field suffix for PubMed
										);
									} else {
										buffer += /\s/.test(branch.content) ? '"' + branch.content + '"' : branch.content;
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
									buffer += 'NEAR' + branch.proximity;
									break;
								case 'mesh':
									buffer += '[mh ' + (branch.recurse ? '' : '^') + (/\s/.test(branch.content) ? '"' + branch.content + '"' : branch.content) + ']';
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
							+ (branch.type == 'raw' || // Its not a raw node
							branchIndex == tree.length - 1 || // or the last item in the sequence
							branchIndex < tree.length - 1 && tree[branchIndex + 1].type == 'raw' || branchIndex > 0 && tree[branchIndex - 1].type == 'raw' // or the next item is a raw node
							? '' : ' ');
						}).join('');
					};
					return compileWalker(tree);
				},
				open: function open(query) {
					return {
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
							'hiddenFields.searchFilters.displayIssuesAndTypesFilters': 'true'
						}
					};
				}
			},
			// }}}
			// Embase {{{
			embase: {
				title: 'Embase',
				aliases: ['embase', 'e', 'eb'],

				/**
    * Compile a tree structure to Embase output
    * @param {array} tree The parsed tree to process
    * @param {Object} [options] Optional options to use when compiling
    * @param {boolean} [options.replaceWildcards=true] Whether to replace wildcard characters (usually '?' or '$') within phrase nodes with this engines equivelent
    * @return {string} The compiled output
    */
				compile: function compile(tree, options) {
					var settings = _.defaults(options, {
						replaceWildcards: true
					});

					// Apply wildcard replacements
					if (settings.replaceWildcards) polyglot.tools.replaceContent(tree, ['phrase'], [{ subject: /[\?\$]/g, value: '?' }]);

					var compileWalker = function compileWalker(tree) {
						return tree.map(function (branch, branchIndex) {
							var buffer = '';
							switch (branch.type) {
								case 'group':
									if (branch.field) {
										buffer += '(' + compileWalker(branch.nodes) + ')' + (branch.field == 'title' ? ':ti' : branch.field == 'abstract' ? ':ab' : branch.field == 'title+abstract' ? ':ti,ab' : '' // Unsupported field suffix for PubMed
										);
									} else {
										buffer += '(' + compileWalker(branch.nodes) + ')';
									}
									break;
								case 'phrase':
									if (branch.field) {
										buffer += (/\s/.test(branch.content) ? '"' + branch.content + '"' : branch.content) + (branch.field == 'title' ? ':ti' : branch.field == 'abstract' ? ':ab' : branch.field == 'title+abstract' ? ':ti,ab' : '' // Unsupported field suffix for PubMed
										);
									} else {
										buffer += /\s/.test(branch.content) ? '"' + branch.content + '"' : branch.content;
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
									buffer += 'NEAR/' + branch.proximity;
									break;
								case 'mesh':
									buffer += "'" + branch.content + "'/" + (branch.recurse ? 'exp' : 'de');
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
							+ (branch.type == 'raw' || // Its not a raw node
							branchIndex == tree.length - 1 || // or the last item in the sequence
							branchIndex < tree.length - 1 && tree[branchIndex + 1].type == 'raw' || branchIndex > 0 && tree[branchIndex - 1].type == 'raw' // or the next item is a raw node
							? '' : ' ');
						}).join('');
					};
					return compileWalker(tree);
				},
				open: function open(query) {
					return {
						method: 'GET',
						action: 'http://www.embase.com.ezproxy.bond.edu.au/search',
						fields: {
							sb: 'y',
							search_query: query.replace(/\n+/g, ' ')
						}
					};
				}
			},
			// }}}
			// Web of Science {{{
			wos: {
				title: 'Web of Science',
				aliases: ['webofscience', 'w', 'wos', 'websci'],

				/**
    * Compile a tree structure to Web of Science output
    * @param {array} tree The parsed tree to process
    * @param {Object} [options] Optional options to use when compiling
    * @param {boolean} [options.replaceWildcards=true] Whether to replace wildcard characters (usually '?' or '$') within phrase nodes with this engines equivelent
    * @return {string} The compiled output
    */
				compile: function compile(tree, options) {
					var settings = _.defaults(options, {
						replaceWildcards: true
					});

					// Apply wildcard replacements
					if (settings.replaceWildcards) polyglot.tools.replaceContent(tree, ['phrase'], [{ subject: /[\?\$]/g, value: '?' }]);

					var compileWalker = function compileWalker(tree) {
						return tree.map(function (branch, branchIndex) {
							var buffer = '';
							switch (branch.type) {
								case 'group':
									buffer += '(' + compileWalker(branch.nodes) + ')';
									break;
								case 'phrase':
									buffer += /\s/.test(branch.content) ? '"' + branch.content + '"' : branch.content;
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
									buffer += /\s/.test(branch.content) ? '"' + branch.content + '"' : branch.content;
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
							+ (branch.type == 'raw' || // Its not a raw node
							branchIndex == tree.length - 1 || // or the last item in the sequence
							branchIndex < tree.length - 1 && tree[branchIndex + 1].type == 'raw' || branchIndex > 0 && tree[branchIndex - 1].type == 'raw' // or the next item is a raw node
							? '' : ' ');
						}).join('');
					};
					return compileWalker(tree);
				},
				open: function open(query) {
					return {
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
							endYear: new Date().getYear(),
							update_back2search_link_param: 'yes',
							ssStatus: 'display:none',
							ss_showsuggestions: 'ON',
							ss_query_language: 'auto',
							ss_numDefaultGeneralSearchFields: '1',
							rs_sort_by: 'PY.D;LD.D;SO.A;VL.D;PG.A;AU.A'
						}
					};
				}
			},
			// }}}
			// CINAHL {{{
			cinahl: {
				title: 'CINAHL',
				aliases: ['cinahl', 'ci', 'cnal'],

				/**
    * Compile a tree structure to CINAHL output
    * @param {array} tree The parsed tree to process
    * @param {Object} [options] Optional options to use when compiling
    * @param {boolean} [options.replaceWildcards=true] Whether to replace wildcard characters (usually '?' or '$') within phrase nodes with this engines equivelent
    * @return {string} The compiled output
    */
				compile: function compile(tree, options) {
					var settings = _.defaults(options, {
						replaceWildcards: true
					});

					// Apply wildcard replacements
					if (settings.replaceWildcards) polyglot.tools.replaceContent(tree, ['phrase'], [{ subject: /[\?\$]/g, value: '?' }]);

					var compileWalker = function compileWalker(tree) {
						return tree.map(function (branch, branchIndex) {
							var buffer = '';
							switch (branch.type) {
								case 'group':
									if (branch.field) // If the group has a filter decorate all its children with that field
										branch.nodes = polyglot.tools.visit(branch.nodes, ['phrase'], function (b) {
											return b.field = branch.field;
										});

									buffer += '(' + compileWalker(branch.nodes) + ')';
									break;
								case 'phrase':
									if (branch.field && branch.field == 'title+abstract') {
										buffer += 'TI ' + (/\s/.test(branch.content) ? '"' + branch.content + '"' : branch.content) + ' OR ' + 'AB ' + (/\s/.test(branch.content) ? '"' + branch.content + '"' : branch.content);
									} else if (branch.field) {
										buffer += _.trimStart((branch.field == 'title' ? 'TI' : branch.field == 'abstract' ? 'AB' : '') + ' ' + (/\s/.test(branch.content) ? '"' + branch.content + '"' : branch.content));
									} else {
										buffer += /\s/.test(branch.content) ? '"' + branch.content + '"' : branch.content;
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
									buffer += '(MH "' + branch.content + (branch.recurse ? '+' : '') + '")';
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
							+ (branch.type == 'raw' || // Its not a raw node
							branchIndex == tree.length - 1 || // or the last item in the sequence
							branchIndex < tree.length - 1 && tree[branchIndex + 1].type == 'raw' || branchIndex > 0 && tree[branchIndex - 1].type == 'raw' // or the next item is a raw node
							? '' : ' ');
						}).join('');
					};
					return compileWalker(tree);
				},
				open: function open(query) {
					return {
						method: 'POST',
						action: 'http://web.a.ebscohost.com.ezproxy.bond.edu.au/ehost/resultsadvanced',
						fields: {
							bquery: query
						}
					};
				}
			},
			// }}}
			// PsycInfo {{{
			psycinfo: {
				title: 'PsycInfo',
				aliases: ['p', 'pi'],

				/**
    * Compile a tree structure to PsycInfo output
    * @param {array} tree The parsed tree to process
    * @param {Object} [options] Optional options to use when compiling
    * @param {boolean} [options.replaceWildcards=true] Whether to replace wildcard characters (usually '?' or '$') within phrase nodes with this engines equivelent
    * @return {string} The compiled output
    */
				compile: function compile(tree, options) {
					var settings = _.defaults(options, {
						replaceWildcards: true
					});

					// Apply wildcard replacements
					if (settings.replaceWildcards) polyglot.tools.replaceContent(tree, ['phrase'], [{ subject: /[\?\$]/g, value: '?' }]);

					var compileWalker = function compileWalker(tree) {
						return tree.map(function (branch, branchIndex) {
							var buffer = '';
							switch (branch.type) {
								case 'group':
									buffer += '(' + compileWalker(branch.nodes) + ')';
									break;
								case 'phrase':
									if (branch.field) {
										buffer += branch.content + (branch.field == 'title' ? '.ti' : branch.field == 'abstract' ? '.ab' : branch.field == 'title+abstract' ? '.ti,ab' : '');
									} else {
										buffer += branch.content;
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
									buffer += /\s/.test(branch.content) ? '"' + branch.content + '"' : branch.content;
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
							+ (branch.type == 'raw' || // Its not a raw node
							branchIndex == tree.length - 1 || // or the last item in the sequence
							branchIndex < tree.length - 1 && tree[branchIndex + 1].type == 'raw' || branchIndex > 0 && tree[branchIndex - 1].type == 'raw' // or the next item is a raw node
							? '' : ' ');
						}).join('');
					};
					return compileWalker(tree);
				},
				open: function open(query) {
					return {
						method: 'POST',
						action: 'http://ovidsp.tx.ovid.com.ezproxy.bond.edu.au/sp-3.17.0a/ovidweb.cgi',
						fields: {
							textBox: query
						}
					};
				}
			},
			// }}}
			// Scopus {{{
			scopus: {
				title: 'scopus',
				aliases: ['s', 'so'],

				/**
    * Compile a tree structure to Scopus output
    * @param {array} tree The parsed tree to process
    * @param {Object} [options] Optional options to use when compiling
    * @param {boolean} [options.replaceWildcards=true] Whether to replace wildcard characters (usually '?' or '$') within phrase nodes with this engines equivelent
    * @return {string} The compiled output
    */
				compile: function compile(tree, options) {
					var settings = _.defaults(options, {
						replaceWildcards: true
					});

					// Apply wildcard replacements
					if (settings.replaceWildcards) polyglot.tools.replaceContent(tree, ['phrase'], [{ subject: /[\?\$]/g, value: '?' }]);

					var compileWalker = function compileWalker(tree) {
						return tree.map(function (branch, branchIndex) {
							var buffer = '';
							switch (branch.type) {
								case 'group':
									buffer += '(' + compileWalker(branch.nodes) + ')';
									break;
								case 'phrase':
									if (branch.field) {
										buffer += branch.field == 'title' ? 'TITLE(' + branch.content + ')' : branch.field == 'abstract' ? 'ABS(' + branch.content + ')' : branch.field == 'title+abstract' ? 'TITLE-ABS(' + branch.content + ')' : branch.content;
									} else {
										buffer += branch.content;
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
									buffer += 'INDEXTERMS(' + branch.content + ')';
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
							+ (branch.type == 'raw' || // Its not a raw node
							branchIndex == tree.length - 1 || // or the last item in the sequence
							branchIndex < tree.length - 1 && tree[branchIndex + 1].type == 'raw' || branchIndex > 0 && tree[branchIndex - 1].type == 'raw' // or the next item is a raw node
							? '' : ' ');
						}).join('');
					};
					return compileWalker(tree);
				},
				open: function open(query) {
					return {
						method: 'POST',
						action: 'http://ovidsp.tx.ovid.com.ezproxy.bond.edu.au/sp-3.17.0a/ovidweb.cgi',
						fields: {
							textBox: query
						}
					};
				}
			},
			// }}}
			// Lexical tree (JSON) {{{
			lexicalTreeJSON: {
				title: 'Lexical Tree (JSON)',
				aliases: ['debug'],
				debugging: true, // Mark this module for debugging only

				/**
    * Compile a tree structure to JSON output
    * @param {array} tree The parsed tree to process
    * @param {Object} [options] Optional options to use when compiling
    * @param {boolean} [options.prettyPrint=true] Whether to tidy up the JSON before output
    * @return {string} The compiled output
    */
				compile: function compile(tree, options) {
					var settings = _.defaults(options, {
						prettyPrint: true
					});

					if (settings.prettyPrint) {
						return JSON.stringify(tree, null, '\t');
					} else {
						return JSON.stringify(tree);
					}
				}
			},
			// }}}
			// Lexical tree (Human Readable) {{{
			lexicalTreeHuman: {
				title: 'Lexical Tree (Human Readable)',
				aliases: ['debug'],
				debugging: true, // Mark this module for debugging only

				/**
    * Compile a tree structure to a passably human readable tree
    * @param {array} tree The parsed tree to process
    * @param {Object} [options] Optional options to use when compiling
    * @return {string} The compiled output
    */
				compile: function compile(tree, options) {
					var compileWalker = function compileWalker(tree, level) {
						return tree.map(function (branch) {
							var buffer = _.repeat('  ', level) + '- ';
							switch (branch.type) {
								case 'group':
									buffer += 'GROUP' + (branch.field ? ' (field=' + branch.field + '):' : ':') + '\n';
									buffer += compileWalker(branch.nodes, level + 1);
									break;
								case 'phrase':
									buffer += '"' + branch.content + '"' + (branch.field ? ' (field=' + branch.field + ')' : '');
									break;
								case 'joinNear':
									buffer += 'NEAR' + branch.proximity;
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
								case 'mesh':
									buffer += 'MESH("' + branch.content + '")';
									break;
								case 'raw':
									buffer += 'RAW(' + branch.content.length + ' bytes)';
									break;
								case 'template':
									buffer += 'TEMPLATE(' + branch.content + ')';
									break;
								case 'comment':
									buffer += 'COMMENT("' + branch.content + '")';
									break;
								default:
									throw new Error('Unsupported object tree type: ' + branch.type);
							}

							return buffer;
						}).join('\n');
					};
					return compileWalker(tree, 0);
				}
			}
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
			replaceContent: function replaceContent(tree, types, replacements) {
				polyglot.tools.visit(tree, types, function (branch) {
					if (!branch.content) return;
					replacements.forEach(function (replacement) {
						branch.content = branch.content.replace(replacement.subject, replacement.value);
					});
				});
				return tree;
			},

			/**
   * Visit the given node types within a deeply nested tree and run a function
   * This function may mutate the input tree depending on the actions of the callbacks
   * @param {array} tree The tree sturcture to operate on
   * @param {null|array} types Node filter to apply to (if falsy all are used)
   * @param {function} callback The callback to call with each node
   * @return {array} The input tree
   */
			visit: function visit(tree, types, callback) {
				var treeWalker = function treeWalker(tree) {
					tree.forEach(function (branch) {
						// Fire callback if it matches
						if (!types || _.includes(types, branch.type)) callback(branch);

						// Walk down nodes if its a group
						if (branch.type == 'group') treeWalker(branch.nodes);
					});
				};

				treeWalker(tree);
				return tree;
			},

			/**
   * Retrieve the contents of a template by its ID
   * NOTE: If the specific engine definition is not found 'default' is used (and it will be pre-parsed via .translate())
   * @param {string} template The template to resolve
   * @param {string} engine The current engine (used to get the correct sub-templating string)
   * @return {string} The resolved template
   */
			resolveTemplate: function resolveTemplate(template, engine) {
				if (!polyglot.templates[template]) return 'UNKNOWN-TEMPLATE:' + template;
				if (polyglot.templates[template].engines[engine]) return polyglot.templates[template].engines[engine];
				if (polyglot.templates[template].engines.default) return polyglot.translate(polyglot.templates[template].engines.default, engine);
				return '';
			}
		}
	};
});