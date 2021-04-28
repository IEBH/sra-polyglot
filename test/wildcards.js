var expect = require('chai').expect;
import polyglot from '../src';
describe('Translate wildcards searches (multiple character "*" style)', ()=> {

	it('translate `term*` -> PM `term*`', ()=> {
		expect(polyglot.translateGeneric('term*', 'PubMed abbreviation')).to.equal('term*');
	});

	it('translate `term*` -> OV `term*`', ()=> {
		expect(polyglot.translateGeneric('term*', 'Ovid MEDLINE')).to.equal('term*');
	});

	it('translate `term*` -> CO `term*`', ()=> {
		expect(polyglot.translateGeneric('term*', 'Cochrane Library')).to.equal('term*');
	});

	it('translate `term*` -> EM `term*`', ()=> {
		expect(polyglot.translateGeneric('term*', 'Embase (Elsevier)')).to.equal('term*');
	});

	it('translate `term*` -> CI `term*`', ()=> {
		expect(polyglot.translateGeneric('term*', 'CINAHL (Ebsco)')).to.equal('term*');
	});

	it('translate `term*` -> PY `term*`', ()=> {
		expect(polyglot.translateGeneric('term*', 'PsycInfo (Ovid)')).to.equal('term*');
	});

	it('translate `term*` -> SC `term*`', ()=> {
		expect(polyglot.translateGeneric('term*', 'Scopus (advanced search)')).to.equal('"term*"');
	});

	it('translate `term*` -> WS `term*`', ()=> {
		expect(polyglot.translateGeneric('term*', 'Web of Science')).to.equal('term*');
	});

});

describe('Translate wildcards searches (single character "#" style)', ()=> {

	it('translate `term#` -> PM `term*`', ()=> {
		expect(polyglot.translateGeneric('term#', 'PubMed abbreviation')).to.equal('term*');
	});

	it('translate `term#` -> OV `term#`', ()=> {
		expect(polyglot.translateGeneric('term#', 'Ovid MEDLINE')).to.equal('term#');
	});

	it('translate `term#` -> CO `term#`', ()=> {
		expect(polyglot.translateGeneric('term#', 'Cochrane Library')).to.equal('term#');
	});

	it('translate `term#` -> EM `term*`', ()=> {
		expect(polyglot.translateGeneric('term#', 'Embase (Elsevier)')).to.equal('term*');
	});

	it('translate `term#` -> CI `term*`', ()=> {
		expect(polyglot.translateGeneric('term#', 'CINAHL (Ebsco)')).to.equal('term*');
	});

	it('translate `term#` -> PY `term#`', ()=> {
		expect(polyglot.translateGeneric('term#', 'PsycInfo (Ovid)')).to.equal('term#');
	});

	it('translate `term#` -> SC `term?`', ()=> {
		expect(polyglot.translateGeneric('term#', 'Scopus (advanced search)')).to.equal('"term?"');
	});

	it('translate `term#` -> WS `term*`', ()=> {
		expect(polyglot.translateGeneric('term#', 'Web of Science')).to.equal('term*');
	});

});

describe('Translate wildcards searches (single character PubMed "?" style)', ()=> {

	it('translate `term?` -> PM `term?`', ()=> {
		expect(polyglot.translateGeneric('term?', 'PubMed abbreviation')).to.equal('term?');
	});

	it('translate `term?` -> OV `term?`', ()=> {
		expect(polyglot.translateGeneric('term?', 'Ovid MEDLINE')).to.equal('term?');
	});

	it('translate `term?` -> CO `term?`', ()=> {
		expect(polyglot.translateGeneric('term?', 'Cochrane Library')).to.equal('term?');
	});

	it('translate `term?` -> EM `term?`', ()=> {
		expect(polyglot.translateGeneric('term?', 'Embase (Elsevier)')).to.equal('term?');
	});

	it('translate `term?` -> CI `term#`', ()=> {
		expect(polyglot.translateGeneric('term?', 'CINAHL (Ebsco)')).to.equal('term#');
	});

	it('translate `term?` -> PY `term?`', ()=> {
		expect(polyglot.translateGeneric('term?', 'PsycInfo (Ovid)')).to.equal('term?');
	});

	it('translate `term?` -> SC `term?`', ()=> {
		expect(polyglot.translateGeneric('term?', 'Scopus (advanced search)')).to.equal('"term?"');
	});

	it('translate `term?` -> WS `term*`', ()=> {
		expect(polyglot.translateGeneric('term?', 'Web of Science')).to.equal('term*');
	});

});

describe('Translate wildcards searches (single character Ovid MEDLINE "$" style)', ()=> {

	it('translate `term$` -> PM `term*`', ()=> {
		expect(polyglot.translateGeneric('term$', 'PubMed abbreviation')).to.equal('term*');
	});

	it('translate `term$` -> OV `term$`', ()=> {
		expect(polyglot.translateGeneric('term$', 'Ovid MEDLINE')).to.equal('term$');
	});

	it('translate `term$` -> CO `term?`', ()=> {
		expect(polyglot.translateGeneric('term$', 'Cochrane Library')).to.equal('term>?');
	});

	it('translate `term$` -> EM `term*`', ()=> {
		expect(polyglot.translateGeneric('term$', 'Embase (Elsevier)')).to.equal('term*');
	});

	it('translate `term$` -> CI `term*`', ()=> {
		expect(polyglot.translateGeneric('term$', 'CINAHL (Ebsco)')).to.equal('term*');
	});

	it('translate `term$` -> PY `term*`', ()=> {
		expect(polyglot.translateGeneric('term$', 'PsycInfo (Ovid)')).to.equal('term*');
	});

	it('translate `term$` -> SC `term*`', ()=> {
		expect(polyglot.translateGeneric('term$', 'Scopus (advanced search)')).to.equal('"term*"');
	});

	it('translate `term$` -> WS `term*`', ()=> {
		expect(polyglot.translateGeneric('term$', 'Web of Science')).to.equal('term?');
	});

});
