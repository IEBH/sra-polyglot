var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate search phrases (with mangled quote marks)', function() {

	it('translate PM `“term1 term2”` -> PM `"term1 term2"`', function() {
		expect(polyglot.translate('“term1 term2”', 'pubmed')).to.equal('"term1 term2"');
	});

});
