var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Translate searches and ignore numbering', ()=> {

	it('translate multi-line with numbering (Number + Dot + Space)', ()=> {
		expect(polyglot.translateGeneric('1. Foo\nAND\n2. Bar\nAND\n3. Baz', 'PubMed abbreviation', {html: false})).to.equal('Foo\nAND\nBar\nAND\nBaz');
	});

	it('translate multi-line with numbering (Number + Space)', ()=> {
		expect(polyglot.translateGeneric('1 Foo\nAND\n2 Bar\nAND\n3 Baz', 'PubMed abbreviation', {html: false})).to.equal('Foo\nAND\nBar\nAND\nBaz');
	});
});

describe('Allow reference numbering', ()=> {

	it('should be able to reference lines', ()=> {
		var inputPrefix = '1. Foo\nAND\n2. Bar\nAND\n3. Baz\n';
		var inputPrefixResult = 'Foo\nAND\nBar\nAND\nBaz\n';

		expect(polyglot.translateGeneric(inputPrefix, 'PubMed abbreviation', {html: false})).to.equal(inputPrefixResult);
		// expect(polyglot.translateGeneric(inputPrefix + 'AND\n1', 'PubMed abbreviation', {html: false})).to.equal(inputPrefixResult + '\nAND\nFoo');
		// expect(polyglot.translateGeneric(inputPrefix + 'AND\n1 OR 2 OR 3', 'PubMed abbreviation', {html: false})).to.equal(inputPrefixResult + '\nAND\nFoo OR Bar OR Baz');
		expect(polyglot.translateGeneric(inputPrefix + 'AND\n1-3/OR', 'PubMed abbreviation', {html: false})).to.equal(inputPrefixResult + 'AND\n(Foo) OR (Bar) OR (Baz)');
		expect(polyglot.translateGeneric(inputPrefix + 'AND\n1 - 3/OR', 'PubMed abbreviation', {html: false})).to.equal(inputPrefixResult + 'AND\n(Foo) OR (Bar) OR (Baz)');
		expect(polyglot.translateGeneric(inputPrefix + 'AND\n1 - 3/AND', 'PubMed abbreviation', {html: false})).to.equal(inputPrefixResult + 'AND\n(Foo) AND (Bar) AND (Baz)');
		expect(polyglot.translateGeneric(inputPrefix + 'AND\n1 AND 3', 'PubMed abbreviation', {html: false})).to.equal(inputPrefixResult + 'AND\n(Foo) AND (Baz)');
		expect(polyglot.translateGeneric(inputPrefix + 'AND\n1 OR 3', 'PubMed abbreviation', {html: false})).to.equal(inputPrefixResult + 'AND\n(Foo) OR (Baz)');

		expect(()=> polyglot.translateGeneric(inputPrefix + 'AND\n72-75/AND', 'PubMed abbreviation', {html: false})).to.throw;
		expect(()=> polyglot.translateGeneric(inputPrefix + 'AND\n86 - 93/AND', 'PubMed abbreviation', {html: false})).to.throw;
		expect(()=> polyglot.translateGeneric(inputPrefix + 'AND\n1 - 5/AND', 'PubMed abbreviation', {html: false})).to.throw;
		expect(()=> polyglot.translateGeneric(inputPrefix + 'AND\n7 AND 8/AND', 'PubMed abbreviation', {html: false})).to.throw;
	})

});

describe('Avoid False Positives', ()=> {

	it('type 1 diabetes', ()=> {
		expect(polyglot.translateGeneric('type 1 diabetes', 'PubMed abbreviation', {html: false})).to.equal('"type 1 diabetes"');
	})

});
