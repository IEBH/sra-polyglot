var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate wildcards searches (multiple character "*" style)', ()=> {

	it('translate `term*` -> PM `term*`', ()=> {
		expect(polyglot.translate('term*', 'pubmed')).to.equal('term*');
	});

	it('translate `term*` -> OV `term*`', ()=> {
		expect(polyglot.translate('term*', 'ovid')).to.equal('term*');
	});

	it('translate `term*` -> CO `term*`', ()=> {
		expect(polyglot.translate('term*', 'cochrane')).to.equal('term*');
	});

	it('translate `term*` -> EM `term*`', ()=> {
		expect(polyglot.translate('term*', 'embase')).to.equal('term*');
	});

	it('translate `term*` -> CI `term*`', ()=> {
		expect(polyglot.translate('term*', 'cinahl')).to.equal('term*');
	});

	it('translate `term*` -> PY `term*`', ()=> {
		expect(polyglot.translate('term*', 'psycinfo')).to.equal('term*');
	});

	it('translate `term*` -> SC `term*`', ()=> {
		expect(polyglot.translate('term*', 'scopus')).to.equal('"term*"');
	});

	it('translate `term*` -> WS `term*`', ()=> {
		expect(polyglot.translate('term*', 'wos')).to.equal('term*');
	});

});

describe('Translate wildcards searches (single character "#" style)', ()=> {

	it('translate `term#` -> PM `term*`', ()=> {
		expect(polyglot.translate('term#', 'pubmed')).to.equal('"term<span msg="NO_SINGLE_WILDCARD">*</span>"');
	});

	it('translate `term#` -> OV `term#`', ()=> {
		expect(polyglot.translate('term#', 'ovid')).to.equal('term#');
	});

	it('translate `term#` -> CO `term*`', ()=> {
		expect(polyglot.translate('term#', 'cochrane')).to.equal('"term<span msg="NO_SINGLE_WILDCARD">*</span>"');
	});

	it('translate `term#` -> EM `term*`', ()=> {
		expect(polyglot.translate('term#', 'embase')).to.equal('"term<span msg="NO_SINGLE_WILDCARD">*</span>"');
	});

	it('translate `term#` -> CI `term*`', ()=> {
		expect(polyglot.translate('term#', 'cinahl')).to.equal('"term<span msg="NO_SINGLE_WILDCARD">*</span>"');
	});

	it('translate `term#` -> PY `term#`', ()=> {
		expect(polyglot.translate('term#', 'psycinfo')).to.equal('term#');
	});

	it('translate `term#` -> SC `term?`', ()=> {
		expect(polyglot.translate('term#', 'scopus')).to.equal('"term<span msg="NO_SINGLE_WILDCARD">?</span>"');
	});

	it('translate `term#` -> WS `term*`', ()=> {
		expect(polyglot.translate('term#', 'wos')).to.equal('"term<span msg="NO_SINGLE_WILDCARD">*</span>"');
	});

});

describe('Translate wildcards searches (single character PubMed "?" style)', ()=> {

	it('translate `term?` -> PM `term?`', ()=> {
		expect(polyglot.translate('term?', 'pubmed')).to.equal('term?');
	});

	it('translate `term?` -> OV `term?`', ()=> {
		expect(polyglot.translate('term?', 'ovid')).to.equal('term?');
	});

	it('translate `term?` -> CO `term?`', ()=> {
		expect(polyglot.translate('term?', 'cochrane')).to.equal('"term<span msg="NO_OPTIONAL_WILDCARD">?</span>"');
	});

	it('translate `term?` -> EM `term?`', ()=> {
		expect(polyglot.translate('term?', 'embase')).to.equal('"term<span msg="NO_OPTIONAL_WILDCARD">?</span>"');
	});

	it('translate `term?` -> CI `term#`', ()=> {
		expect(polyglot.translate('term?', 'cinahl')).to.equal('term#');
	});

	it('translate `term?` -> PY `term?`', ()=> {
		expect(polyglot.translate('term?', 'psycinfo')).to.equal('term?');
	});

	it('translate `term?` -> SC `term?`', ()=> {
		expect(polyglot.translate('term?', 'scopus')).to.equal('"term<span msg="NO_OPTIONAL_WILDCARD">?</span>"');
	});

	it('translate `term?` -> WS `term$`', ()=> {
		expect(polyglot.translate('term?', 'wos')).to.equal('term$');
	});

});

describe('Translate wildcards searches (single character Ovid "$" style)', ()=> {

	it('translate `term$` -> PM `term?`', ()=> {
		expect(polyglot.translate('term$', 'pubmed')).to.equal('term?');
	});

	it('translate `term$` -> OV `term?`', ()=> {
		expect(polyglot.translate('term$', 'ovid')).to.equal('term?');
	});

	it('translate `term$` -> CO `term?`', ()=> {
		expect(polyglot.translate('term$', 'cochrane')).to.equal('"term<span msg="NO_OPTIONAL_WILDCARD">?</span>"');
	});

	it('translate `term$` -> EM `term?`', ()=> {
		expect(polyglot.translate('term$', 'embase')).to.equal('"term<span msg="NO_OPTIONAL_WILDCARD">?</span>"');
	});

	it('translate `term$` -> CI `term#`', ()=> {
		expect(polyglot.translate('term$', 'cinahl')).to.equal('term#');
	});

	it('translate `term$` -> PY `term?`', ()=> {
		expect(polyglot.translate('term$', 'psycinfo')).to.equal('term?');
	});

	it('translate `term$` -> SC `term?`', ()=> {
		expect(polyglot.translate('term$', 'scopus')).to.equal('"term<span msg="NO_OPTIONAL_WILDCARD">?</span>"');
	});

	it('translate `term$` -> WS `term?`', ()=> {
		expect(polyglot.translate('term$', 'wos')).to.equal('term$');
	});

});
