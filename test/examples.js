var _ = require('lodash');
var expect = require('chai').expect;
var polyglot = require('..');

describe('Example test "Failure of antibiotic prescribing for bacterial infections"', function() {
	var example = _.find(polyglot.examples, {title: 'Failure of antibiotic prescribing for bacterial infections'});

	it('should translate the example into PubMed format', function() {
		expect(polyglot.translate(example.query, 'pubmed')).to.equal(
			'("Primary Health Care"[MESH] OR Primary care OR Primary healthcare OR Family practice OR General practice)\n\n' +
			'AND\n\n' +
			'("Treatment Failure"[MESH] OR Treatment failure OR Treatment failures)\n\n' +
			'AND\n\n' +
			'("Bacterial Infections"[MESH] OR Bacteria OR Bacterial)\n\n' +
			'AND\n\n' +
			'("Anti-Bacterial Agents"[MESH] OR Antibacterial Agents OR Antibacterial Agent OR Antibiotics OR Antibiotic)'
		);
	});

	it('should translate the example into Ovid format', function() {
		expect(polyglot.translate(example.query, 'ovid')).to.equal(
			'(exp Primary Health Care/ OR Primary care OR Primary healthcare OR Family practice OR General practice)\n\n' +
			'AND\n\n' +
			'(exp Treatment Failure/ OR Treatment failure OR Treatment failures)\n\n' +
			'AND\n\n' +
			'(exp Bacterial Infections/ OR Bacteria OR Bacterial)\n\n' +
			'AND\n\n' +
			'(exp Anti-Bacterial Agents/ OR Antibacterial Agents OR Antibacterial Agent OR Antibiotics OR Antibiotic)'
		);
	});

	it('should translate the example into Cochrane format', function() {
		expect(polyglot.translate(example.query, 'cochrane')).to.equal(
			'([mh "Primary Health Care"] OR Primary care OR Primary healthcare OR Family practice OR General practice)\n\n' +
			'AND\n\n' +
			'([mh "Treatment Failure"] OR Treatment failure OR Treatment failures)\n\n' +
			'AND\n\n' +
			'([mh "Bacterial Infections"] OR Bacteria OR Bacterial)\n\n' +
			'AND\n\n' +
			'([mh "Anti-Bacterial Agents"] OR Antibacterial Agents OR Antibacterial Agent OR Antibiotics OR Antibiotic)'
		);
	});

	it('should translate the example into Embase format', function() {
		expect(polyglot.translate(example.query, 'embase')).to.equal(
			'(\'Primary Health Care\'/exp OR Primary care OR Primary healthcare OR Family practice OR General practice)\n\n' +
			'AND\n\n' +
			'(\'Treatment Failure\'/exp OR Treatment failure OR Treatment failures)\n\n' +
			'AND\n\n' +
			'(\'Bacterial Infections\'/exp OR Bacteria OR Bacterial)\n\n' +
			'AND\n\n' +
			'(\'Anti-Bacterial Agents\'/exp OR Antibacterial Agents OR Antibacterial Agent OR Antibiotics OR Antibiotic)'
		);
	});

	it('should translate the example into CINAHL format', function() {
		expect(polyglot.translate(example.query, 'cinahl')).to.equal(
			'((MH "Primary Health Care+") OR Primary care OR Primary healthcare OR Family practice OR General practice)\n\n' +
			'AND\n\n' +
			'((MH "Treatment Failure+") OR Treatment failure OR Treatment failures)\n\n' +
			'AND\n\n' +
			'((MH "Bacterial Infections+") OR Bacteria OR Bacterial)\n\n' +
			'AND\n\n' +
			'((MH "Anti-Bacterial Agents+") OR Antibacterial Agents OR Antibacterial Agent OR Antibiotics OR Antibiotic)'
		);
	});

	it('should translate the example into WoS format', function() {
		expect(polyglot.translate(example.query, 'webofscience')).to.equal(
			'(Primary care OR Primary healthcare OR Family practice OR General practice)\n\n' +
			'AND\n\n' +
			'(Treatment failure OR Treatment failures)\n\n' +
			'AND\n\n' +
			'(Bacteria OR Bacterial)\n\n' +
			'AND\n\n' +
			'(Antibacterial Agents OR Antibacterial Agent OR Antibiotics OR Antibiotic)'
		);
	});

});
