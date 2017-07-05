var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate search phrases (with mangled quote marks)', ()=> {

	it('translate PM `“term1 term2”` -> PM `"term1 term2"`', ()=> {
		expect(polyglot.translate('“term1 term2”', 'pubmed')).to.equal('"term1 term2"');
	});

});
