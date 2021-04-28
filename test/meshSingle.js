var expect = require('chai').expect;
import polyglot from '../src';
describe('Translate single MESH terms (PubMed -> *)', ()=> {

	it('translate `term[Mesh]` -> PM `term[Mesh]`', ()=> {
		expect(polyglot.translateGeneric('term[Mesh]', 'PubMed abbreviation')).to.equal('term[Mesh]');
	});

	it('translate `term[Mesh]` -> OV `exp term/`', ()=> {
		expect(polyglot.translateGeneric('term[Mesh]', 'Ovid MEDLINE')).to.equal('exp term/');
	});

	it('translate `term[Mesh]` -> CO `[mh term]`', ()=> {
		expect(polyglot.translateGeneric('term[Mesh]', 'Cochrane Library')).to.equal('[mh term]');
	});

	it('translate `term[Mesh]` -> EM `term/exp`', ()=> {
		expect(polyglot.translateGeneric('term[Mesh]', 'Embase (Elsevier)')).to.equal("'term'/exp");
	});

	it('translate `term[Mesh]` -> CI `(MH term+)`', ()=> {
		expect(polyglot.translateGeneric('term[Mesh]', 'CINAHL (Ebsco)')).to.equal('(MH "term+")');
	});

	it('translate `term[Mesh]` -> PY `term`', ()=> {
		expect(polyglot.translateGeneric('term[Mesh]', 'PsycInfo (Ovid)')).to.equal('term');
	});

	it('translate `term[Mesh]` -> SC `(MH term+)`', ()=> {
		expect(polyglot.translateGeneric('term[Mesh]', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term)');
	});

	it('translate `term[Mesh]` -> WS `term`', ()=> {
		expect(polyglot.translateGeneric('term[Mesh]', 'Web of Science')).to.equal('term');
	});

});

describe('Translate single MESH terms (PubMed (short) -> *)', ()=> {

	it('translate `term[mh]` -> PM `term[Mesh]`', ()=> {
		expect(polyglot.translateGeneric('term[mh]', 'PubMed abbreviation')).to.equal('term[Mesh]');
	});

	it('translate `term[mh]` -> OV `exp term/`', ()=> {
		expect(polyglot.translateGeneric('term[mh]', 'Ovid MEDLINE')).to.equal('exp term/');
	});

	it('translate `term[mh]` -> CO `[mh term]`', ()=> {
		expect(polyglot.translateGeneric('term[mh]', 'Cochrane Library')).to.equal('[mh term]');
	});

	it('translate `term[mh]` -> EM `term/exp`', ()=> {
		expect(polyglot.translateGeneric('term[mh]', 'Embase (Elsevier)')).to.equal("'term'/exp");
	});

	it('translate `term[mh]` -> CI `(MH term+)`', ()=> {
		expect(polyglot.translateGeneric('term[mh]', 'CINAHL (Ebsco)')).to.equal('(MH "term+")');
	});

	it('translate `term[mh]` -> PY `term`', ()=> {
		expect(polyglot.translateGeneric('term[mh]', 'PsycInfo (Ovid)')).to.equal('term');
	});

	it('translate `term[mh]` -> SC `(MH term+)`', ()=> {
		expect(polyglot.translateGeneric('term[mh]', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term)');
	});

	it('translate `term[mh]` -> WS `term`', ()=> {
		expect(polyglot.translateGeneric('term[mh]', 'Web of Science')).to.equal('term');
	});
	
});

describe('Translate single MESH terms (PubMed (long) -> *)', ()=> {

	it('translate `term[MeSH Terms]` -> PM `term[Mesh]`', ()=> {
		expect(polyglot.translateGeneric('term[MeSH Terms]', 'PubMed abbreviation')).to.equal('term[Mesh]');
	});

	it('translate `term[MeSH Terms]` -> OV `exp term/`', ()=> {
		expect(polyglot.translateGeneric('term[MeSH Terms]', 'Ovid MEDLINE')).to.equal('exp term/');
	});

	it('translate `term[MeSH Terms]` -> CO `[mh term]`', ()=> {
		expect(polyglot.translateGeneric('term[MeSH Terms]', 'Cochrane Library')).to.equal('[mh term]');
	});

	it('translate `term[MeSH Terms]` -> EM `term/exp`', ()=> {
		expect(polyglot.translateGeneric('term[MeSH Terms]', 'Embase (Elsevier)')).to.equal("'term'/exp");
	});

	it('translate `term[MeSH Terms]` -> CI `(MH term+)`', ()=> {
		expect(polyglot.translateGeneric('term[MeSH Terms]', 'CINAHL (Ebsco)')).to.equal('(MH "term+")');
	});

	it('translate `term[MeSH Terms]` -> PY `term`', ()=> {
		expect(polyglot.translateGeneric('term[MeSH Terms]', 'PsycInfo (Ovid)')).to.equal('term');
	});

	it('translate `term[MeSH Terms]` -> SC `(MH term+)`', ()=> {
		expect(polyglot.translateGeneric('term[MeSH Terms]', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term)');
	});

	it('translate `term[MeSH Terms]` -> WS `term`', ()=> {
		expect(polyglot.translateGeneric('term[MeSH Terms]', 'Web of Science')).to.equal('term');
	});

});

describe('Translate single MESH terms (Ovid MEDLINE -> *)', ()=> {

	it('translate `exp term/` -> PM `term[Mesh]`', ()=> {
		expect(polyglot.translateGeneric('exp term/', 'PubMed abbreviation')).to.equal('term[Mesh]');
	});

	it('translate `exp term/` -> OV `exp term/`', ()=> {
		expect(polyglot.translateGeneric('exp term/', 'Ovid MEDLINE')).to.equal('exp term/');
	});

	it('translate `exp term/` -> CO `[mh term]`', ()=> {
		expect(polyglot.translateGeneric('exp term/', 'Cochrane Library')).to.equal('[mh term]');
	});

	it('translate `exp term/` -> EM `term/exp`', ()=> {
		expect(polyglot.translateGeneric('exp term/', 'Embase (Elsevier)')).to.equal("'term'/exp");
	});

	it('translate `exp term/` -> CI `(MH term+)`', ()=> {
		expect(polyglot.translateGeneric('exp term/', 'CINAHL (Ebsco)')).to.equal('(MH "term+")');
	});

	it('translate `exp term/` -> PY `term`', ()=> {
		expect(polyglot.translateGeneric('exp term/', 'PsycInfo (Ovid)')).to.equal('term');
	});

	it('translate `exp term/` -> SC `(MH term+)`', ()=> {
		expect(polyglot.translateGeneric('exp term/', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term)');
	});

	it('translate `exp term/` -> WS `term`', ()=> {
		expect(polyglot.translateGeneric('exp term/', 'Web of Science')).to.equal('term');
	});

});
