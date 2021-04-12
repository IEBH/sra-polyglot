var expect = require('chai').expect;
import polyglot from '../src';
describe('Translate multiple MESH terms (PubMed -> *)', ()=> {

	it('translate `"term1 term2"[Mesh]` -> PM `"term1 term2"[Mesh]`', ()=> {
		expect(polyglot.translate('"term1 term2"[Mesh]', 'pubmed')).to.equal('"term1 term2"[Mesh]');
		expect(polyglot.translate('"term1 and term2"[Mesh]', 'pubmed')).to.equal('"term1 and term2"[Mesh]');
	});

	it('translate `"term1 term2"[Mesh]` -> OV `exp term1 term2/`', ()=> {
		expect(polyglot.translate('"term1 term2"[Mesh]', 'medlineOvid')).to.equal('exp term1 term2/');
		expect(polyglot.translate('"term1 and term2"[Mesh]', 'medlineOvid')).to.equal('exp term1 and term2/');
	});

	it('translate `"term1 term2"[Mesh]` -> CO `[mh "term1 term2"]`', ()=> {
		expect(polyglot.translate('"term1 term2"[Mesh]', 'cochrane')).to.equal('[mh "term1 term2"]');
		expect(polyglot.translate('"term1 and term2"[Mesh]', 'cochrane')).to.equal('[mh "term1 and term2"]');
	});

	it('translate `"term1 term2"[Mesh]` -> EM `"term1 term2"/exp`', ()=> {
		expect(polyglot.translate('"term1 term2"[Mesh]', 'embase')).to.equal("'term1 term2'/exp");
		expect(polyglot.translate('"term1 and term2"[Mesh]', 'embase')).to.equal("'term1 and term2'/exp");
	});

	it('translate `"term1 term2"[Mesh]` -> CI `(MH "term1 term2+")`', ()=> {
		expect(polyglot.translate('"term1 term2"[Mesh]', 'cinahl')).to.equal('(MH "term1 term2+")');
		expect(polyglot.translate('"term1 and term2"[Mesh]', 'cinahl')).to.equal('(MH "term1 and term2+")');
	});

	it('translate `"term1 term2"[Mesh]` -> PY `"term1 term2"`', ()=> {
		expect(polyglot.translate('"term1 term2"[Mesh]', 'psycinfo')).to.equal('"term1 term2"');
		expect(polyglot.translate('"term1 and term2"[Mesh]', 'psycinfo')).to.equal('"term1 and term2"');
	});

	it('translate `"term1 term2"[Mesh]` -> SC `INDEXTERMS(term1 term2)`', ()=> {
		expect(polyglot.translate('"term1 term2"[Mesh]', 'scopus')).to.equal('INDEXTERMS("term1 term2")');
		expect(polyglot.translate('"term1 and term2"[Mesh]', 'scopus')).to.equal('INDEXTERMS("term1 and term2")');
	});

	it('translate `"term1 term2"[Mesh]` -> WS `"term1 term2"`', ()=> {
		expect(polyglot.translate('"term1 term2"[Mesh]', 'wos')).to.equal('"term1 term2"');
		expect(polyglot.translate('"term1 and term2"[Mesh]', 'wos')).to.equal('"term1 and term2"');
	});

});

