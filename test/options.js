var expect = require('chai').expect;
import polyglot from '../src';
describe('Check options', ()=> {

	it('translate (html=true)', ()=> {
		expect(polyglot.translateGeneric('"foo#"\nand\nbar', 'PubMed abbreviation', {html: true})).to.equal('foo<span class="highlight" v-tooltip="\'No Single Wildcard for Pubmed\'">*</span><br/>AND<br/>bar');
	});

	it('translate (html=false)', ()=> {
		expect(polyglot.translateGeneric('"foo#"\nand\nbar', 'PubMed abbreviation', {html: false})).to.equal('foo*\nAND\nbar');
	});

});
