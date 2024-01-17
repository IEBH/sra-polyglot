var expect = require('chai').expect;
const polyglot = require('../lib').default;

describe('Translate abstract searches (PubMed -> *)', ()=> {

	it('translate `term[ab]` -> PM `term[tiab]`', ()=> {
		expect(polyglot.translate('term[ab]', 'PubMed abbreviation')).to.equal('term[ab]');
	});

	it('translate `term[ab]` -> OV `term.ab`', ()=> {
		expect(polyglot.translate('term[ab]', 'Ovid MEDLINE')).to.equal('term.ab.');
	});

	it('translate `term[ab]` -> CO `term:ab`', ()=> {
		expect(polyglot.translate('term[ab]', 'Cochrane Library')).to.equal('term:ab');
	});

	it('translate `term[ab]` -> EM `term:ab`', ()=> {
		expect(polyglot.translate('term[ab]', 'Embase (Elsevier)')).to.equal('term:ab');
	});

	it('translate `term[ab]` -> CI `AB term`', ()=> {
		expect(polyglot.translate('term[ab]', 'CINAHL (Ebsco)')).to.equal('(AB term)');
	});

	it('translate `term[ab]` -> PY `term.ab.`', ()=> {
		expect(polyglot.translate('term[ab]', 'PsycInfo (Ovid)')).to.equal('term.ab.');
	});

	it('translate `term[ab]` -> SC `ABS(term)`', ()=> {
		expect(polyglot.translate('term[ab]', 'Scopus (advanced search)')).to.equal('ABS(term)');
	});

	it('translate `term[ab]` -> WS `term`', ()=> {
		expect(polyglot.translate('term[ab]', 'Web of Science')).to.equal('term');
	});

	//International HTA Database
	it('translate `term[ab]` -> HTA `(term)[abs]`', ()=>{
		expect(polyglot.translate('term[ab]', 'International HTA Database')).to.equal('(term)[abs]');
	})

	// PsycInfo (Ebsco)
	it('translate `term[ab]` -> PYE `AB term`', ()=> {
		expect(polyglot.translate('term[ab]', 'PsycInfo (Ebsco)')).to.equal('(AB term)');
	});

});
