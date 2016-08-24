var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate title searches (PubMed -> *)', function() {

	it('translate PM `term1[ti]` -> PM `term1[ti]`', function() {
		expect(polyglot.translate('term1[ti]', 'pubmed')).to.equal('(term1[ti])');
	});

	it('translate PM `term1[ti]` -> OV `term1:ti`', function() {
		expect(polyglot.translate('term1[ti]', 'ovid')).to.equal('(term1:ti)');
	});

	it('translate PM `term1[ti]` -> CO `term1:ti`', function() {
		expect(polyglot.translate('term1[ti]', 'cochrane')).to.equal('(term1:ti)');
	});

	it('translate PM `term1[ti]` -> EM `term1:ti`', function() {
		expect(polyglot.translate('term1[ti]', 'embase')).to.equal('(term1:ti)');
	});

	it('translate PM `term1[ti]` -> CI `ti term1`', function() {
		expect(polyglot.translate('term1[ti]', 'cinahl')).to.equal('(ti term1)');
	});

	it('translate PM `term1[ti]` -> WS N/A', function() {
		expect(polyglot.translate('term1[ti]', 'wos')).to.equal('()');
	});

});

describe('Translate title searches (Ovid -> *)', function() {

	it('translate OV `term1:ti` -> PM `term1[ti]`', function() {
		expect(polyglot.translate('term1:ti', 'pubmed')).to.equal('(term1[ti])');
	});

	it('translate OV `term1:ti` -> OV `term1:ti`', function() {
		expect(polyglot.translate('term1:ti', 'ovid')).to.equal('(term1:ti)');
	});

	it('translate OV `term1:ti` -> CO `term1:ti`', function() {
		expect(polyglot.translate('term1:ti', 'cochrane')).to.equal('(term1:ti)');
	});

	it('translate OV `term1:ti` -> EM `term1:ti`', function() {
		expect(polyglot.translate('term1:ti', 'embase')).to.equal('(term1:ti)');
	});

	it('translate OV `term1:ti` -> CI `ti term1`', function() {
		expect(polyglot.translate('term1:ti', 'cinahl')).to.equal('(ti term1)');
	});

	it('translate OV `term1:ti` -> WS N/A', function() {
		expect(polyglot.translate('term1:ti', 'wos')).to.equal('()');
	});

});
