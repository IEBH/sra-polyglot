var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate title + abstract searches (PubMed -> *)', function() {

	it('translate PM `term1[tiab]` -> PM `term1[tiab]`', function() {
		expect(polyglot.translate('term1[tiab]', 'pubmed')).to.equal('(term1[tiab])');
	});

	it('translate PM `term1[tiab]` -> OV `term1:ti,ab`', function() {
		expect(polyglot.translate('term1[tiab]', 'ovid')).to.equal('(term1:ti,ab)');
	});

	it('translate PM `term1[tiab]` -> CO `term1:ti,ab`', function() {
		expect(polyglot.translate('term1[tiab]', 'cochrane')).to.equal('(term1:ti,ab)');
	});

	it('translate PM `term1[tiab]` -> EM `term1:ti,ab`', function() {
		expect(polyglot.translate('term1[tiab]', 'embase')).to.equal('(term1:ti,ab)');
	});

	it('translate PM `term1[tiab]` -> CI `ti term1`', function() {
		expect(polyglot.translate('term1[tiab]', 'cinahl')).to.equal('(ti term1 AB term1)');
	});

	it('translate PM `term1[tiab]` -> WS N/A', function() {
		expect(polyglot.translate('term1[tiab]', 'webofscience')).to.equal('()');
	});

});

describe('Translate title + abstract searches (Ovid `term:ti,ab` format) -> *)', function() {

	it('translate OV `term1:ti,ab` -> PM `term1[tiab]`', function() {
		expect(polyglot.translate('term1:ti,ab', 'pubmed')).to.equal('(term1[tiab])');
	});

	it('translate OV `term1:ti,ab` -> OV `term1:ti,ab`', function() {
		expect(polyglot.translate('term1:ti,ab', 'ovid')).to.equal('(term1:ti,ab)');
	});

	it('translate OV `term1:ti,ab` -> CO `term1:ti,ab`', function() {
		expect(polyglot.translate('term1:ti,ab', 'cochrane')).to.equal('(term1:ti,ab)');
	});

	it('translate OV `term1:ti,ab` -> EM `term1:ti,ab`', function() {
		expect(polyglot.translate('term1:ti,ab', 'embase')).to.equal('(term1:ti,ab)');
	});

	it('translate OV `term1:ti,ab` -> CI `ti term1`', function() {
		expect(polyglot.translate('term1:ti,ab', 'cinahl')).to.equal('(ti term1 AB term1)');
	});

	it('translate OV `term1:ti,ab` -> WS N/A', function() {
		expect(polyglot.translate('term1:ti,ab', 'webofscience')).to.equal('()');
	});

});

describe('Translate title + abstract searches (Ovid `term.tw` format) -> *)', function() {

	it('translate OV `term1.tw` -> PM `term1[tiab]`', function() {
		expect(polyglot.translate('term1.tw', 'pubmed')).to.equal('(term1[tiab])');
	});

	it('translate OV `term1.tw` -> OV `term1.tw`', function() {
		expect(polyglot.translate('term1.tw', 'ovid')).to.equal('(term1.tw)');
	});

	it('translate OV `term1.tw` -> CO `term1.tw`', function() {
		expect(polyglot.translate('term1.tw', 'cochrane')).to.equal('(term1.tw)');
	});

	it('translate OV `term1.tw` -> EM `term1.tw`', function() {
		expect(polyglot.translate('term1.tw', 'embase')).to.equal('(term1.tw)');
	});

	it('translate OV `term1.tw` -> CI `ti term1`', function() {
		expect(polyglot.translate('term1.tw', 'cinahl')).to.equal('(ti term1 AB term1)');
	});

	it('translate OV `term1.tw` -> WS N/A', function() {
		expect(polyglot.translate('term1.tw', 'webofscience')).to.equal('()');
	});

});
