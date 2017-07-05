var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate searches and ignore numbering', ()=> {

	it('translate multi-line with numbering', ()=> {
		expect(polyglot.translate('1. Foo\nAND\n2. Bar\nAND\n3. Baz', 'pubmed', {html: false})).to.equal('(Foo)\nAND\n(Bar)\nAND\n(Baz)');
	});

});
