const global = require( '../lib/modules/global.js').default;
const parse = require('../lib/modules/parse.js').parse;

var _ = require('lodash');
var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Example test "Failure of antibiotic prescribing for bacterial infections"', ()=> {
	var example = _.find(global.examples, {title: 'Failure of antibiotic prescribing for bacterial infections'});
	expect(example).to.be.an.instanceOf(Object);
	expect(example).to.have.property('query');

	it('should parse the object tree correctly', ()=> {
		/*
			"Primary Health Care"[Mesh] OR Primary care OR Primary healthcare OR Family practice OR General practice
			AND
			"Treatment Failure"[Mesh] OR Treatment failure OR Treatment failures
			AND
			"Bacterial Infections"[Mesh] OR Bacteria OR Bacterial
			AND
			"Anti-Bacterial Agents"[Mesh] OR Antibacterial Agents OR Antibacterial Agent OR Antibiotics OR Antibiotic
		*/
		// Tree structure {{{
		var tree = [
			{
				type: 'line',
				number: 1,
				isNumbered: false,
				nodes: [
					{
						type: 'mesh',
						field: 'Mesh search (exploded)',
						content: 'Primary Health Care',
						offset: 0,
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'Primary care',
						offset: 31,
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'Primary healthcare',
						offset: 47,
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'Family practice',
						offset: 69,
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'General practice',
						offset: 88,
					},
					{
						type: 'raw',
						content: '\n\n',
					},
				],
			},
			{
				type: 'line',
				number: 3,
				isNumbered: false,
				nodes: [
					{type: 'joinAnd'},
					{
						type: 'raw',
						content: '\n\n',
					},
				]
			},
			{
				type: 'line',
				number: 5,
				isNumbered: false,
				nodes: [
					{
						type: 'mesh',
						field: 'Mesh search (exploded)',
						content: 'Treatment Failure',
						offset: 111,
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'Treatment failure',
						offset: 140,
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'Treatment failures',
						offset: 161,
					},
					{
						type: 'raw',
						content: '\n\n',
					},
				],
			},
			{
				type: 'line',
				number: 7,
				isNumbered: false,
				nodes: [
					{type: 'joinAnd'},
					{
						type: 'raw',
						content: '\n\n',
					},
				]
			},
			{
				type: 'line',
				number: 9,
				isNumbered: false,
				nodes: [
					{
						type: 'mesh',
						field: 'Mesh search (exploded)',
						content: 'Bacterial Infections',
						offset: 186,
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'Bacteria',
						offset: 218,
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'Bacterial',
						offset: 230,
					},
					{
						type: 'raw',
						content: '\n\n',
					},
				],
			},
			{
				type: 'line',
				number: 11,
				isNumbered: false,
				nodes: [
					{type: 'joinAnd'},
					{
						type: 'raw',
						content: '\n\n',
					},
				]
			},
			{
				type: 'line',
				number: 13,
				isNumbered: false,
				nodes: [
					{
						type: 'mesh',
						field: 'Mesh search (exploded)',
						content: 'Anti-Bacterial Agents',
						offset: 246,
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'Antibacterial Agents',
						offset: 279,
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'Antibacterial Agent',
						offset: 303,
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'Antibiotics',
						offset: 326,
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'Antibiotic',
						offset: 341,
					},
				],
			},
		];
		// }}}
		expect(parse(example.query, {groupLines: false})).to.deep.equal(tree);
	});

	it('should translate the example into PubMed format', ()=> {
		expect(polyglot.translate(example.query, 'PubMed abbreviation', {groupLines: true, html: false})).to.equal(
			'("Primary Health Care"[Mesh] OR "Primary care" OR "Primary healthcare" OR "Family practice" OR "General practice")\n\n' +
			'AND\n\n' +
			'("Treatment Failure"[Mesh] OR "Treatment failure" OR "Treatment failures")\n\n' +
			'AND\n\n' +
			'("Bacterial Infections"[Mesh] OR Bacteria OR Bacterial)\n\n' +
			'AND\n\n' +
			'("Anti-Bacterial Agents"[Mesh] OR "Antibacterial Agents" OR "Antibacterial Agent" OR Antibiotics OR Antibiotic)'
		);
	});

	it('should translate the example into Ovid MEDLINE format', ()=> {
		expect(polyglot.translate(example.query, 'Ovid MEDLINE', {groupLines: true, html: false})).to.equal(
			'(exp "Primary Health Care"/ OR "Primary care" OR "Primary healthcare" OR "Family practice" OR "General practice")\n\n' +
			'AND\n\n' +
			'(exp "Treatment Failure"/ OR "Treatment failure" OR "Treatment failures")\n\n' +
			'AND\n\n' +
			'(exp "Bacterial Infections"/ OR Bacteria OR Bacterial)\n\n' +
			'AND\n\n' +
			'(exp "Anti-Bacterial Agents"/ OR "Antibacterial Agents" OR "Antibacterial Agent" OR Antibiotics OR Antibiotic)'
		);
	});

	it('should translate the example into Cochrane format', ()=> {
		expect(polyglot.translate(example.query, 'Cochrane Library', {groupLines: true, html: false})).to.equal(
			'([mh "Primary Health Care"] OR "Primary care" OR "Primary healthcare" OR "Family practice" OR "General practice")\n\n' +
			'AND\n\n' +
			'([mh "Treatment Failure"] OR "Treatment failure" OR "Treatment failures")\n\n' +
			'AND\n\n' +
			'([mh "Bacterial Infections"] OR Bacteria OR Bacterial)\n\n' +
			'AND\n\n' +
			'([mh "Anti-Bacterial Agents"] OR "Antibacterial Agents" OR "Antibacterial Agent" OR Antibiotics OR Antibiotic)'
		);
	});

	it('should translate the example into Embase format', ()=> {
		expect(polyglot.translate(example.query, 'Embase (Elsevier)', {groupLines: true, html: false})).to.equal(
			'("Primary Health Care"/exp OR "Primary care" OR "Primary healthcare" OR "Family practice" OR "General practice")\n\n' +
			'AND\n\n' +
			'("Treatment Failure"/exp OR "Treatment failure" OR "Treatment failures")\n\n' +
			'AND\n\n' +
			'("Bacterial Infections"/exp OR Bacteria OR Bacterial)\n\n' +
			'AND\n\n' +
			'("Anti-Bacterial Agents"/exp OR "Antibacterial Agents" OR "Antibacterial Agent" OR Antibiotics OR Antibiotic)'
		);
	});

	it('should translate the example into CINAHL format', ()=> {
		expect(polyglot.translate(example.query, 'CINAHL (Ebsco)', {groupLines: true, html: false})).to.equal(
			'((MH "Primary Health Care+") OR "Primary care" OR "Primary healthcare" OR "Family practice" OR "General practice")\n\n' +
			'AND\n\n' +
			'((MH "Treatment Failure+") OR "Treatment failure" OR "Treatment failures")\n\n' +
			'AND\n\n' +
			'((MH "Bacterial Infections+") OR Bacteria OR Bacterial)\n\n' +
			'AND\n\n' +
			'((MH "Anti-Bacterial Agents+") OR "Antibacterial Agents" OR "Antibacterial Agent" OR Antibiotics OR Antibiotic)'
		);
	});

	it('should translate the example into WoS format', ()=> {
		expect(polyglot.translate(example.query, 'Web of Science', {groupLines: true, html: false})).to.equal(
			'("Primary Health Care" OR "Primary care" OR "Primary healthcare" OR "Family practice" OR "General practice")\n\n' +
			'AND\n\n' +
			'("Treatment Failure" OR "Treatment failure" OR "Treatment failures")\n\n' +
			'AND\n\n' +
			'("Bacterial Infections" OR Bacteria OR Bacterial)\n\n' +
			'AND\n\n' +
			'("Anti-Bacterial Agents" OR "Antibacterial Agents" OR "Antibacterial Agent" OR Antibiotics OR Antibiotic)'
		);
	});

});
