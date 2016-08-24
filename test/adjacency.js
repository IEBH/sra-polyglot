var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate adjacency searches (ADJ format)', function() {

	it('translate `term1 ADJ3 term2` -> PM `term1 AND term2`', function() {
		expect(polyglot.translate('term1 ADJ3 term2', 'pubmed')).to.equal('(term1 AND term2)');
	});

	it('translate `term1 ADJ3 term2` -> OV `term1 ADJ3 term2`', function() {
		expect(polyglot.translate('term1 ADJ3 term2', 'ovid')).to.equal('(term1 adj3 term2)');
	});

	it('translate `term1 ADJ3 term2` -> CO `term1 NEAR3 term2`', function() {
		expect(polyglot.translate('term1 ADJ3 term2', 'cochrane')).to.equal('(term1 NEAR3 term2)');
	});

	it('translate `term1 ADJ3 term2` -> EM N/A', function() {
		expect(polyglot.translate('term1 ADJ3 term2', 'embase')).to.equal('');
	});

	it('translate `term1 ADJ3 term2` -> CI `term1 N3 term2`', function() {
		expect(polyglot.translate('term1 ADJ3 term2', 'cinahl')).to.equal('(term1 N3 term2)');
	});

	it('translate `term1 ADJ3 term2` -> WS N/A', function() {
		expect(polyglot.translate('term1 ADJ3 term2', 'wos')).to.equal('');
	});

});

describe('Translate adjacency searches (NEAR3 format)', function() {

	it('translate `term1 NEAR3 term2` -> PM `term1 AND term2`', function() {
		expect(polyglot.translate('term1 NEAR3 term2', 'pubmed')).to.equal('(term1 AND term2)');
	});

	it('translate `term1 NEAR3 term2` -> OV `term1 ADJ3 term2`', function() {
		expect(polyglot.translate('term1 NEAR3 term2', 'ovid')).to.equal('(term1 adj3 term2)');
	});

	it('translate `term1 NEAR3 term2` -> CO `term1 NEAR3 term2`', function() {
		expect(polyglot.translate('term1 NEAR3 term2', 'cochrane')).to.equal('(term1 NEAR3 term2)');
	});

	it('translate `term1 NEAR3 term2` -> EM N/A', function() {
		expect(polyglot.translate('term1 NEAR3 term2', 'embase')).to.equal('');
	});

	it('translate `term1 NEAR3 term2` -> CI `term1 N3 term2`', function() {
		expect(polyglot.translate('term1 NEAR3 term2', 'cinahl')).to.equal('(term1 N3 term2)');
	});

	it('translate `term1 NEAR3 term2` -> WS N/A', function() {
		expect(polyglot.translate('term1 NEAR3 term2', 'wos')).to.equal('');
	});

});
