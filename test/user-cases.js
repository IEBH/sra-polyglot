/**
* Collection of user-found bugs and edge cases
*/

var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('User edge cases', ()=> {

	// Issue - a running series of 'whitespace' doesn't get closed off properly. So a mesh term + closing brackets cancels the next whitespace character
	it('Running whitespace - mesh + brackets + real whitespace', ()=> {
		expect(polyglot.translateGeneric('(exp term1/) and (term2)', 'PubMed abbreviation')).to.equal('(term1[Mesh]) AND (term2)');
		expect(polyglot.translateGeneric('respiratory', 'PubMed abbreviation')).to.equal('respiratory');
		expect(polyglot.translateGeneric('refrigerator OR understand', 'PubMed abbreviation')).to.equal('refrigerator OR understand'); // Words containing OR + AND
	});

	// Issue any whitespace after a search phrase gets bundled in with the field translation
	it('Whitespace for field translations should be removed', ()=> {
		expect(polyglot.translateGeneric('term .tw.', 'PubMed abbreviation')).to.equal('term[tiab]');
		expect(polyglot.translateGeneric('term.tw. ', 'PubMed abbreviation')).to.equal('term[tiab]');
		expect(polyglot.translateGeneric('term.tw.  ', 'PubMed abbreviation')).to.equal('term[tiab]');
		expect(polyglot.translateGeneric('hello world .tw.', 'PubMed abbreviation')).to.equal('"hello world"[tiab]');
		expect(polyglot.translateGeneric('hello world.tw. ', 'PubMed abbreviation')).to.equal('"hello world"[tiab]');
		expect(polyglot.translateGeneric('hello world.tw.  ', 'PubMed abbreviation')).to.equal('"hello world"[tiab]');
	});

	// Issue 'or' and 'and' occurring at the start of words gets interpreted as the meta conditions 'OR' / 'AND'
	it('Boolean meta-terms within text should not get interpreted (AND / OR / NOT / ADJ / NEAR)', ()=> {
		expect(polyglot.translateGeneric('ornamental androids', 'PubMed abbreviation')).to.equal('"ornamental androids"');
		expect(polyglot.translateGeneric('"parkland subcontractor"', 'PubMed abbreviation')).to.equal('"parkland subcontractor"');
		expect(polyglot.translateGeneric('androgynous orchestra', 'PubMed abbreviation')).to.equal('"androgynous orchestra"');
		expect(polyglot.translateGeneric('notational origins', 'PubMed abbreviation')).to.equal('"notational origins"');
		expect(polyglot.translateGeneric('"worship sandwiches"', 'PubMed abbreviation')).to.equal('"worship sandwiches"');
		expect(polyglot.translateGeneric('sandlewood deodorant', 'PubMed abbreviation')).to.equal('"sandlewood deodorant"');
		expect(polyglot.translateGeneric('"notionally nearsighted"', 'PubMed abbreviation')).to.equal('"notionally nearsighted"');
		expect(polyglot.translateGeneric('"adjust knot"', 'PubMed abbreviation')).to.equal('"adjust knot"');
	});
});
