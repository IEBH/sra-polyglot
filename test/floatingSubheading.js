var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Translate floating subheading searches (PubMed -> *)', () => {

	it('translate `term[sh]` -> PM `term[sh]`', () => {
		expect(polyglot.translate('term[sh]', 'PubMed abbreviation')).to.equal('term[sh]');
	});

	it('translate `term[sh]` -> OV `term.fs`', () => {
		expect(polyglot.translate('term[sh]', 'Ovid MEDLINE')).to.equal('term.fs.');
	});

	it('translate `term[sh]` -> CO `[mh /term]`', () => {
		expect(polyglot.translate('term[sh]', 'Cochrane Library')).to.equal('[mh /term]');
	});

	it('translate `term[sh]` -> EM `term:lnk`', () => {
		expect(polyglot.translate('term[sh]', 'Embase (Elsevier)')).to.equal('term:lnk');
	});

	it('translate `term[sh]` -> CI `MW term`', () => {
		expect(polyglot.translate('term[sh]', 'CINAHL (Ebsco)')).to.equal('(MW term)');
	});

	it('translate `term[sh]` -> PY `term.hw.`', () => {
		expect(polyglot.translate('term[sh]', 'PsycInfo (Ovid)')).to.equal('term.hw.');
	});

	it('translate `term[sh]` -> SC `INDEXTERMS(term)`', () => {
		expect(polyglot.translate('term[sh]', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term)');
	});

	it('translate `term[sh]` -> WS `term`', () => {
		expect(polyglot.translate('term[sh]', 'Web of Science')).to.equal('term');
	});

	//International HTA Database
	it('translate `term[sh]` -> HTA `term`', () => {
		expect(polyglot.translate('term[sh]', 'International HTA Database')).to.equal('term');
	});

	// PsycInfo (Ebsco)
	it('translate `term[sh]` -> PYE `MW term`', () => {
		expect(polyglot.translate('term[sh]', 'PsycInfo (Ebsco)')).to.equal('(MW term)');
	});

	// Business Source Ultimate
	it('translate `term[sh]` -> BU `MW term`', () => {
		expect(polyglot.translate('term[sh]', 'Business Source Ultimate')).to.equal('(MW term)');
	});

	// Lilacs
	it('translate `term[sh]` -> LI `mh:term`', () => {
		console.log("Hereeeee*************************",polyglot.translate('term[sh]', 'Lilacs') )
		expect(polyglot.translate('term[sh]', 'Lilacs')).to.equal('mh:term');
	});
});
