var expect = require('chai').expect;
import polyglot from '../src';
describe('Translate searches and ignore numbering', ()=> {

	it('translate multi-line with numbering (Number + Dot + Space)', ()=> {
		expect(polyglot.translate('1. Foo\nAND\n2. Bar\nAND\n3. Baz', 'pubmed', {html: false})).to.equal('Foo\nAND\nBar\nAND\nBaz');
	});

	it('translate multi-line with numbering (Number + Space)', ()=> {
		expect(polyglot.translate('1 Foo\nAND\n2 Bar\nAND\n3 Baz', 'pubmed', {html: false})).to.equal('Foo\nAND\nBar\nAND\nBaz');
	});
});

describe('Allow reference numbering', ()=> {

	it('should be able to reference lines', ()=> {
		var inputPrefix = '1. Foo\nAND\n2. Bar\nAND\n3. Baz\n';
		var inputPrefixResult = 'Foo\nAND\nBar\nAND\nBaz\n';

		expect(polyglot.translate(inputPrefix, 'pubmed', {html: false})).to.equal(inputPrefixResult);
		// expect(polyglot.translate(inputPrefix + 'AND\n1', 'pubmed', {html: false})).to.equal(inputPrefixResult + '\nAND\nFoo');
		// expect(polyglot.translate(inputPrefix + 'AND\n1 OR 2 OR 3', 'pubmed', {html: false})).to.equal(inputPrefixResult + '\nAND\nFoo OR Bar OR Baz');
		expect(polyglot.translate(inputPrefix + 'AND\n1-3/OR', 'pubmed', {html: false})).to.equal(inputPrefixResult + 'AND\n(Foo) OR (Bar) OR (Baz)');
		expect(polyglot.translate(inputPrefix + 'AND\n1 - 3/OR', 'pubmed', {html: false})).to.equal(inputPrefixResult + 'AND\n(Foo) OR (Bar) OR (Baz)');
		expect(polyglot.translate(inputPrefix + 'AND\n1 - 3/AND', 'pubmed', {html: false})).to.equal(inputPrefixResult + 'AND\n(Foo) AND (Bar) AND (Baz)');
		expect(polyglot.translate(inputPrefix + 'AND\n1 AND 3', 'pubmed', {html: false})).to.equal(inputPrefixResult + 'AND\n(Foo) AND (Baz)');
		expect(polyglot.translate(inputPrefix + 'AND\n1 OR 3', 'pubmed', {html: false})).to.equal(inputPrefixResult + 'AND\n(Foo) OR (Baz)');

		expect(()=> polyglot.translate(inputPrefix + 'AND\n72-75/AND', 'pubmed', {html: false})).to.throw;
		expect(()=> polyglot.translate(inputPrefix + 'AND\n86 - 93/AND', 'pubmed', {html: false})).to.throw;
		expect(()=> polyglot.translate(inputPrefix + 'AND\n1 - 5/AND', 'pubmed', {html: false})).to.throw;
		expect(()=> polyglot.translate(inputPrefix + 'AND\n7 AND 8/AND', 'pubmed', {html: false})).to.throw;
	})

});