describe('Translate multiple MESH terms (PubMed (short) -> *)', ()=> {

	it('translate `"term1 term2"[mh]` -> PM `"term1 term2"[Mesh]`', ()=> {
		expect(polyglot.translate('"term1 term2"[mh]', 'pubmed')).to.equal('"term1 term2"[Mesh]');
		expect(polyglot.translate('"term1 and term2"[mh]', 'pubmed')).to.equal('"term1 and term2"[Mesh]');
	});

	it('translate `"term1 term2"[mh]` -> OV `exp term1 term2/`', ()=> {
		expect(polyglot.translate('"term1 term2"[mh]', 'medlineOvid')).to.equal('exp term1 term2/');
		expect(polyglot.translate('"term1 and term2"[mh]', 'medlineOvid')).to.equal('exp term1 and term2/');
	});

	it('translate `"term1 term2"[mh]` -> CO `[mh "term1 term2"]`', ()=> {
		expect(polyglot.translate('"term1 term2"[mh]', 'cochrane')).to.equal('[mh "term1 term2"]');
		expect(polyglot.translate('"term1 and term2"[mh]', 'cochrane')).to.equal('[mh "term1 and term2"]');
	});

	it('translate `"term1 term2"[mh]` -> EM `"term1 term2"/exp`', ()=> {
		expect(polyglot.translate('"term1 term2"[mh]', 'embase')).to.equal("'term1 term2'/exp");
		expect(polyglot.translate('"term1 and term2"[mh]', 'embase')).to.equal("'term1 and term2'/exp");
	});

	it('translate `"term1 term2"[mh]` -> CI `(MH "term1 term2+")`', ()=> {
		expect(polyglot.translate('"term1 term2"[mh]', 'cinahl')).to.equal('(MH "term1 term2+")');
		expect(polyglot.translate('"term1 and term2"[mh]', 'cinahl')).to.equal('(MH "term1 and term2+")');
	});

	it('translate `"term1 term2"[mh]` -> PY `"term1 term2"`', ()=> {
		expect(polyglot.translate('"term1 term2"[mh]', 'psycinfo')).to.equal('"term1 term2"');
		expect(polyglot.translate('"term1 and term2"[mh]', 'psycinfo')).to.equal('"term1 and term2"');
	});

	it('translate `"term1 term2"[mh]` -> SC `INDEXTERMS(term1 term2)`', ()=> {
		expect(polyglot.translate('"term1 term2"[mh]', 'scopus')).to.equal('INDEXTERMS("term1 term2")');
		expect(polyglot.translate('"term1 and term2"[mh]', 'scopus')).to.equal('INDEXTERMS("term1 and term2")');
	});

	it('translate `"term1 term2"[mh]` -> WS `"term1 term2"`', ()=> {
		expect(polyglot.translate('"term1 term2"[mh]', 'wos')).to.equal('"term1 term2"');
		expect(polyglot.translate('"term1 and term2"[mh]', 'wos')).to.equal('"term1 and term2"');
	});

});

describe('Translate multiple MESH terms (PubMed (long) -> *)', ()=> {

	it('translate `"term1 term2"[MeSH Terms]` -> PM `"term1 term2"[Mesh]`', ()=> {
		expect(polyglot.translate('"term1 term2"[MeSH Terms]', 'pubmed')).to.equal('"term1 term2"[Mesh]');
		expect(polyglot.translate('"term1 and term2"[MeSH Terms]', 'pubmed')).to.equal('"term1 and term2"[Mesh]');
	});

	it('translate `"term1 term2"[MeSH Terms]` -> OV `exp term1 term2/`', ()=> {
		expect(polyglot.translate('"term1 term2"[MeSH Terms]', 'medlineOvid')).to.equal('exp term1 term2/');
		expect(polyglot.translate('"term1 and term2"[MeSH Terms]', 'medlineOvid')).to.equal('exp term1 and term2/');
	});

	it('translate `"term1 term2"[MeSH Terms]` -> CO `[mh "term1 term2"]`', ()=> {
		expect(polyglot.translate('"term1 term2"[MeSH Terms]', 'cochrane')).to.equal('[mh "term1 term2"]');
		expect(polyglot.translate('"term1 and term2"[MeSH Terms]', 'cochrane')).to.equal('[mh "term1 and term2"]');
	});

	it('translate `"term1 term2"[MeSH Terms]` -> EM `"term1 term2"/exp`', ()=> {
		expect(polyglot.translate('"term1 term2"[MeSH Terms]', 'embase')).to.equal("'term1 term2'/exp");
		expect(polyglot.translate('"term1 and term2"[MeSH Terms]', 'embase')).to.equal("'term1 and term2'/exp");
	});

	it('translate `"term1 term2"[MeSH Terms]` -> CI `(MH "term1 term2+")`', ()=> {
		expect(polyglot.translate('"term1 term2"[MeSH Terms]', 'cinahl')).to.equal('(MH "term1 term2+")');
		expect(polyglot.translate('"term1 and term2"[MeSH Terms]', 'cinahl')).to.equal('(MH "term1 and term2+")');
	});

	it('translate `"term1 term2"[MeSH Terms]` -> PY `"term1 term2"`', ()=> {
		expect(polyglot.translate('"term1 term2"[MeSH Terms]', 'psycinfo')).to.equal('"term1 term2"');
		expect(polyglot.translate('"term1 and term2"[MeSH Terms]', 'psycinfo')).to.equal('"term1 and term2"');
	});

	it('translate `"term1 term2"[MeSH Terms]` -> SC `INDEXTERMS(term1 term2)`', ()=> {
		expect(polyglot.translate('"term1 term2"[MeSH Terms]', 'scopus')).to.equal('INDEXTERMS("term1 term2")');
		expect(polyglot.translate('"term1 and term2"[MeSH Terms]', 'scopus')).to.equal('INDEXTERMS("term1 and term2")');
	});

	it('translate `"term1 term2"[MeSH Terms]` -> WS `"term1 term2"`', ()=> {
		expect(polyglot.translate('"term1 term2"[MeSH Terms]', 'wos')).to.equal('"term1 term2"');
		expect(polyglot.translate('"term1 and term2"[MeSH Terms]', 'wos')).to.equal('"term1 and term2"');
	});

});

