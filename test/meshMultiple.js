var expect = require('chai').expect;
import polyglot from '../src';
describe('Translate multiple MESH terms (PubMed -> *)', ()=> {

	it('translate `"term1 term2"[Mesh]` -> PM `"term1 term2"[Mesh]`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[Mesh]', 'PubMed abbreviation')).to.equal('"term1 term2"[Mesh]');
		expect(polyglot.translateGeneric('"term1 and term2"[Mesh]', 'PubMed abbreviation')).to.equal('"term1 and term2"[Mesh]');
	});

	it('translate `"term1 term2"[Mesh]` -> OV `exp term1 term2/`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[Mesh]', 'Ovid MEDLINE')).to.equal('exp term1 term2/');
		expect(polyglot.translateGeneric('"term1 and term2"[Mesh]', 'Ovid MEDLINE')).to.equal('exp term1 and term2/');
	});

	it('translate `"term1 term2"[Mesh]` -> CO `[mh "term1 term2"]`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[Mesh]', 'Cochrane Library')).to.equal('[mh "term1 term2"]');
		expect(polyglot.translateGeneric('"term1 and term2"[Mesh]', 'Cochrane Library')).to.equal('[mh "term1 and term2"]');
	});

	it('translate `"term1 term2"[Mesh]` -> EM `"term1 term2"/exp`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[Mesh]', 'Embase (Elsevier)')).to.equal("'term1 term2'/exp");
		expect(polyglot.translateGeneric('"term1 and term2"[Mesh]', 'Embase (Elsevier)')).to.equal("'term1 and term2'/exp");
	});

	it('translate `"term1 term2"[Mesh]` -> CI `(MH "term1 term2+")`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[Mesh]', 'CINAHL (Ebsco)')).to.equal('(MH "term1 term2+")');
		expect(polyglot.translateGeneric('"term1 and term2"[Mesh]', 'CINAHL (Ebsco)')).to.equal('(MH "term1 and term2+")');
	});

	it('translate `"term1 term2"[Mesh]` -> PY `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[Mesh]', 'PsycInfo (Ovid)')).to.equal('"term1 term2"');
		expect(polyglot.translateGeneric('"term1 and term2"[Mesh]', 'PsycInfo (Ovid)')).to.equal('"term1 and term2"');
	});

	it('translate `"term1 term2"[Mesh]` -> SC `INDEXTERMS(term1 term2)`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[Mesh]', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term1 term2")');
		expect(polyglot.translateGeneric('"term1 and term2"[Mesh]', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term1 and term2)');
	});

	it('translate `"term1 term2"[Mesh]` -> WS `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[Mesh]', 'Web of Science')).to.equal('"term1 term2"');
		expect(polyglot.translateGeneric('"term1 and term2"[Mesh]', 'Web of Science')).to.equal('"term1 and term2"');
	});

});

describe('Translate multiple MESH terms (PubMed (short) -> *)', ()=> {

	it('translate `"term1 term2"[mh]` -> PM `"term1 term2"[Mesh]`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[mh]', 'PubMed abbreviation')).to.equal('"term1 term2"[Mesh]');
		expect(polyglot.translateGeneric('"term1 and term2"[mh]', 'PubMed abbreviation')).to.equal('"term1 and term2"[Mesh]');
	});

	it('translate `"term1 term2"[mh]` -> OV `exp term1 term2/`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[mh]', 'Ovid MEDLINE')).to.equal('exp term1 term2/');
		expect(polyglot.translateGeneric('"term1 and term2"[mh]', 'Ovid MEDLINE')).to.equal('exp term1 and term2/');
	});

	it('translate `"term1 term2"[mh]` -> CO `[mh "term1 term2"]`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[mh]', 'Cochrane Library')).to.equal('[mh "term1 term2"]');
		expect(polyglot.translateGeneric('"term1 and term2"[mh]', 'Cochrane Library')).to.equal('[mh "term1 and term2"]');
	});

	it('translate `"term1 term2"[mh]` -> EM `"term1 term2"/exp`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[mh]', 'Embase (Elsevier)')).to.equal("'term1 term2'/exp");
		expect(polyglot.translateGeneric('"term1 and term2"[mh]', 'Embase (Elsevier)')).to.equal("'term1 and term2'/exp");
	});

	it('translate `"term1 term2"[mh]` -> CI `(MH "term1 term2+")`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[mh]', 'CINAHL (Ebsco)')).to.equal('(MH "term1 term2+")');
		expect(polyglot.translateGeneric('"term1 and term2"[mh]', 'CINAHL (Ebsco)')).to.equal('(MH "term1 and term2+")');
	});

	it('translate `"term1 term2"[mh]` -> PY `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[mh]', 'PsycInfo (Ovid)')).to.equal('"term1 term2"');
		expect(polyglot.translateGeneric('"term1 and term2"[mh]', 'PsycInfo (Ovid)')).to.equal('"term1 and term2"');
	});

	it('translate `"term1 term2"[mh]` -> SC `INDEXTERMS(term1 term2)`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[mh]', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term1 term2)');
		expect(polyglot.translateGeneric('"term1 and term2"[mh]', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term1 and term2)');
	});

	it('translate `"term1 term2"[mh]` -> WS `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[mh]', 'Web of Science')).to.equal('"term1 term2"');
		expect(polyglot.translateGeneric('"term1 and term2"[mh]', 'Web of Science')).to.equal('"term1 and term2"');
	});

});

