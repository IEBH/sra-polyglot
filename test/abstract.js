var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate abstract searches (PubMed -> *)', function() {

	it('translate PM `term1[ab]` -> PM `term1[ab]`', function() {
		expect(polyglot.translate('term1[ab]', 'pubmed')).to.equal('(term1[ab])');
	});

	it('translate PM `term1[ab]` -> OV `term1:ab`', function() {
		expect(polyglot.translate('term1[ab]', 'ovid')).to.equal('(term1:ab)');
	});

	it('translate PM `term1[ab]` -> CO `term1:ab`', function() {
		expect(polyglot.translate('term1[ab]', 'cochrane')).to.equal('(term1:ab)');
	});

	it('translate PM `term1[ab]` -> EM `term1:ab`', function() {
		expect(polyglot.translate('term1[ab]', 'embase')).to.equal('(term1:ab)');
	});

	it('translate PM `term1[ab]` -> CI `ab term1`', function() {
		expect(polyglot.translate('term1[ab]', 'cinahl')).to.equal('(ab term1)');
	});

	it('translate PM `term1[ab]` -> WS N/A', function() {
		expect(polyglot.translate('term1[ab]', 'webofscience')).to.equal('()');
	});

});

describe('Translate abstract searches (Ovid -> *)', function() {

	it('translate OV `term1:ab` -> PM `term1[ab]`', function() {
		expect(polyglot.translate('term1:ab', 'pubmed')).to.equal('(term1[ab])');
	});

	it('translate OV `term1:ab` -> OV `term1:ab`', function() {
		expect(polyglot.translate('term1:ab', 'ovid')).to.equal('(term1:ab)');
	});

	it('translate OV `term1:ab` -> CO `term1:ab`', function() {
		expect(polyglot.translate('term1:ab', 'cochrane')).to.equal('(term1:ab)');
	});

	it('translate OV `term1:ab` -> EM `term1:ab`', function() {
		expect(polyglot.translate('term1:ab', 'embase')).to.equal('(term1:ab)');
	});

	it('translate OV `term1:ab` -> CI `ab term1`', function() {
		expect(polyglot.translate('term1:ab', 'cinahl')).to.equal('(ab term1)');
	});

	it('translate OV `term1:ab` -> WS N/A', function() {
		expect(polyglot.translate('term1:ab', 'webofscience')).to.equal('()');
	});

});
