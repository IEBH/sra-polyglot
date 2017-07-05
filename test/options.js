var expect = require('chai').expect;
var polyglot = require('..');

describe('Check options', ()=> {

	it('translate (html=true)', ()=> {
		expect(polyglot.translate('"foo#"\nand\nbar', 'pubmed', {html: true})).to.equal('("foo<span msg="NO_SINGLE_WILDCARD">*</span>")<br/>AND<br/>(bar)');
	});

	it('translate (html=false)', ()=> {
		expect(polyglot.translate('"foo#"\nand\nbar', 'pubmed', {html: false})).to.equal('("foo*")\nAND\n(bar)');
	});

});
