var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Check options', ()=> {

	it('translate (html=false)', ()=> {
		expect(polyglot.translate('"foo#"\nand\nbar', 'PubMed abbreviation', {html: false})).to.equal('foo*\nAND\nbar');
	});

});
