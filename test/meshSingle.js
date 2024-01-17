var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Translate single MESH terms (PubMed -> *)', ()=> {

	it('translate `term[Mesh]` -> PM `term[Mesh]`', ()=> {
		expect(polyglot.translate('term[Mesh]', 'PubMed abbreviation')).to.equal('term[Mesh]');
	});

	it('translate `term[Mesh]` -> OV `exp term/`', ()=> {
		expect(polyglot.translate('term[Mesh]', 'Ovid MEDLINE')).to.equal('exp term/');
	});

	it('translate `term[Mesh]` -> CO `[mh term]`', ()=> {
		expect(polyglot.translate('term[Mesh]', 'Cochrane Library')).to.equal('[mh term]');
	});

	it('translate `term[Mesh]` -> EM `term/exp`', ()=> {
		expect(polyglot.translate('term[Mesh]', 'Embase (Elsevier)')).to.equal("term/exp");
	});

	it('translate `term[Mesh]` -> CI `(MH term+)`', ()=> {
		expect(polyglot.translate('term[Mesh]', 'CINAHL (Ebsco)')).to.equal('(MH term+)');
	});

	it('translate `term[Mesh]` -> PY `term`', ()=> {
		expect(polyglot.translate('term[Mesh]', 'PsycInfo (Ovid)')).to.equal('exp term/');
	});

	it('translate `term[Mesh]` -> SC `(MH term+)`', ()=> {
		expect(polyglot.translate('term[Mesh]', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term)');
	});

	it('translate `term[Mesh]` -> WS `term`', ()=> {
		expect(polyglot.translate('term[Mesh]', 'Web of Science')).to.equal('term');
	});

	//International HTA Database
	it('translate `term[Mesh]` -> HTA `"term"[mhe]`', ()=>{
		expect(polyglot.translate('term[Mesh]', 'International HTA Database')).to.equal('"term"[mhe]');
	});

	// PsycInfo (Ebsco)
	it('translate `term[Mesh]` -> PYE `(MH term+)`', ()=> {
		expect(polyglot.translate('term[Mesh]', 'PsycInfo (Ebsco)')).to.equal('(MH term+)');
	});

});

