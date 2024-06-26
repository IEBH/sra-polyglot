var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Translate substance searches (PubMed -> *)', () => {

	it('translate `term[nm]` -> PM `term[nm]`', () => {
		expect(polyglot.translate('term[nm]', 'PubMed abbreviation')).to.equal('term[nm]');
	});

	it('translate `term[nm]` -> OV `term.nm.`', () => {
		expect(polyglot.translate('term[nm]', 'Ovid MEDLINE')).to.equal('term.nm.');
	});

	it('translate `term[nm]` -> CO `term:ti`', () => {
		expect(polyglot.translate('term[nm]', 'Cochrane Library')).to.equal('term:kw');
	});

	it('translate `term[nm]` -> EM `term:ti`', () => {
		expect(polyglot.translate('term[nm]', 'Embase (Elsevier)')).to.equal('term:tn');
	});

	it('translate `term[nm]` -> CI `MW term`', () => {
		expect(polyglot.translate('term[nm]', 'CINAHL (Ebsco)')).to.equal('(MW term)');
	});

	it('translate `term[nm]` -> PY `term.hw.`', () => {
		expect(polyglot.translate('term[nm]', 'PsycInfo (Ovid)')).to.equal('term.hw.');
	});

	it('translate `term[nm]` -> SC `CHEM(term)`', () => {
		expect(polyglot.translate('term[nm]', 'Scopus (advanced search)')).to.equal('CHEM(term)');
	});

	it('translate `term[nm]` -> WS `term`', () => {
		expect(polyglot.translate('term[nm]', 'Web of Science')).to.equal('term');
	});

	//International HTA Database
	it('translate `term[nm]` -> HAT `term`', () => {
		expect(polyglot.translate('term[nm]', 'International HTA Database')).to.equal('term');
	});

	// PsycInfo(Ebsco)
	it('translate `term[nm]` -> PYE `MW term`', () => {
		expect(polyglot.translate('term[nm]', 'PsycInfo (Ebsco)')).to.equal('(MW term)');
	});

	// Business Source Ultimate
	it('translate `term[nm]` -> BU `MW term`', () => {
		expect(polyglot.translate('term[nm]', 'Business Source Ultimate')).to.equal('(MW term)');
	});
});

describe('Translate substance searches (Ovid MEDLINE -> *)', () => {

	it('translate `term.nm.` -> PM `term[nm]`', () => {
		expect(polyglot.translate('term.nm.', 'PubMed abbreviation')).to.equal('term[nm]');
	});

	it('translate `term.nm.` -> OV `term.nm.`', () => {
		expect(polyglot.translate('term.nm.', 'Ovid MEDLINE')).to.equal('term.nm.');
	});

	it('translate `term.nm.` -> CO `term:ti`', () => {
		expect(polyglot.translate('term.nm.', 'Cochrane Library')).to.equal('term:kw');
	});

	it('translate `term.nm.` -> EM `term:ti`', () => {
		expect(polyglot.translate('term.nm.', 'Embase (Elsevier)')).to.equal('term:tn');
	});

	it('translate `term.nm.` -> CI `TI term`', () => {
		expect(polyglot.translate('term.nm.', 'CINAHL (Ebsco)')).to.equal('(MW term)');
	});

	it('translate `term.nm.` -> PY `AB term`', () => {
		expect(polyglot.translate('term.nm.', 'PsycInfo (Ovid)')).to.equal('term.hw.');
	});

	it('translate `term.nm.` -> SC `AB term`', () => {
		expect(polyglot.translate('term.nm.', 'Scopus (advanced search)')).to.equal('CHEM(term)');
	});

	it('translate `term.nm.` -> WS `term`', () => {
		expect(polyglot.translate('term.nm.', 'Web of Science')).to.equal('term');
	});

	//International HTA Database
	it('translate `term.nm.` -> HAT `term`', () => {
		expect(polyglot.translate('term.nm.', 'International HTA Database')).to.equal('term');
	});

	// PsycInfo(Ebsco)
	it('translate `term.nm.` -> PYE `TI term`', () => {
		expect(polyglot.translate('term.nm.', 'PsycInfo (Ebsco)')).to.equal('(MW term)');
	});

	// Business Source Ultimate
	it('translate `term.nm.` -> BU `TI term`', () => {
		expect(polyglot.translate('term.nm.', 'Business Source Ultimate')).to.equal('(MW term)');
	});
});
