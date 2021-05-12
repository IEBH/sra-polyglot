var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Translate search phrases (PubMed -> *)', ()=> {

	it('translate `"term1 term2"` -> PM `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"', 'PubMed abbreviation')).to.equal('"term1 term2"');
	});

	it('translate `"term1 term2"` -> OV `term1 term2`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"', 'Ovid MEDLINE')).to.equal('"term1 term2"');
	});

	it('translate `"term1 term2"` -> CO `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"', 'Cochrane Library')).to.equal('"term1 term2"');
	});

	it('translate `"term1 term2"` -> EM `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"', 'Embase (Elsevier)')).to.equal('"term1 term2"');
	});

	it('translate `"term1 term2"` -> CI `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"', 'CINAHL (Ebsco)')).to.equal('"term1 term2"');
	});

	it('translate `"term1 term2"` -> PY `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"', 'PsycInfo (Ovid)')).to.equal('"term1 term2"');
	});

	it('translate `"term1 term2"` -> SC `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"', 'Scopus (advanced search)')).to.equal('"term1 term2"');
	});

	it('translate `"term1 term2"` -> WS `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"', 'Web of Science')).to.equal('"term1 term2"');
	});

});

describe('Translate search phrases (Ovid MEDLINE -> *)', ()=> {

	it('translate `"term1 term2"` -> PM `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"', 'PubMed abbreviation')).to.equal('"term1 term2"');
	});

	it('translate `"term1 term2"` -> OV `term1 term2`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"', 'Ovid MEDLINE')).to.equal('"term1 term2"');
	});

	it('translate `"term1 term2"` -> CO `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"', 'Cochrane Library')).to.equal('"term1 term2"');
	});

	it('translate `"term1 term2"` -> EM `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"', 'Embase (Elsevier)')).to.equal('"term1 term2"');
	});

	it('translate `"term1 term2"` -> CI `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"', 'CINAHL (Ebsco)')).to.equal('"term1 term2"');
	});

	it('translate `"term1 term2"` -> PY `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"', 'PsycInfo (Ovid)')).to.equal('"term1 term2"');
	});

	it('translate `"term1 term2"` -> SC `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"', 'Scopus (advanced search)')).to.equal('"term1 term2"');
	});

	it('translate `"term1 term2"` -> WS `"term1 term2"`', ()=> {
		expect(polyglot.translateGeneric('"term1 term2"', 'Web of Science')).to.equal('"term1 term2"');
	});

});