describe('Translate single MESH terms (PubMed (short) -> *)', ()=> {

	it('translate `term[mh]` -> PM `term[Mesh]`', ()=> {
		expect(polyglot.translate('term[mh]', 'PubMed abbreviation')).to.equal('term[Mesh]');
	});

	it('translate `term[mh]` -> OV `exp term/`', ()=> {
		expect(polyglot.translate('term[mh]', 'Ovid MEDLINE')).to.equal('exp term/');
	});

	it('translate `term[mh]` -> CO `[mh term]`', ()=> {
		expect(polyglot.translate('term[mh]', 'Cochrane Library')).to.equal('[mh term]');
	});

	it('translate `term[mh]` -> EM `term/exp`', ()=> {
		expect(polyglot.translate('term[mh]', 'Embase (Elsevier)')).to.equal("term/exp");
	});

	it('translate `term[mh]` -> CI `(MH term+)`', ()=> {
		expect(polyglot.translate('term[mh]', 'CINAHL (Ebsco)')).to.equal('(MH term+)');
	});

	it('translate `term[mh]` -> PY `term`', ()=> {
		expect(polyglot.translate('term[mh]', 'PsycInfo (Ovid)')).to.equal('exp term/');
	});

	it('translate `term[mh]` -> SC `(MH term+)`', ()=> {
		expect(polyglot.translate('term[mh]', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term)');
	});

	it('translate `term[mh]` -> WS `term`', ()=> {
		expect(polyglot.translate('term[mh]', 'Web of Science')).to.equal('term');
	});

	//International HTA Database
	it('translate `term[mh]` -> HTA `"term"[mhe]`', ()=>{
		expect(polyglot.translate('term[mh]', 'International HTA Database')).to.equal('"term"[mhe]');
	});

	// PsycInfo (Ebsco)
	it('translate `term[mh]` -> PYE `(MH term+)`', ()=> {
		expect(polyglot.translate('term[mh]', 'PsycInfo (Ebsco)')).to.equal('(MH term+)');
	});
	
});

describe('Translate single MESH terms (PubMed (long) -> *)', ()=> {

	it('translate `term[MeSH Terms]` -> PM `term[Mesh]`', ()=> {
		expect(polyglot.translate('term[MeSH Terms]', 'PubMed abbreviation')).to.equal('term[Mesh]');
	});

	it('translate `term[MeSH Terms]` -> OV `exp term/`', ()=> {
		expect(polyglot.translate('term[MeSH Terms]', 'Ovid MEDLINE')).to.equal('exp term/');
	});

	it('translate `term[MeSH Terms]` -> CO `[mh term]`', ()=> {
		expect(polyglot.translate('term[MeSH Terms]', 'Cochrane Library')).to.equal('[mh term]');
	});

	it('translate `term[MeSH Terms]` -> EM `term/exp`', ()=> {
		expect(polyglot.translate('term[MeSH Terms]', 'Embase (Elsevier)')).to.equal("term/exp");
	});

	it('translate `term[MeSH Terms]` -> CI `(MH term+)`', ()=> {
		expect(polyglot.translate('term[MeSH Terms]', 'CINAHL (Ebsco)')).to.equal('(MH term+)');
	});

	it('translate `term[MeSH Terms]` -> PY `term`', ()=> {
		expect(polyglot.translate('term[MeSH Terms]', 'PsycInfo (Ovid)')).to.equal('exp term/');
	});

	it('translate `term[MeSH Terms]` -> SC `(MH term+)`', ()=> {
		expect(polyglot.translate('term[MeSH Terms]', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term)');
	});

	it('translate `term[MeSH Terms]` -> WS `term`', ()=> {
		expect(polyglot.translate('term[MeSH Terms]', 'Web of Science')).to.equal('term');
	});

	//International HTA Database
	it('translate `term[MeSH Terms]` -> HTA `"term"[mhe]`', ()=>{
		expect(polyglot.translate('term[MeSH Terms]', 'International HTA Database')).to.equal('"term"[mhe]');
	});

	// PsycInfo (Ebsco)
	it('translate `term[MeSH Terms]` -> PYE `(MH term+)`', ()=> {
		expect(polyglot.translate('term[MeSH Terms]', 'PsycInfo (Ebsco)')).to.equal('(MH term+)');
	});

});

describe('Translate single MESH terms (Ovid MEDLINE -> *)', ()=> {

	it('translate `exp term/` -> PM `term[Mesh]`', ()=> {
		expect(polyglot.translate('exp term/', 'PubMed abbreviation')).to.equal('term[Mesh]');
	});

	it('translate `exp term/` -> OV `exp term/`', ()=> {
		expect(polyglot.translate('exp term/', 'Ovid MEDLINE')).to.equal('exp term/');
	});

	it('translate `exp term/` -> CO `[mh term]`', ()=> {
		expect(polyglot.translate('exp term/', 'Cochrane Library')).to.equal('[mh term]');
	});

	it('translate `exp term/` -> EM `term/exp`', ()=> {
		expect(polyglot.translate('exp term/', 'Embase (Elsevier)')).to.equal("term/exp");
	});

	it('translate `exp term/` -> CI `(MH term+)`', ()=> {
		expect(polyglot.translate('exp term/', 'CINAHL (Ebsco)')).to.equal('(MH term+)');
	});

	it('translate `exp term/` -> PY `term`', ()=> {
		expect(polyglot.translate('exp term/', 'PsycInfo (Ovid)')).to.equal('exp term/');
	});

	it('translate `exp term/` -> SC `(MH term+)`', ()=> {
		expect(polyglot.translate('exp term/', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term)');
	});

	it('translate `exp term/` -> WS `term`', ()=> {
		expect(polyglot.translate('exp term/', 'Web of Science')).to.equal('term');
	});

	//International HTA Database
	it('translate `exp term/` -> HTA `"term"[mhe]`', ()=>{
		expect(polyglot.translate('exp term/', 'International HTA Database')).to.equal('"term"[mhe]');
	});

	// PsycInfo (Ebsco)
	it('translate `exp term/` -> PYE `(MH term+)`', ()=> {
		expect(polyglot.translate('exp term/', 'PsycInfo (Ebsco)')).to.equal('(MH term+)');
	});

});
