var expect = require('chai').expect;
import polyglot from '../src';
describe('Translate single MESH terms (PubMed -> *)', ()=> {

	it('translate `term[Mesh]` -> PM `term[Mesh]`', ()=> {
		expect(polyglot.translate('term[Mesh]', 'pubmed')).to.equal('term[Mesh]');
	});

	it('translate `term[Mesh]` -> OV `exp term/`', ()=> {
		expect(polyglot.translate('term[Mesh]', 'ovid')).to.equal('exp term/');
	});

	it('translate `term[Mesh]` -> CO `[mh term]`', ()=> {
		expect(polyglot.translate('term[Mesh]', 'cochrane')).to.equal('[mh term]');
	});

	it('translate `term[Mesh]` -> EM `term/exp`', ()=> {
		expect(polyglot.translate('term[Mesh]', 'embase')).to.equal("'term'/exp");
	});

	it('translate `term[Mesh]` -> CI `(MH term+)`', ()=> {
		expect(polyglot.translate('term[Mesh]', 'cinahl')).to.equal('(MH "term+")');
	});

	it('translate `term[Mesh]` -> PY `term`', ()=> {
		expect(polyglot.translate('term[Mesh]', 'psycinfo')).to.equal('term');
	});

	it('translate `term[Mesh]` -> SC `(MH term+)`', ()=> {
		expect(polyglot.translate('term[Mesh]', 'scopus')).to.equal('INDEXTERMS("term")');
	});

	it('translate `term[Mesh]` -> WS `term`', ()=> {
		expect(polyglot.translate('term[Mesh]', 'wos')).to.equal('term');
	});

});

describe('Translate single MESH terms (PubMed (short) -> *)', ()=> {

	it('translate `term[mh]` -> PM `term[Mesh]`', ()=> {
		expect(polyglot.translate('term[mh]', 'pubmed')).to.equal('term[Mesh]');
	});

	it('translate `term[mh]` -> OV `exp term/`', ()=> {
		expect(polyglot.translate('term[mh]', 'ovid')).to.equal('exp term/');
	});

	it('translate `term[mh]` -> CO `[mh term]`', ()=> {
		expect(polyglot.translate('term[mh]', 'cochrane')).to.equal('[mh term]');
	});

	it('translate `term[mh]` -> EM `term/exp`', ()=> {
		expect(polyglot.translate('term[mh]', 'embase')).to.equal("'term'/exp");
	});

	it('translate `term[mh]` -> CI `(MH term+)`', ()=> {
		expect(polyglot.translate('term[mh]', 'cinahl')).to.equal('(MH "term+")');
	});

	it('translate `term[mh]` -> PY `term`', ()=> {
		expect(polyglot.translate('term[mh]', 'psycinfo')).to.equal('term');
	});

	it('translate `term[mh]` -> SC `(MH term+)`', ()=> {
		expect(polyglot.translate('term[mh]', 'scopus')).to.equal('INDEXTERMS("term")');
	});

	it('translate `term[mh]` -> WS `term`', ()=> {
		expect(polyglot.translate('term[mh]', 'wos')).to.equal('term');
	});
	
});

describe('Translate single MESH terms (PubMed (long) -> *)', ()=> {

	it('translate `term[MeSH Terms]` -> PM `term[Mesh]`', ()=> {
		expect(polyglot.translate('term[MeSH Terms]', 'pubmed')).to.equal('term[Mesh]');
	});

	it('translate `term[MeSH Terms]` -> OV `exp term/`', ()=> {
		expect(polyglot.translate('term[MeSH Terms]', 'ovid')).to.equal('exp term/');
	});

	it('translate `term[MeSH Terms]` -> CO `[mh term]`', ()=> {
		expect(polyglot.translate('term[MeSH Terms]', 'cochrane')).to.equal('[mh term]');
	});

	it('translate `term[MeSH Terms]` -> EM `term/exp`', ()=> {
		expect(polyglot.translate('term[MeSH Terms]', 'embase')).to.equal("'term'/exp");
	});

	it('translate `term[MeSH Terms]` -> CI `(MH term+)`', ()=> {
		expect(polyglot.translate('term[MeSH Terms]', 'cinahl')).to.equal('(MH "term+")');
	});

	it('translate `term[MeSH Terms]` -> PY `term`', ()=> {
		expect(polyglot.translate('term[MeSH Terms]', 'psycinfo')).to.equal('term');
	});

	it('translate `term[MeSH Terms]` -> SC `(MH term+)`', ()=> {
		expect(polyglot.translate('term[MeSH Terms]', 'scopus')).to.equal('INDEXTERMS("term")');
	});

	it('translate `term[MeSH Terms]` -> WS `term`', ()=> {
		expect(polyglot.translate('term[MeSH Terms]', 'wos')).to.equal('term');
	});

});

describe('Translate single MESH terms (Ovid -> *)', ()=> {

	it('translate `exp term/` -> PM `term[Mesh]`', ()=> {
		expect(polyglot.translate('exp term/', 'pubmed')).to.equal('term[Mesh]');
	});

	it('translate `exp term/` -> OV `exp term/`', ()=> {
		expect(polyglot.translate('exp term/', 'ovid')).to.equal('exp term/');
	});

	it('translate `exp term/` -> CO `[mh term]`', ()=> {
		expect(polyglot.translate('exp term/', 'cochrane')).to.equal('[mh term]');
	});

	it('translate `exp term/` -> EM `term/exp`', ()=> {
		expect(polyglot.translate('exp term/', 'embase')).to.equal("'term'/exp");
	});

	it('translate `exp term/` -> CI `(MH term+)`', ()=> {
		expect(polyglot.translate('exp term/', 'cinahl')).to.equal('(MH "term+")');
	});

	it('translate `exp term/` -> PY `term`', ()=> {
		expect(polyglot.translate('exp term/', 'psycinfo')).to.equal('term');
	});

	it('translate `exp term/` -> SC `(MH term+)`', ()=> {
		expect(polyglot.translate('exp term/', 'scopus')).to.equal('INDEXTERMS("term")');
	});

	it('translate `exp term/` -> WS `term`', ()=> {
		expect(polyglot.translate('exp term/', 'wos')).to.equal('term');
	});

});