describe('Translate multiple MESH terms (medlineOvid -> *)', ()=> {

	it('translate `exp term1 term2/` -> PM `"term1 term2"[Mesh]`', ()=> {
		expect(polyglot.translate('exp term1 term2/', 'pubmed')).to.equal('"term1 term2"[Mesh]');
		expect(polyglot.translate('exp term1 and term2/', 'pubmed')).to.equal('"term1 and term2"[Mesh]');
		expect(polyglot.translate('exp "term1 and term2"/', 'pubmed')).to.equal('"term1 and term2"[Mesh]');
	});

	it('translate `exp term1 term2/` -> OV `exp term1 term2/`', ()=> {
		expect(polyglot.translate('exp term1 term2/', 'medlineOvid')).to.equal('exp term1 term2/');
		expect(polyglot.translate('exp term1 and term2/', 'medlineOvid')).to.equal('exp term1 and term2/');
		expect(polyglot.translate('exp "term1 and term2"/', 'medlineOvid')).to.equal('exp term1 and term2/');
	});

	it('translate `exp term1 term2/` -> CO `[mh "term1 term2"]`', ()=> {
		expect(polyglot.translate('exp term1 term2/', 'cochrane')).to.equal('[mh "term1 term2"]');
		expect(polyglot.translate('exp term1 and term2/', 'cochrane')).to.equal('[mh "term1 and term2"]');
		expect(polyglot.translate('exp "term1 and term2"/', 'cochrane')).to.equal('[mh "term1 and term2"]');
	});

	it('translate `exp term1 term2/` -> EM `"term1 term2"/exp`', ()=> {
		expect(polyglot.translate('exp term1 term2/', 'embase')).to.equal("'term1 term2'/exp");
		expect(polyglot.translate('exp term1 and term2/', 'embase')).to.equal("'term1 and term2'/exp");
		expect(polyglot.translate('exp "term1 and term2"/', 'embase')).to.equal("'term1 and term2'/exp");
	});

	it('translate `exp term1 term2/` -> CI `(MH "term1 term2+")`', ()=> {
		expect(polyglot.translate('exp term1 term2/', 'cinahl')).to.equal('(MH "term1 term2+")');
		expect(polyglot.translate('exp term1 and term2/', 'cinahl')).to.equal('(MH "term1 and term2+")');
		expect(polyglot.translate('exp "term1 and term2"/', 'cinahl')).to.equal('(MH "term1 and term2+")');
	});

	it('translate `exp term1 term2/` -> PY `"term1 term2"`', ()=> {
		expect(polyglot.translate('exp term1 term2/', 'psycinfo')).to.equal('"term1 term2"');
		expect(polyglot.translate('exp term1 and term2/', 'psycinfo')).to.equal('"term1 and term2"');
		expect(polyglot.translate('exp "term1 and term2"/', 'psycinfo')).to.equal('"term1 and term2"');
	});

	it('translate `exp term1 term2/` -> SC `INDEXTERMS(term1 term2)`', ()=> {
		expect(polyglot.translate('exp term1 term2/', 'scopus')).to.equal('INDEXTERMS("term1 term2")');
		expect(polyglot.translate('exp term1 and term2/', 'scopus')).to.equal('INDEXTERMS("term1 and term2")');
		expect(polyglot.translate('exp "term1 and term2"/', 'scopus')).to.equal('INDEXTERMS("term1 and term2")');
	});

	it('translate `exp term1 term2/` -> WS `"term1 term2"`', ()=> {
		expect(polyglot.translate('exp term1 term2/', 'wos')).to.equal('"term1 term2"');
		expect(polyglot.translate('exp term1 and term2/', 'wos')).to.equal('"term1 and term2"');
		expect(polyglot.translate('exp "term1 and term2"/', 'wos')).to.equal('"term1 and term2"');
	});

});
