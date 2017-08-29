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
