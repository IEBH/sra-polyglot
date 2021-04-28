var expect = require('chai').expect;
import polyglot from '../src';
describe('Translate search phrases (with mangled quote marks)', ()=> {

	it('translate `“term1 term2”` -> PM `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('“term1 term2”', 'PubMed abbreviation')).to.equal('"term1 term2"');
	});

});