describe('Translate multiple MESH terms (PubMed (long) -> *)', ()=> {

	it('translate `"term1 term2"[MeSH Terms]` -> PM `"term1 term2"[Mesh]`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[MeSH Terms]', 'PubMed abbreviation')).to.equal('"term1 term2"[Mesh]');
		expect(polyglot.translateGeneric('"term1 and term2"[MeSH Terms]', 'PubMed abbreviation')).to.equal('"term1 and term2"[Mesh]');
	});

	it('translate `"term1 term2"[MeSH Terms]` -> OV `exp term1 term2/`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[MeSH Terms]', 'Ovid MEDLINE')).to.equal('exp term1 term2/');
		expect(polyglot.translateGeneric('"term1 and term2"[MeSH Terms]', 'Ovid MEDLINE')).to.equal('exp term1 and term2/');
	});

	it('translate `"term1 term2"[MeSH Terms]` -> CO `[mh "term1 term2"]`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[MeSH Terms]', 'Cochrane Library')).to.equal('[mh "term1 term2"]');
		expect(polyglot.translateGeneric('"term1 and term2"[MeSH Terms]', 'Cochrane Library')).to.equal('[mh "term1 and term2"]');
	});

	it('translate `"term1 term2"[MeSH Terms]` -> EM `"term1 term2"/exp`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[MeSH Terms]', 'Embase (Elsevier)')).to.equal("'term1 term2'/exp");
		expect(polyglot.translateGeneric('"term1 and term2"[MeSH Terms]', 'Embase (Elsevier)')).to.equal("'term1 and term2'/exp");
	});

	it('translate `"term1 term2"[MeSH Terms]` -> CI `(MH "term1 term2+")`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[MeSH Terms]', 'CINAHL (Ebsco)')).to.equal('(MH "term1 term2+")');
		expect(polyglot.translateGeneric('"term1 and term2"[MeSH Terms]', 'CINAHL (Ebsco)')).to.equal('(MH "term1 and term2+")');
	});

	it('translate `"term1 term2"[MeSH Terms]` -> PY `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[MeSH Terms]', 'PsycInfo (Ovid)')).to.equal('"term1 term2"');
		expect(polyglot.translateGeneric('"term1 and term2"[MeSH Terms]', 'PsycInfo (Ovid)')).to.equal('"term1 and term2"');
	});

	it('translate `"term1 term2"[MeSH Terms]` -> SC `INDEXTERMS(term1 term2)`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[MeSH Terms]', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term1 term2)');
		expect(polyglot.translateGeneric('"term1 and term2"[MeSH Terms]', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term1 and term2)');
	});

	it('translate `"term1 term2"[MeSH Terms]` -> WS `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"[MeSH Terms]', 'Web of Science')).to.equal('"term1 term2"');
		expect(polyglot.translateGeneric('"term1 and term2"[MeSH Terms]', 'Web of Science')).to.equal('"term1 and term2"');
	});

});

