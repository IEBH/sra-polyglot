var expect = require('chai').expect;
import polyglot from '..';

describe('Translate search phrases (with mangled quote marks)', ()=> {

	it('translate `“term1 term2”` -> PM `"term1 term2"`', ()=> {
		expect(polyglot.translate('“term1 term2”', 'pubmed')).to.equal('"term1 term2"');
	});

});
