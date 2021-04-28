var expect = require('chai').expect;
import polyglot from '../src';
describe('Translate adjacency searches (ADJ format)', ()=> {

	it('translate `term1 ADJ3 term2` -> PM `term1 AND term2`', ()=> {
		expect(polyglot.translateGeneric('term1 ADJ3 term2', 'PubMed abbreviation')).to.equal('term1 AND term2');
	});

	it('translate `term1 ADJ3 term2` -> OV `term1 ADJ3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 ADJ3 term2', 'Ovid MEDLINE')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 ADJ3 term2` -> CO `term1 NEAR/3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 ADJ3 term2', 'Cochrane Library')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 ADJ3 term2` -> EM `term1 NEAR/3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 ADJ3 term2', 'Embase (Elsevier)')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 ADJ3 term2` -> CI `term1 N3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 ADJ3 term2', 'CINAHL (Ebsco)')).to.equal('term1 N3 term2');
	});

	it('translate `term1 ADJ3 term2` -> PY `term1 ADJ3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 ADJ3 term2', 'PsycInfo (Ovid)')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 ADJ3 term2` -> SC `term1 W/3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 ADJ3 term2', 'Scopus (advanced search)')).to.equal('"term1" W/3 "term2"');
	});

	it('translate `term1 ADJ3 term2` -> WS `term1 NEAR/3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 ADJ3 term2', 'Web of Science')).to.equal('term1 NEAR/3 term2');
	});

});

describe('Translate adjacency searches (NEAR3 format)', ()=> {

	it('translate `term1 NEAR3 term2` -> PM `term1 AND term2`', ()=> {
		expect(polyglot.translateGeneric('term1 NEAR3 term2', 'PubMed abbreviation')).to.equal('term1 AND term2');
	});

	it('translate `term1 NEAR3 term2` -> OV `term1 ADJ3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 NEAR3 term2', 'Ovid MEDLINE')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 NEAR3 term2` -> CO `term1 NEAR/3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 NEAR/3 term2', 'Cochrane Library')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 NEAR3 term2` -> EM `term1 NEAR/3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 NEAR3 term2', 'Embase (Elsevier)')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 NEAR3 term2` -> CI `term1 N3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 NEAR3 term2', 'CINAHL (Ebsco)')).to.equal('term1 N3 term2');
	});

	it('translate `term1 NEAR3 term2` -> PY `term1 ADJ3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 NEAR3 term2', 'PsycInfo (Ovid)')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 NEAR3 term2` -> SC `term1 W/3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 NEAR3 term2', 'Scopus (advanced search)')).to.equal('"term1" W/3 "term2"');
	});

	it('translate `term1 NEAR3 term2` -> WS `term1 NEAR/3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 NEAR3 term2', 'Web of Science')).to.equal('term1 NEAR/3 term2');
	});

});


describe('Translate adjacency searches (NEAR/3 format)', ()=> {

	it('translate `term1 NEAR/3 term2` -> PM `term1 AND term2`', ()=> {
		expect(polyglot.translateGeneric('term1 NEAR/3 term2', 'PubMed abbreviation')).to.equal('term1 AND term2');
	});

	it('translate `term1 NEAR/3 term2` -> OV `term1 ADJ3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 NEAR/3 term2', 'Ovid MEDLINE')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 NEAR/3 term2` -> CO `term1 NEAR/3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 NEAR/3 term2', 'Cochrane Library')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 NEAR/3 term2` -> EM `term1 NEAR/3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 NEAR/3 term2', 'Embase (Elsevier)')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 NEAR/3 term2` -> CI `term1 N3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 NEAR/3 term2', 'CINAHL (Ebsco)')).to.equal('term1 N3 term2');
	});

	it('translate `term1 NEAR/3 term2` -> PY `term1 ADJ3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 NEAR/3 term2', 'PsycInfo (Ovid)')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 NEAR/3 term2` -> SC `term1 W/3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 NEAR/3 term2', 'Scopus (advanced search)')).to.equal('"term1" W/3 "term2"');
	});

	it('translate `term1 NEAR/3 term2` -> WS `term1 NEAR/3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 NEAR/3 term2', 'Web of Science')).to.equal('term1 NEAR/3 term2');
	});

});


describe('Translate adjacency searches (N3 format)', ()=> {

	it('translate `term1 N3 term2` -> PM `term1 AND term2`', ()=> {
		expect(polyglot.translateGeneric('term1 N3 term2', 'PubMed abbreviation')).to.equal('term1 AND term2');
	});

	it('translate `term1 N3 term2` -> OV `term1 ADJ3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 N3 term2', 'Ovid MEDLINE')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 N3 term2` -> CO `term1 NEAR/3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 N3 term2', 'Cochrane Library')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 N3 term2` -> EM `Term1 NEAR3 Term2`', ()=> {
		expect(polyglot.translateGeneric('term1 N3 term2', 'Embase (Elsevier)')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 N3 term2` -> CI `term1 N3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 N3 term2', 'CINAHL (Ebsco)')).to.equal('term1 N3 term2');
	});

	it('translate `term1 N3 term2` -> PY `term1 ADJ3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 N3 term2', 'PsycInfo (Ovid)')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 N3 term2` -> SC `term1 W/3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 N3 term2', 'Scopus (advanced search)')).to.equal('"term1" W/3 "term2"');
	});

	it('translate `term1 N3 term2` -> WS `term1 NEAR/3 term2`', ()=> {
		expect(polyglot.translateGeneric('term1 N3 term2', 'Web of Science')).to.equal('term1 NEAR/3 term2');
	});

});
