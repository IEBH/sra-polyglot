var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate wildcards searches (multiple character "*" style)', function() {

	it('translate PM `term1*` -> PM `term1*`', function() {
		expect(polyglot.translate('term1*', 'pubmed')).to.equal('term1*');
	});

	it('translate PM `term1*` -> OV `term1*`', function() {
		expect(polyglot.translate('term1*', 'ovid')).to.equal('term1*');
	});

	it('translate PM `term1*` -> CO `term1*`', function() {
		expect(polyglot.translate('term1*', 'cochrane')).to.equal('term1*');
	});

	it('translate PM `term1*` -> EM `term1*`', function() {
		expect(polyglot.translate('term1*', 'embase')).to.equal('term1*');
	});

	it('translate PM `term1*` -> CI `term1*`', function() {
		expect(polyglot.translate('term1*', 'cinahl')).to.equal('term1*');
	});

	it('translate PM `term1*` -> PY `term1*`', function() {
		expect(polyglot.translate('term1*', 'psycinfo')).to.equal('term1*');
	});

	it('translate PM `term1*` -> SC `term1*`', function() {
		expect(polyglot.translate('term1*', 'scopus')).to.equal('"term1*"');
	});

	it('translate PM `term1*` -> WS `term1*`', function() {
		expect(polyglot.translate('term1*', 'wos')).to.equal('term1*');
	});

});

describe('Translate wildcards searches (single character PubMed "?" style)', function() {

	it('translate PM `term1?` -> PM `term1*`', function() {
		expect(polyglot.translate('term1?', 'pubmed')).to.equal('term1*');
	});

	it('translate PM `term1?` -> OV `term1$`', function() {
		expect(polyglot.translate('term1?', 'ovid')).to.equal('term1$');
	});

	it('translate PM `term1?` -> CO `term1?`', function() {
		expect(polyglot.translate('term1?', 'cochrane')).to.equal('term1?');
	});

	it('translate PM `term1?` -> EM `term1?`', function() {
		expect(polyglot.translate('term1?', 'embase')).to.equal('term1?');
	});

	it('translate PM `term1?` -> CI `term1#`', function() {
		expect(polyglot.translate('term1?', 'cinahl')).to.equal('term1#');
	});

	it('translate PM `term1?` -> PY `term1?`', function() {
		expect(polyglot.translate('term1?', 'psycinfo')).to.equal('term1?');
	});

	it('translate PM `term1?` -> SC `term1?`', function() {
		expect(polyglot.translate('term1?', 'scopus')).to.equal('"term1?"');
	});

	it('translate PM `term1?` -> WS `term1?`', function() {
		expect(polyglot.translate('term1?', 'wos')).to.equal('term1?');
	});

});

describe('Translate wildcards searches (single character Ovid "$" style)', function() {

	it('translate PM `term1$` -> PM `term1*`', function() {
		expect(polyglot.translate('term1$', 'pubmed')).to.equal('term1*');
	});

	it('translate PM `term1$` -> OV `term1$`', function() {
		expect(polyglot.translate('term1$', 'ovid')).to.equal('term1$');
	});

	it('translate PM `term1$` -> CO `term1?`', function() {
		expect(polyglot.translate('term1$', 'cochrane')).to.equal('term1?');
	});

	it('translate PM `term1$` -> EM `term1?`', function() {
		expect(polyglot.translate('term1$', 'embase')).to.equal('term1?');
	});

	it('translate PM `term1$` -> CI `term1#`', function() {
		expect(polyglot.translate('term1$', 'cinahl')).to.equal('term1#');
	});

	it('translate PM `term1$` -> PY `term1?`', function() {
		expect(polyglot.translate('term1$', 'psycinfo')).to.equal('term1?');
	});

	it('translate PM `term1$` -> SC `term1?`', function() {
		expect(polyglot.translate('term1$', 'scopus')).to.equal('"term1?"');
	});

	it('translate PM `term1$` -> WS `term1?`', function() {
		expect(polyglot.translate('term1$', 'wos')).to.equal('term1?');
	});

});
