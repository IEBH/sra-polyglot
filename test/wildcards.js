var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Translate wildcards searches (multiple character "*" style)', ()=> {

	it('translate `term*` -> PM `term*`', ()=> {
		expect(polyglot.translate('term*', 'PubMed abbreviation')).to.equal('term*');
	});

	it('translate `term*` -> OV `term*`', ()=> {
		expect(polyglot.translate('term*', 'Ovid MEDLINE')).to.equal('term*');
	});

	it('translate `term*` -> CO `term*`', ()=> {
		expect(polyglot.translate('term*', 'Cochrane Library')).to.equal('term*');
	});

	it('translate `term*` -> EM `term*`', ()=> {
		expect(polyglot.translate('term*', 'Embase (Elsevier)')).to.equal('term*');
	});

	it('translate `term*` -> CI `term*`', ()=> {
		expect(polyglot.translate('term*', 'CINAHL (Ebsco)')).to.equal('term*');
	});

	it('translate `term*` -> PY `term*`', ()=> {
		expect(polyglot.translate('term*', 'PsycInfo (Ovid)')).to.equal('term*');
	});

	it('translate `term*` -> SC `term*`', ()=> {
		expect(polyglot.translate('term*', 'Scopus (advanced search)')).to.equal('term*');
	});

	it('translate `term*` -> WS `term*`', ()=> {
		expect(polyglot.translate('term*', 'Web of Science')).to.equal('term*');
	});

	//International HTA Database
	it('translate `term*` -> HTA `term*`', ()=> {
		expect(polyglot.translate('term*', 'International HTA Database')).to.equal('term*');
	});

	// PsycInfo (Ebsco)
	it('translate `term*` -> PYE `term*`', ()=> {
		expect(polyglot.translate('term*', 'PsycInfo (Ebsco)')).to.equal('term*');
	});

});

describe('Translate wildcards searches (single character "#" style)', ()=> {

	it('translate `term#` -> PM `term*`', ()=> {
		expect(polyglot.translate('term#', 'PubMed abbreviation')).to.equal('term*');
	});

	it('translate `term#` -> OV `term#`', ()=> {
		expect(polyglot.translate('term#', 'Ovid MEDLINE')).to.equal('term#');
	});

	it('translate `term#` -> CO `term?`', ()=> {
		expect(polyglot.translate('term#', 'Cochrane Library')).to.equal('term?');
	});

	it('translate `term#` -> EM `term?`', ()=> {
		expect(polyglot.translate('term#', 'Embase (Elsevier)')).to.equal('term?');
	});

	it('translate `term#` -> CI `term?`', ()=> {
		expect(polyglot.translate('term#', 'CINAHL (Ebsco)')).to.equal('term?');
	});

	it('translate `term#` -> PY `term#`', ()=> {
		expect(polyglot.translate('term#', 'PsycInfo (Ovid)')).to.equal('term#');
	});

	it('translate `term#` -> SC `term?`', ()=> {
		expect(polyglot.translate('term#', 'Scopus (advanced search)')).to.equal('term?');
	});

	it('translate `term#` -> WS `term?`', ()=> {
		expect(polyglot.translate('term#', 'Web of Science')).to.equal('term?');
	});

	//International HTA Database
	it('translate `term#` -> HTA `term*`', ()=> {
		expect(polyglot.translate('term#', 'International HTA Database')).to.equal('term*');
	});

	// PsycInfo (Ebsco)
	it('translate `term#` -> PYE `term?`', ()=> {
		expect(polyglot.translate('term#', 'PsycInfo (Ebsco)')).to.equal('term?');
	});

});

describe('Translate wildcards searches (single character Ovid "?" style)', ()=> {

	it('translate `term?` -> PM `term*`', ()=> {
		expect(polyglot.translate('term?', 'PubMed abbreviation')).to.equal('term*');
	});

	it('translate `term?` -> OV `term?`', ()=> {
		expect(polyglot.translate('term?', 'Ovid MEDLINE')).to.equal('term?');
	});

	it('translate `term?` -> CO `term?`', ()=> {
		expect(polyglot.translate('term?', 'Cochrane Library')).to.equal('term?');
	});

	it('translate `term?` -> EM `term$`', ()=> {
		expect(polyglot.translate('term?', 'Embase (Elsevier)')).to.equal('term$');
	});

	it('translate `term?` -> CI `term#`', ()=> {
		expect(polyglot.translate('term?', 'CINAHL (Ebsco)')).to.equal('term#');
	});

	it('translate `term?` -> PY `term?`', ()=> {
		expect(polyglot.translate('term?', 'PsycInfo (Ovid)')).to.equal('term?');
	});

	it('translate `term?` -> SC `term*`', ()=> {
		expect(polyglot.translate('term?', 'Scopus (advanced search)')).to.equal('term*');
	});

	it('translate `term?` -> WS `term$`', ()=> {
		expect(polyglot.translate('term?', 'Web of Science')).to.equal('term$');
	});

	//International HTA Database
	it('translate `term?` -> HTA `term*`', ()=> {
		expect(polyglot.translate('term?', 'International HTA Database')).to.equal('term*');
	});

	// PsycInfo (Ebsco)
	it('translate `term?` -> PYE `term#`', ()=> {
		expect(polyglot.translate('term?', 'PsycInfo (Ebsco)')).to.equal('term#');
	});

});

describe('Translate wildcards searches (single character Ovid MEDLINE "$" style)', ()=> {

	it('translate `term$` -> PM `term*`', ()=> {
		expect(polyglot.translate('term$', 'PubMed abbreviation')).to.equal('term*');
	});

	it('translate `term$` -> OV `term$`', ()=> {
		expect(polyglot.translate('term$', 'Ovid MEDLINE')).to.equal('term$');
	});

	it('translate `term$` -> CO `term?`', ()=> {
		expect(polyglot.translate('term$', 'Cochrane Library')).to.equal('term?');
	});

	it('translate `term$` -> EM `term*`', ()=> {
		expect(polyglot.translate('term$', 'Embase (Elsevier)')).to.equal('term?');
	});

	it('translate `term$` -> CI `term*`', ()=> {
		expect(polyglot.translate('term$', 'CINAHL (Ebsco)')).to.equal('term?');
	});

	it('translate `term$` -> PY `term*`', ()=> {
		expect(polyglot.translate('term$', 'PsycInfo (Ovid)')).to.equal('term#');
	});

	it('translate `term$` -> SC `term*`', ()=> {
		expect(polyglot.translate('term$', 'Scopus (advanced search)')).to.equal('term?');
	});

	it('translate `term$` -> WS `term*`', ()=> {
		expect(polyglot.translate('term$', 'Web of Science')).to.equal('term?');
	});

	//International HTA Database
	it('translate `term$` -> HTA `term*`', ()=> {
		expect(polyglot.translate('term$', 'International HTA Database')).to.equal('term*');
	});

	// PsycInfo (Ebsco)
	it('translate `term$` -> PYE `term*`', ()=> {
		expect(polyglot.translate('term$', 'PsycInfo (Ebsco)')).to.equal('term?');
	});

});
