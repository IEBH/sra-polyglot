var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Translate publication type searches (PubMed -> *)', () => {

	it('translate `term[pt]` -> PM `term[pt]`', () => {
		expect(polyglot.translate('term[pt]', 'PubMed abbreviation')).to.equal('term[pt]');
	});

	it('translate `term[pt]` -> OV `term.pt`', () => {
		expect(polyglot.translate('term[pt]', 'Ovid MEDLINE')).to.equal('term.pt.');
	});

	it('translate `term[pt]` -> CO `term:pt`', () => {
		expect(polyglot.translate('term[pt]', 'Cochrane Library')).to.equal('term:pt');
	});

	it('translate `term[pt]` -> EM `term:it`', () => {
		expect(polyglot.translate('term[pt]', 'Embase (Elsevier)')).to.equal('term:it');
	});

	it('translate `term[pt]` -> CI `PT term`', () => {
		expect(polyglot.translate('term[pt]', 'CINAHL (Ebsco)')).to.equal('(PT term)');
	});

	it('translate `term[pt]` -> PY `term.pt.`', () => {
		expect(polyglot.translate('term[pt]', 'PsycInfo (Ovid)')).to.equal('term.pt.');
	});

	it('translate `term[pt]` -> SC `DOCTYPE(term)`', () => {
		expect(polyglot.translate('term[pt]', 'Scopus (advanced search)')).to.equal('DOCTYPE(term)');
	});

	it('translate `term[pt]` -> WS `term`', () => {
		expect(polyglot.translate('term[pt]', 'Web of Science')).to.equal('term');
	});

	//International HTA Database
	it('translate `term[pt]` -> HTA `term`', () => {
		expect(polyglot.translate('term[pt]', 'International HTA Database')).to.equal('term');
	});

	// PsycInfo(Ebsco)
	it('translate `term[pt]` -> PYE `PT term`', () => {
		expect(polyglot.translate('term[pt]', 'PsycInfo (Ebsco)')).to.equal('(PT term)');
	});

	// Business Source Ultimate
	it('translate `term[pt]` -> BU `PT term`', () => {
		expect(polyglot.translate('term[pt]', 'Business Source Ultimate')).to.equal('(PT term)');
	});

});
