var expect = require('chai').expect;
import polyglot from '../src';
describe('Check options', ()=> {

	it('translate (html=true)', ()=> {
		expect(polyglot.translate('"foo#"\nand\nbar', 'pubmed', {html: true})).to.equal('"foo<span class="highlight" v-tooltip="\'No Single Wildcard for Pubmed\'">*</span>"<br/>AND<br/>bar');
	});

	it('translate (html=false)', ()=> {
		expect(polyglot.translate('"foo#"\nand\nbar', 'pubmed', {html: false})).to.equal('"foo*"\nAND\nbar');
	});

});
