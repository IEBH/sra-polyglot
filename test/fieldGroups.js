var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Translate field groups (Ovid MEDLINE -> CINAHL)', () => {

	it('translate `(term1).tw.` -> CI `(TI term1 OR AB term1)`', () => {
		expect(polyglot.translate('(term1).tw.', 'CINAHL (Ebsco)')).to.equal('((TI term1 OR AB term1))');
	});

	it('translate `(term1 OR term2).tw.` -> CI `(TI term1 OR AB term1 OR TI term2 OR AB term2)`', () => {
		expect(polyglot.translate('(term1 OR term2).tw.', 'CINAHL (Ebsco)')).to.equal('((TI term1 OR AB term1) OR (TI term2 OR AB term2))');
	});

	it('translate `((term1 OR term2) AND term3).tw.` -> CI `(TI term1 OR AB term1 OR TI term2 OR AB term2)`', () => {
		expect(polyglot.translate('((term1 OR term2) AND term3).tw.', 'CINAHL (Ebsco)')).to.equal('(((TI term1 OR AB term1) OR (TI term2 OR AB term2)) AND (TI term3 OR AB term3))');
	});

});

//Title/abstract search: Ovid MEDLINE -> HTA Database
describe('Translate field groups (Ovid MEDLINE -> HTA)', () => {

	it('translate `(term1).tw.` -> HTA `((term1)[title] OR (term1)[abs])`', () => {
		expect(polyglot.translate('(term1).tw.', 'International HTA Database')).to.equal('((term1)[title] OR (term1)[abs])');
	});

	it('translate `(term1 OR term2).tw.` -> HTA `((term1)[title] OR (term1)[abs] OR (term2)[title] OR (term2)[abs])`', () => {
		expect(polyglot.translate('(term1 OR term2).tw.', 'International HTA Database')).to.equal('((term1)[title] OR (term1)[abs] OR (term2)[title] OR (term2)[abs])');
	});

	it('translate `((term1 OR term2) AND term3).tw.` -> HTA `(((term1)[title] OR (term1)[abs] OR (term2)[title] OR (term2)[abs]) AND (term3)[title] OR (term3)[abs])`', () => {
		expect(polyglot.translate('((term1 OR term2) AND term3).tw.', 'International HTA Database')).to.equal('(((term1)[title] OR (term1)[abs] OR (term2)[title] OR (term2)[abs]) AND (term3)[title] OR (term3)[abs])');
	});
});

// PsycInfo (Ebsco)

describe('Translate field groups (Ovid MEDLINE -> PsycInfo)', () => {

	it('translate `(term1).tw.` -> PYE `(TI term1 OR AB term1)`', () => {
		expect(polyglot.translate('(term1).tw.', 'PsycInfo (Ebsco)')).to.equal('((TI term1 OR AB term1))');
	});

	it('translate `(term1 OR term2).tw.` -> PYE `(TI term1 OR AB term1 OR TI term2 OR AB term2)`', () => {
		expect(polyglot.translate('(term1 OR term2).tw.', 'PsycInfo (Ebsco)')).to.equal('((TI term1 OR AB term1) OR (TI term2 OR AB term2))');
	});

	it('translate `((term1 OR term2) AND term3).tw.` -> PYE `(TI term1 OR AB term1 OR TI term2 OR AB term2)`', () => {
		expect(polyglot.translate('((term1 OR term2) AND term3).tw.', 'PsycInfo (Ebsco)')).to.equal('(((TI term1 OR AB term1) OR (TI term2 OR AB term2)) AND (TI term3 OR AB term3))');
	});

});

// Business Source Ultimate
describe('Translate field groups (Ovid MEDLINE -> Business)', () => {

	it('translate `(term1).tw.` -> BU `(TI term1 OR AB term1)`', () => {
		expect(polyglot.translate('(term1).tw.', 'Business Source Ultimate')).to.equal('((TI term1 OR AB term1))');
	});

	it('translate `(term1 OR term2).tw.` -> BU `(TI term1 OR AB term1 OR TI term2 OR AB term2)`', () => {
		expect(polyglot.translate('(term1 OR term2).tw.', 'Business Source Ultimate')).to.equal('((TI term1 OR AB term1) OR (TI term2 OR AB term2))');
	});

	it('translate `((term1 OR term2) AND term3).tw.` -> BU `(TI term1 OR AB term1 OR TI term2 OR AB term2)`', () => {
		expect(polyglot.translate('((term1 OR term2) AND term3).tw.', 'Business Source Ultimate')).to.equal('(((TI term1 OR AB term1) OR (TI term2 OR AB term2)) AND (TI term3 OR AB term3))');
	});

});

// Lilacs
describe('Translate field groups (Ovid MEDLINE -> Lilacs)', () => {

	it('translate `(term1).tw.` -> LI `tw:(term1)`', () => {
		expect(polyglot.translate('(term1).tw.', 'Lilacs')).to.equal('(tw:term1)');
	});

});
