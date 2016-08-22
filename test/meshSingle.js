var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate single MESH terms (PubMed -> *)', function() {

	it('translate PM `term1[Mesh]` -> PM `term1 term2[Mesh]`', function() {
		expect(polyglot.translate('term1[Mesh]', 'pubmed')).to.equal('(term1[Mesh])');
	});

	it('translate PM `term1[Mesh]` -> OV `exp term1 term2/`', function() {
		expect(polyglot.translate('term1[Mesh]', 'ovid')).to.equal('(exp term1/)');
	});

	it('translate PM `term1[Mesh]` -> CO `[mh term1 term2]`', function() {
		expect(polyglot.translate('term1[Mesh]', 'cochrane')).to.equal('([mh term1])');
	});

	it('translate PM `term1[Mesh]` -> EM `term1 term2/exp`', function() {
		expect(polyglot.translate('term1[Mesh]', 'embase')).to.equal('(term1/exp)');
	});

	it('translate PM `term1[Mesh]` -> CI `(MH term1 term2+)`', function() {
		expect(polyglot.translate('term1[Mesh]', 'cinahl')).to.equal('(MH term1+)');
	});

	it('translate PM `term1[Mesh]` -> WS `term1 term2`', function() {
		expect(polyglot.translate('term1[Mesh]', 'webofscience')).to.equal('()');
	});

});

describe('Translate single MESH terms (Ovid -> *)', function() {

	it('translate OV `exp term1 term2/` -> PM `term1 term2[Mesh]`', function() {
		expect(polyglot.translate('exp term1/', 'pubmed')).to.equal('(term1[Mesh])');
	});

	it('translate OV `exp term1 term2/` -> OV `exp term1 term2/`', function() {
		expect(polyglot.translate('exp term1/', 'ovid')).to.equal('(exp term1/)');
	});

	it('translate OV `exp term1 term2/` -> CO `[mh term1 term2]`', function() {
		expect(polyglot.translate('exp term1/', 'cochrane')).to.equal('([mh term1])');
	});

	it('translate OV `exp term1 term2/` -> EM `term1 term2/exp`', function() {
		expect(polyglot.translate('exp term1/', 'embase')).to.equal('(term1/exp)');
	});

	it('translate OV `exp term1 term2/` -> CI `(MH term1 term2+)`', function() {
		expect(polyglot.translate('exp term1/', 'cinahl')).to.equal('(MH term1+)');
	});

	it('translate OV `exp term1 term2/` -> WS `term1 term2`', function() {
		expect(polyglot.translate('exp term1/', 'webofscience')).to.equal('()');
	});

});
