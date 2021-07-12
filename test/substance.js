var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Translate substance searches (PubMed -> *)', ()=> {

	it('translate `term[nm]` -> PM `term[nm]`', ()=> {
		expect(polyglot.translate('term[nm]', 'PubMed abbreviation')).to.equal('term[nm]');
	});

	it('translate `term[nm]` -> OV `term.nm`', ()=> {
		expect(polyglot.translate('term[nm]', 'Ovid MEDLINE')).to.equal('term.nm.');
	});

	it('translate `term[nm]` -> CO `term:ti`', ()=> {
		expect(polyglot.translate('term[nm]', 'Cochrane Library')).to.equal('term:kw');
	});

	it('translate `term[nm]` -> EM `term:ti`', ()=> {
		expect(polyglot.translate('term[nm]', 'Embase (Elsevier)')).to.equal('term:tn');
	});

	it('translate `term[nm]` -> CI `MW term`', ()=> {
		expect(polyglot.translate('term[nm]', 'CINAHL (Ebsco)')).to.equal('MW term');
	});

	it('translate `term[nm]` -> PY `term.hw.`', ()=> {
		expect(polyglot.translate('term[nm]', 'PsycInfo (Ovid)')).to.equal('term.hw.');
	});

	it('translate `term[nm]` -> SC `CHEM(term)`', ()=> {
		expect(polyglot.translate('term[nm]', 'Scopus (advanced search)')).to.equal('CHEM(term)');
	});

	it('translate `term[nm]` -> WS `term`', ()=> {
		expect(polyglot.translate('term[nm]', 'Web of Science')).to.equal('term');
	});

});

describe('Translate substance searches (Ovid MEDLINE -> *)', ()=> {

	it('translate `term.nm` -> PM `term[nm]`', ()=> {
		expect(polyglot.translate('term.nm', 'PubMed abbreviation')).to.equal('term[nm]');
	});

	it('translate `term.nm` -> OV `term.nm`', ()=> {
		expect(polyglot.translate('term.nm', 'Ovid MEDLINE')).to.equal('term.nm.');
	});

	it('translate `term.nm` -> CO `term:ti`', ()=> {
		expect(polyglot.translate('term.nm', 'Cochrane Library')).to.equal('term:kw');
	});

	it('translate `term.nm` -> EM `term:ti`', ()=> {
		expect(polyglot.translate('term.nm', 'Embase (Elsevier)')).to.equal('term:tn');
	});

	it('translate `term.nm` -> CI `TI term`', ()=> {
		expect(polyglot.translate('term.nm', 'CINAHL (Ebsco)')).to.equal('MW term');
	});

	it('translate `term.hw.` -> PY `AB term`', ()=> {
		expect(polyglot.translate('term.nm', 'PsycInfo (Ovid)')).to.equal('term.hw.');
	});

	it('translate `term.nm` -> SC `AB term`', ()=> {
		expect(polyglot.translate('term.nm', 'Scopus (advanced search)')).to.equal('CHEM(term)');
	});

	it('translate `term.nm` -> WS `term`', ()=> {
		expect(polyglot.translate('term.nm', 'Web of Science')).to.equal('term');
	});

});
