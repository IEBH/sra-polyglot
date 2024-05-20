var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Translate searches and ignore numbering', () => {

	it('translate multi-line with numbering (Number + Dot + Space)', () => {
		expect(polyglot.translate('1. Foo\nAND\n2. Bar\nAND\n3. Baz', 'PubMed abbreviation', { html: false })).to.equal('Foo\nAND\nBar\nAND\nBaz');
	});

	it('translate multi-line with numbering (Number + Space)', () => {
		expect(polyglot.translate('1 Foo\nAND\n2 Bar\nAND\n3 Baz', 'PubMed abbreviation', { html: false })).to.equal('Foo\nAND\nBar\nAND\nBaz');
	});
});

describe('Allow reference numbering', () => {

	it('should be able to reference lines', () => {
		var inputPrefix = '1. Foo\nAND\n2. Bar\nAND\n3. Baz\n';
		var inputPrefixResult = 'Foo\nAND\nBar\nAND\nBaz\n';

		expect(polyglot.translate(inputPrefix, 'PubMed abbreviation', { html: false })).to.equal(inputPrefixResult);
		// expect(polyglot.translate(inputPrefix + 'AND\n1', 'PubMed abbreviation', {html: false})).to.equal(inputPrefixResult + '\nAND\nFoo');
		// expect(polyglot.translate(inputPrefix + 'AND\n1 OR 2 OR 3', 'PubMed abbreviation', {html: false})).to.equal(inputPrefixResult + '\nAND\nFoo OR Bar OR Baz');
		expect(polyglot.translate(inputPrefix + 'AND\n1-3/OR', 'PubMed abbreviation', { html: false })).to.equal(inputPrefixResult + 'AND\n(Foo) OR (Bar) OR (Baz)');
		expect(polyglot.translate(inputPrefix + 'AND\n1 - 3/OR', 'PubMed abbreviation', { html: false })).to.equal(inputPrefixResult + 'AND\n(Foo) OR (Bar) OR (Baz)');
		expect(polyglot.translate(inputPrefix + 'AND\n1 - 3/AND', 'PubMed abbreviation', { html: false })).to.equal(inputPrefixResult + 'AND\n(Foo) AND (Bar) AND (Baz)');
		expect(polyglot.translate(inputPrefix + 'AND\n1 AND 3', 'PubMed abbreviation', { html: false })).to.equal(inputPrefixResult + 'AND\n(Foo) AND (Baz)');
		expect(polyglot.translate(inputPrefix + 'AND\n1 OR 3', 'PubMed abbreviation', { html: false })).to.equal(inputPrefixResult + 'AND\n(Foo) OR (Baz)');

		expect(() => polyglot.translate(inputPrefix + 'AND\n72-75/AND', 'PubMed abbreviation', { html: false })).to.throw;
		expect(() => polyglot.translate(inputPrefix + 'AND\n86 - 93/AND', 'PubMed abbreviation', { html: false })).to.throw;
		expect(() => polyglot.translate(inputPrefix + 'AND\n1 - 5/AND', 'PubMed abbreviation', { html: false })).to.throw;
		expect(() => polyglot.translate(inputPrefix + 'AND\n7 AND 8/AND', 'PubMed abbreviation', { html: false })).to.throw;
	})

});

describe('Translate numbers in brackets', () => {
	it('Basic number bracket translation', () => {
		expect(polyglot.translate('1. Foo\n2. Bar\n3. (1 or 2)', 'CINAHL (Ebsco)', { html: false })).to.equal('Foo\nBar\n((Foo) OR (Bar))');
	});

	// Business Source Ultimate
	it('Basic number bracket translation', () => {
		expect(polyglot.translate('1. Foo\n2. Bar\n3. (1 or 2)', 'Business Source Ultimate', { html: false })).to.equal('Foo\nBar\n((Foo) OR (Bar))');
	});
});


describe('Avoid False Positives', () => {

	it('type 1 diabetes', () => {
		expect(polyglot.translate('type 1 diabetes', 'PubMed abbreviation', { html: false })).to.equal('"type 1 diabetes"');
		expect(polyglot.translate('type 1 or type', 'PubMed abbreviation', { html: false })).to.equal('"type 1" OR type');
	})

	// PsycInfo (Ebsco)
	describe('Translate numbers in brackets', () => {
		it('Basic number bracket translation', () => {
			expect(polyglot.translate('1. Foo\n2. Bar\n3. (1 or 2)', 'PsycInfo (Ebsco)', { html: false })).to.equal('Foo\nBar\n((Foo) OR (Bar))');
		});
	});
});
