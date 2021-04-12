var expect = require('chai').expect;
import polyglot from '../src';
describe('Translate MeSH major terms (PubMed -> *)', ()=> {

	it('translate `term[Majr]` -> PM `term[Majr]`', ()=> {
		expect(polyglot.translate('term[Majr]', 'pubmed')).to.equal('term[Majr]');
	});

	it('translate `term[Majr]` -> OV `exp *term/`', ()=> {
		expect(polyglot.translate('term[Majr]', 'medlineOvid')).to.equal('exp *term/');
	});

	it('translate `term[Majr]` -> CO `[mh term]`', ()=> {
		expect(polyglot.translate('term[Majr]', 'cochrane')).to.equal('[mh term]');
	});

	it('translate `term[Majr]` -> EM `term/exp/mj`', ()=> {
		expect(polyglot.translate('term[Majr]', 'embase')).to.equal("'term'/exp/mj");
	});

	it('translate `term[Majr]` -> CI `(MM term+)`', ()=> {
		expect(polyglot.translate('term[Majr]', 'cinahl')).to.equal('(MM "term+")');
	});

	it('translate `term[Majr]` -> PY `exp *term/`', ()=> {
		expect(polyglot.translate('term[Majr]', 'psycinfo')).to.equal('exp *term/');
	});

	it('translate `term[Majr]` -> SC `((INDEXTERMS("term"))`', ()=> {
		expect(polyglot.translate('term[Majr]', 'scopus')).to.equal('INDEXTERMS("term")');
	});

	it('translate `term[Majr]` -> WS `term`', ()=> {
		expect(polyglot.translate('term[Majr]', 'wos')).to.equal('term');
	});

});

describe('Translate Translate MeSH major terms (PubMed (long) -> *)', ()=> {

	it('translate `term[MeSH Major Topic]` -> PM `term[Majr]`', ()=> {
		expect(polyglot.translate('term[MeSH Major Topic]', 'pubmed')).to.equal('term[Majr]');
	});

	it('translate `term[MeSH Major Topic]` -> OV `exp *term/`', ()=> {
		expect(polyglot.translate('term[MeSH Major Topic]', 'medlineOvid')).to.equal('exp *term/');
	});

	it('translate `term[MeSH Major Topic]` -> CO `[mh term]`', ()=> {
		expect(polyglot.translate('term[MeSH Major Topic]', 'cochrane')).to.equal('[mh term]');
	});

	it('translate `term[MeSH Major Topic]` -> EM `term/exp/mj`', ()=> {
		expect(polyglot.translate('term[MeSH Major Topic]', 'embase')).to.equal("'term'/exp/mj");
	});

	it('translate `term[MeSH Major Topic]` -> CI `(MM term+)`', ()=> {
		expect(polyglot.translate('term[MeSH Major Topic]', 'cinahl')).to.equal('(MM "term+")');
	});

	it('translate `term[MeSH Major Topic]` -> PY `exp *term/`', ()=> {
		expect(polyglot.translate('term[MeSH Major Topic]', 'psycinfo')).to.equal('exp *term/');
	});

	it('translate `term[MeSH Major Topic]` -> SC `((INDEXTERMS("term"))`', ()=> {
		expect(polyglot.translate('term[MeSH Major Topic]', 'scopus')).to.equal('INDEXTERMS("term")');
	});

	it('translate `term[MeSH Major Topic]` -> WS `term`', ()=> {
		expect(polyglot.translate('term[MeSH Major Topic]', 'wos')).to.equal('term');
	});

});

describe('Translate Translate MeSH major terms (medlineOvid -> *)', ()=> {

	it('translate `exp *term/` -> PM `term[Majr]`', ()=> {
		expect(polyglot.translate('exp *term/', 'pubmed')).to.equal('term[Majr]');
	});

	it('translate `exp *term/` -> OV `exp *term/`', ()=> {
		expect(polyglot.translate('exp *term/', 'medlineOvid')).to.equal('exp *term/');
	});

	it('translate `termexp *term/` -> CO `[mh term]`', ()=> {
		expect(polyglot.translate('exp *term/', 'cochrane')).to.equal('[mh term]');
	});

	it('translate `exp *term/` -> EM `term/exp/mj`', ()=> {
		expect(polyglot.translate('exp *term/', 'embase')).to.equal("'term'/exp/mj");
	});

	it('translate `exp *term/` -> CI `(MM term+)`', ()=> {
		expect(polyglot.translate('exp *term/', 'cinahl')).to.equal('(MM "term+")');
	});

	it('translate `exp *term/` -> PY `exp *term/`', ()=> {
		expect(polyglot.translate('exp *term/', 'psycinfo')).to.equal('exp *term/');
	});

	it('translate `exp *term/` -> SC `((INDEXTERMS("term"))`', ()=> {
		expect(polyglot.translate('exp *term/', 'scopus')).to.equal('INDEXTERMS("term")');
	});

	it('translate `exp *term/` -> WS `term`', ()=> {
		expect(polyglot.translate('exp *term/', 'wos')).to.equal('term');
	});

});
