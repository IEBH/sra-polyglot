var expect = require('chai').expect;
import polyglot from '../src';
describe('Translate wildcards searches (multiple character "*" style)', ()=> {

	it('translate `term*` -> PM `term*`', ()=> {
		expect(polyglot.translate('term*', 'pubmed')).to.equal('term*');
	});

	it('translate `term*` -> OV `term*`', ()=> {
		expect(polyglot.translate('term*', 'medlineOvid')).to.equal('term*');
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
		expect(polyglot.translate('term#', 'pubmed')).to.equal('term<span class="highlight" v-tooltip="\'No Single Wildcard for Pubmed\'">*</span>');
	});

	it('translate `term#` -> OV `term#`', ()=> {
		expect(polyglot.translate('term#', 'medlineOvid')).to.equal('term#');
	});

	it('translate `term#` -> CO `term#`', ()=> {
		expect(polyglot.translate('term#', 'cochrane')).to.equal('term#');
	});

	it('translate `term#` -> EM `term*`', ()=> {
		expect(polyglot.translate('term#', 'embase')).to.equal('term<span class="highlight" v-tooltip="\'No Single Wildcard for Embase\'">*</span>');
	});

	it('translate `term#` -> CI `term*`', ()=> {
		expect(polyglot.translate('term#', 'cinahl')).to.equal('term<span class="highlight" v-tooltip="\'No Single Wildcard for Cinahl\'">*</span>');
	});

	it('translate `term#` -> PY `term#`', ()=> {
		expect(polyglot.translate('term#', 'psycinfo')).to.equal('term#');
	});

	it('translate `term#` -> SC `term?`', ()=> {
		expect(polyglot.translate('term#', 'scopus')).to.equal('"term<span class="highlight" v-tooltip="\'Single Wildcard for Scopus is ?\'">?</span>"');
	});

	it('translate `term#` -> WS `term*`', ()=> {
		expect(polyglot.translate('term#', 'wos')).to.equal('term<span class="highlight" v-tooltip="\'No Single Wildcard for WoS\'">*</span>');
	});

});

describe('Translate wildcards searches (single character PubMed "?" style)', ()=> {

	it('translate `term?` -> PM `term?`', ()=> {
		expect(polyglot.translate('term?', 'pubmed')).to.equal('term?');
	});

	it('translate `term?` -> OV `term?`', ()=> {
		expect(polyglot.translate('term?', 'medlineOvid')).to.equal('term?');
	});

	it('translate `term?` -> CO `term?`', ()=> {
		expect(polyglot.translate('term?', 'cochrane')).to.equal('term?');
	});

	it('translate `term?` -> EM `term?`', ()=> {
		expect(polyglot.translate('term?', 'embase')).to.equal('term<span class="highlight" v-tooltip="\'No Optional Wildcard for Embase\'">?</span>');
	});

	it('translate `term?` -> CI `term#`', ()=> {
		expect(polyglot.translate('term?', 'cinahl')).to.equal('term#');
	});

	it('translate `term?` -> PY `term?`', ()=> {
		expect(polyglot.translate('term?', 'psycinfo')).to.equal('term?');
	});

	it('translate `term?` -> SC `term?`', ()=> {
		expect(polyglot.translate('term?', 'scopus')).to.equal('"term<span class="highlight" v-tooltip="\'No Optional Wildcard for Scopus\'">?</span>"');
	});

	it('translate `term?` -> WS `term*`', ()=> {
		expect(polyglot.translate('term?', 'wos')).to.equal('term*');
	});

});

describe('Translate wildcards searches (single character medlineOvid "$" style)', ()=> {

	it('translate `term$` -> PM `term*`', ()=> {
		expect(polyglot.translate('term$', 'pubmed')).to.equal('term*');
	});

	it('translate `term$` -> OV `term$`', ()=> {
		expect(polyglot.translate('term$', 'medlineOvid')).to.equal('term$');
	});

	it('translate `term$` -> CO `term?`', ()=> {
		expect(polyglot.translate('term$', 'cochrane')).to.equal('term<span class="highlight" v-tooltip="\'No Single Character Wildcard for Cochrane\'">?</span>');
	});

	it('translate `term$` -> EM `term*`', ()=> {
		expect(polyglot.translate('term$', 'embase')).to.equal('term<span class="highlight" v-tooltip="\'No Optional Wildcard for Embase\'">*</span>');
	});

	it('translate `term$` -> CI `term*`', ()=> {
		expect(polyglot.translate('term$', 'cinahl')).to.equal('term*');
	});

	it('translate `term$` -> PY `term*`', ()=> {
		expect(polyglot.translate('term$', 'psycinfo')).to.equal('term*');
	});

	it('translate `term$` -> SC `term*`', ()=> {
		expect(polyglot.translate('term$', 'scopus')).to.equal('"term<span class="highlight" v-tooltip="\'No Optional Wildcard for Scopus\'">*</span>"');
	});

	it('translate `term$` -> WS `term*`', ()=> {
		expect(polyglot.translate('term$', 'wos')).to.equal('term*');
	});

});
