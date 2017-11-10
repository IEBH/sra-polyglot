/**
* Collection of user-found bugs and edge cases
*/

var expect = require('chai').expect;
var polyglot = require('..');

describe('User edge cases', ()=> {

	// Issue - a running series of 'whitespace' doesn't get closed off properly. So a mesh term + closing brackets cancels the next whitespace character
	it('Running whitespace - mesh + brackets + real whitespace', ()=> {
		expect(polyglot.translate('(exp term1/) and (term2)', 'pubmed')).to.equal('(term1[Mesh]) AND (term2)');
		expect(polyglot.translate('respiratory', 'pubmed')).to.equal('respiratory');
		expect(polyglot.translate('refrigerator OR understand', 'pubmed')).to.equal('refrigerator OR understand'); // Words containing OR + AND
	});

	// Issue any whitespace after a search phrase gets bundled in with the field translation
	it('Whitespace for field translations should be removed', ()=> {
		expect(polyglot.translate('term .tw.', 'pubmed')).to.equal('term[tiab]');
		expect(polyglot.translate('term.tw. ', 'pubmed')).to.equal('term[tiab]');
		expect(polyglot.translate('term.tw.  ', 'pubmed')).to.equal('term[tiab]');
		expect(polyglot.translate('hello world .tw.', 'pubmed')).to.equal('"hello world"[tiab]');
		expect(polyglot.translate('hello world.tw. ', 'pubmed')).to.equal('"hello world"[tiab]');
		expect(polyglot.translate('hello world.tw.  ', 'pubmed')).to.equal('"hello world"[tiab]');
	});

	// Issue 'or' and 'and' occurring at the start of words gets interpreted as the meta conditions 'OR' / 'AND'
	it('Boolean meta-terms within text should not get interpreted (AND / OR / NOT / ADJ / NEAR)', ()=> {
		expect(polyglot.translate('ornamental androids', 'pubmed')).to.equal('"ornamental androids"');
		expect(polyglot.translate('"parkland subcontractor"', 'pubmed')).to.equal('"parkland subcontractor"');
		expect(polyglot.translate('androgynous orchestra', 'pubmed')).to.equal('"androgynous orchestra"');
		expect(polyglot.translate('notational origins', 'pubmed')).to.equal('"notational origins"');
		expect(polyglot.translate('"worship sandwiches"', 'pubmed')).to.equal('"worship sandwiches"');
		expect(polyglot.translate('sandlewood deodorant', 'pubmed')).to.equal('"sandlewood deodorant"');
		expect(polyglot.translate('"notionally nearsighted"', 'pubmed')).to.equal('"notionally nearsighted"');
		expect(polyglot.translate('"adjust knot"', 'pubmed')).to.equal('"adjust knot"');
	});
});
