import fs from 'fs';
import {expect} from 'chai';
import polyglot from '../src';

/**
* Actual tests to run
* @type {array<Object>} A collection of tests extracted from the TSV file
* @property {string} Explanation Base title of the test set
* @property {string} [title...] Various 1:M tests of the set
*/
var tests;


/**
* Array of valid source material data should be taken from in a test
* @type {array<string>} Valid source data field names
*/
var sources = ['PubMed full', 'PubMed Abbreviation', 'Ovid MEDLINE', 'Ovid MEDLINE 2'];


/**
* Function to translate data headers into polyglot drivers
* @param {string} input The TSV header text
* @returns {string|null} Either a valid polyglot driver or null if none are found
*/
var getPolyglotDriver = input => {
	var found;
	if (found = /^(?<prefix>cinahl|cochrane|embase|psycinfo|pubmed|ovid|wos)/i.exec(input)) { // Use simple prefix
		return found.groups.prefix.toLowerCase();
	} else if (/^web of science/.test(input)) {
		return 'wos';
	} else {
		return null;
	}
};


/**
* Combinational source vs. tests we can test from/to
* Computed from the test header data + sources
* @type {array<array>} An tuple of source + destination
*/
var targets;

it('should parse test/data/fields.tsv', ()=>
	fs.promises.readFile(`${__dirname}/data/v4.tsv`, 'utf-8')
		.then(content => content.split(/\n/))
		.then(lines => {
			var headers = lines.shift().split(/\t/);
			// Compute target structure from headers {{{
			targets = headers
				.filter(source => sources.includes(source))
				.map(source =>
					headers
						.filter(destination =>
							destination != 'Explanation'
							&& destination != source
						)
						.map(destination => [source, destination])
				)
				.reduce((t, v) => t.concat(v), []) //~ Flatten
			// }}}

			// Flatten lines into collection of tests {{{
			tests = lines
				.map(line => line // Parse TSV into object
					.split(/\t/)
					.map((item, offset) => ({
						[headers[offset]]: item.replace(/^\s+/, '').replace(/\s+$/, ''), //~ Trim fields + glue into object tuple
					}))
					.reduce((total, item) => ({...total, ...item}), {}) //~ Flatten object tuples into one object
				)
				.filter(line => line.Explanation) // Remove duds
			// }}}
		})
		.then(()=> {
			tests.forEach(test => {
				describe(test.Explanation, ()=> targets
					.filter(([source, destination]) =>
						test[source] && test[destination] // Both endpoints must have a testable value
						&& test[source] != 'null' && test[destination] != 'null' // And they can't be excluded from testing
						&& getPolyglotDriver(destination) // Should have a valid destination driver
					)
					.forEach(([source, destination]) =>
						it(`${test.Explanation}: ${source} -> ${destination}`, ()=> {
							expect(polyglot.translate(test[source], getPolyglotDriver(destination))).to.equal(test[destination]);
						})
					)
				);
			});
		})
)