describe('Translate multiple MESH terms (Ovid MEDLINE -> *)', ()=> {

	it('translate `exp term1 term2/` -> PM `"term1 term2"[Mesh]`', ()=> {
		expect(polyglot.translateGeneric('exp term1 term2/', 'PubMed abbreviation')).to.equal('"term1 term2"[Mesh]');
		expect(polyglot.translateGeneric('exp term1 and term2/', 'PubMed abbreviation')).to.equal('"term1 and term2"[Mesh]');
		expect(polyglot.translateGeneric('exp "term1 and term2"/', 'PubMed abbreviation')).to.equal('"term1 and term2"[Mesh]');
	});

	it('translate `exp term1 term2/` -> OV `exp term1 term2/`', ()=> {
		expect(polyglot.translateGeneric('exp term1 term2/', 'Ovid MEDLINE')).to.equal('exp term1 term2/');
		expect(polyglot.translateGeneric('exp term1 and term2/', 'Ovid MEDLINE')).to.equal('exp term1 and term2/');
		expect(polyglot.translateGeneric('exp "term1 and term2"/', 'Ovid MEDLINE')).to.equal('exp term1 and term2/');
	});

	it('translate `exp term1 term2/` -> CO `[mh "term1 term2"]`', ()=> {
		expect(polyglot.translateGeneric('exp term1 term2/', 'Cochrane Library')).to.equal('[mh "term1 term2"]');
		expect(polyglot.translateGeneric('exp term1 and term2/', 'Cochrane Library')).to.equal('[mh "term1 and term2"]');
		expect(polyglot.translateGeneric('exp "term1 and term2"/', 'Cochrane Library')).to.equal('[mh "term1 and term2"]');
	});

	it('translate `exp term1 term2/` -> EM `"term1 term2"/exp`', ()=> {
		expect(polyglot.translateGeneric('exp term1 term2/', 'Embase (Elsevier)')).to.equal("'term1 term2'/exp");
		expect(polyglot.translateGeneric('exp term1 and term2/', 'Embase (Elsevier)')).to.equal("'term1 and term2'/exp");
		expect(polyglot.translateGeneric('exp "term1 and term2"/', 'Embase (Elsevier)')).to.equal("'term1 and term2'/exp");
	});

	it('translate `exp term1 term2/` -> CI `(MH "term1 term2+")`', ()=> {
		expect(polyglot.translateGeneric('exp term1 term2/', 'CINAHL (Ebsco)')).to.equal('(MH "term1 term2+")');
		expect(polyglot.translateGeneric('exp term1 and term2/', 'CINAHL (Ebsco)')).to.equal('(MH "term1 and term2+")');
		expect(polyglot.translateGeneric('exp "term1 and term2"/', 'CINAHL (Ebsco)')).to.equal('(MH "term1 and term2+")');
	});

	it('translate `exp term1 term2/` -> PY `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('exp term1 term2/', 'PsycInfo (Ovid)')).to.equal('"term1 term2"');
		expect(polyglot.translateGeneric('exp term1 and term2/', 'PsycInfo (Ovid)')).to.equal('"term1 and term2"');
		expect(polyglot.translateGeneric('exp "term1 and term2"/', 'PsycInfo (Ovid)')).to.equal('"term1 and term2"');
	});

	it('translate `exp term1 term2/` -> SC `INDEXTERMS(term1 term2)`', ()=> {
		expect(polyglot.translateGeneric('exp term1 term2/', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term1 term2)');
		expect(polyglot.translateGeneric('exp term1 and term2/', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term1 and term2)');
		expect(polyglot.translateGeneric('exp "term1 and term2"/', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term1 and term2)');
	});

	it('translate `exp term1 term2/` -> WS `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('exp term1 term2/', 'Web of Science')).to.equal('"term1 term2"');
		expect(polyglot.translateGeneric('exp term1 and term2/', 'Web of Science')).to.equal('"term1 and term2"');
		expect(polyglot.translateGeneric('exp "term1 and term2"/', 'Web of Science')).to.equal('"term1 and term2"');
	});

});
