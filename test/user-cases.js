/**
* Collection of user-found bugs and edge cases
*/

var expect = require('chai').expect;
var polyglot = require('..');

describe('User edge cases', ()=> {

	// Issue - a running series of 'whitespace' doesnt get closed off properly. So a mesh term + closing brackets cancels the next whitespace character
	it('Running whitespace - mesh + brackets + real whitespace', ()=> {
		expect(polyglot.translate('(exp term1/) and (term2)', 'pubmed')).to.equal('(term1[Mesh]) AND (term2)');
		expect(polyglot.translate('respiratory', 'pubmed')).to.equal('respiratory');
		expect(polyglot.translate('refrigerator OR understand', 'pubmed')).to.equal('refrigerator OR understand'); // Words containing OR + AND
	});

});
