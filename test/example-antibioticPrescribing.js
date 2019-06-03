var _ = require('lodash');
var expect = require('chai').expect;
var polyglot = require('..');

describe('Example test "Failure of antibiotic prescribing for bacterial infections"', ()=> {
	var example = _.find(polyglot.examples, {title: 'Failure of antibiotic prescribing for bacterial infections'});
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
						recurse: true,
						content: 'Primary Health Care',
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'Primary care',
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'Primary healthcare',
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'Family practice',
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'General practice',
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
						recurse: true,
						content: 'Treatment Failure',
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'Treatment failure',
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'Treatment failures',
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
						recurse: true,
						content: 'Bacterial Infections',
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'Bacteria',
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'Bacterial',
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
						recurse: true,
						content: 'Anti-Bacterial Agents',
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'Antibacterial Agents',
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'Antibacterial Agent',
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'Antibiotics',
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'Antibiotic',
					},
				],
			},
		];
		// }}}
		expect(polyglot.parse(example.query, {groupLines: false})).to.deep.equal(tree);
	});

	it('should translate the example into PubMed format', ()=> {
		expect(polyglot.translate(example.query, 'pubmed', {groupLines: true, html: false})).to.equal(
			'("Primary Health Care"[Mesh] OR "Primary care" OR "Primary healthcare" OR "Family practice" OR "General practice")\n\n' +
			'AND\n\n' +
			'("Treatment Failure"[Mesh] OR "Treatment failure" OR "Treatment failures")\n\n' +
			'AND\n\n' +
			'("Bacterial Infections"[Mesh] OR Bacteria OR Bacterial)\n\n' +
			'AND\n\n' +
			'("Anti-Bacterial Agents"[Mesh] OR "Antibacterial Agents" OR "Antibacterial Agent" OR Antibiotics OR Antibiotic)'
		);
	});

	it('should translate the example into Ovid format', ()=> {
		expect(polyglot.translate(example.query, 'ovid', {groupLines: true, html: false})).to.equal(
			'(exp Primary Health Care/ OR Primary care OR Primary healthcare OR Family practice OR General practice)\n\n' +
			'AND\n\n' +
			'(exp Treatment Failure/ OR Treatment failure OR Treatment failures)\n\n' +
			'AND\n\n' +
			'(exp Bacterial Infections/ OR Bacteria OR Bacterial)\n\n' +
			'AND\n\n' +
			'(exp Anti-Bacterial Agents/ OR Antibacterial Agents OR Antibacterial Agent OR Antibiotics OR Antibiotic)'
		);
	});

	it('should translate the example into Cochrane format', ()=> {
		expect(polyglot.translate(example.query, 'cochrane', {groupLines: true, html: false})).to.equal(
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
		expect(polyglot.translate(example.query, 'embase', {groupLines: true, html: false})).to.equal(
			'(\'Primary Health Care\'/exp OR "Primary care" OR "Primary healthcare" OR "Family practice" OR "General practice")\n\n' +
			'AND\n\n' +
			'(\'Treatment Failure\'/exp OR "Treatment failure" OR "Treatment failures")\n\n' +
			'AND\n\n' +
			'(\'Bacterial Infections\'/exp OR Bacteria OR Bacterial)\n\n' +
			'AND\n\n' +
			'(\'Anti-Bacterial Agents\'/exp OR "Antibacterial Agents" OR "Antibacterial Agent" OR Antibiotics OR Antibiotic)'
		);
	});

	it('should translate the example into CINAHL format', ()=> {
		expect(polyglot.translate(example.query, 'cinahl', {groupLines: true, html: false})).to.equal(
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
		expect(polyglot.translate(example.query, 'wos', {groupLines: true, html: false})).to.equal(
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
