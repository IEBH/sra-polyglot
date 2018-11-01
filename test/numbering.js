var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate searches and ignore numbering', ()=> {

	it('translate multi-line with numbering (Number + Dot + Space)', ()=> {
		expect(polyglot.translate('1. Foo\nAND\n2. Bar\nAND\n3. Baz', 'pubmed', {html: false})).to.equal('(Foo)\nAND\n(Bar)\nAND\n(Baz)');
	});

	it('translate multi-line with numbering (Number + Space)', ()=> {
		expect(polyglot.translate('1 Foo\nAND\n2 Bar\nAND\n3 Baz', 'pubmed', {html: false})).to.equal('(Foo)\nAND\n(Bar)\nAND\n(Baz)');
	});
});

describe.skip('Allow reference numbering', ()=> {

	it('should be able to reference lines', ()=> {
		var inputPrefix = 'Foo\nAND\nBar\nAND\nBaz\n';
		var inputPrefixResult = '(Foo)\nAND\n(Bar)\nAND\n(Baz)';

		expect(polyglot.translate(inputPrefix, 'pubmed', {html: false})).to.equal(inputPrefixResult);
		expect(polyglot.translate(inputPrefix + 'AND\n1', 'pubmed', {html: false})).to.equal(inputPrefixResult + '\nAND\n(Foo)');
		expect(polyglot.translate(inputPrefix + 'AND\n1 OR 2 OR 3', 'pubmed', {html: false})).to.equal(inputPrefixResult + '\nAND\n(Foo) OR (Bar) OR (Baz)');
		expect(polyglot.translate(inputPrefix + 'AND\n1 - 3/OR', 'pubmed', {html: false})).to.equal(inputPrefixResult + '\nAND\n(Foo) OR (Bar) OR (Baz)');
		expect(polyglot.translate(inputPrefix + 'AND\n1 - 3/AND', 'pubmed', {html: false})).to.equal(inputPrefixResult + '\nAND\n(Foo) AND (Bar) AND (Baz)');

	})

});
