var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Translate adjacency searches (ADJ format)', ()=> {

	it('translate `term1 ADJ3 term2` -> PM `term1 AND term2`', ()=> {
		expect(polyglot.translate('term1 ADJ3 term2', 'PubMed abbreviation')).to.equal('term1 AND term2');
	});

	it('translate `term1 ADJ3 term2` -> OV `term1 ADJ3 term2`', ()=> {
		expect(polyglot.translate('term1 ADJ3 term2', 'Ovid MEDLINE')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 ADJ3 term2` -> CO `term1 NEAR/3 term2`', ()=> {
		expect(polyglot.translate('term1 ADJ3 term2', 'Cochrane Library')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 ADJ3 term2` -> EM `term1 NEAR/3 term2`', ()=> {
		expect(polyglot.translate('term1 ADJ3 term2', 'Embase (Elsevier)')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 ADJ3 term2` -> CI `term1 N3 term2`', ()=> {
		expect(polyglot.translate('term1 ADJ3 term2', 'CINAHL (Ebsco)')).to.equal('term1 N3 term2');
	});

	it('translate `term1 ADJ3 term2` -> PY `term1 ADJ3 term2`', ()=> {
		expect(polyglot.translate('term1 ADJ3 term2', 'PsycInfo (Ovid)')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 ADJ3 term2` -> SC `term1 W/3 term2`', ()=> {
		expect(polyglot.translate('term1 ADJ3 term2', 'Scopus (advanced search)')).to.equal('term1 W/3 term2');
	});

	it('translate `term1 ADJ3 term2` -> WS `term1 NEAR/3 term2`', ()=> {
		expect(polyglot.translate('term1 ADJ3 term2', 'Web of Science')).to.equal('term1 NEAR/3 term2');
	});

});

describe('Translate adjacency searches (NEAR3 format)', ()=> {

	it('translate `term1 NEAR3 term2` -> PM `term1 AND term2`', ()=> {
		expect(polyglot.translate('term1 NEAR3 term2', 'PubMed abbreviation')).to.equal('term1 AND term2');
	});

	it('translate `term1 NEAR3 term2` -> OV `term1 ADJ3 term2`', ()=> {
		expect(polyglot.translate('term1 NEAR3 term2', 'Ovid MEDLINE')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 NEAR3 term2` -> CO `term1 NEAR/3 term2`', ()=> {
		expect(polyglot.translate('term1 NEAR/3 term2', 'Cochrane Library')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 NEAR3 term2` -> EM `term1 NEAR/3 term2`', ()=> {
		expect(polyglot.translate('term1 NEAR3 term2', 'Embase (Elsevier)')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 NEAR3 term2` -> CI `term1 N3 term2`', ()=> {
		expect(polyglot.translate('term1 NEAR3 term2', 'CINAHL (Ebsco)')).to.equal('term1 N3 term2');
	});

	it('translate `term1 NEAR3 term2` -> PY `term1 ADJ3 term2`', ()=> {
		expect(polyglot.translate('term1 NEAR3 term2', 'PsycInfo (Ovid)')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 NEAR3 term2` -> SC `term1 W/3 term2`', ()=> {
		expect(polyglot.translate('term1 NEAR3 term2', 'Scopus (advanced search)')).to.equal('term1 W/3 term2');
	});

	it('translate `term1 NEAR3 term2` -> WS `term1 NEAR/3 term2`', ()=> {
		expect(polyglot.translate('term1 NEAR3 term2', 'Web of Science')).to.equal('term1 NEAR/3 term2');
	});

});


describe('Translate adjacency searches (NEAR/3 format)', ()=> {

	it('translate `term1 NEAR/3 term2` -> PM `term1 AND term2`', ()=> {
		expect(polyglot.translate('term1 NEAR/3 term2', 'PubMed abbreviation')).to.equal('term1 AND term2');
	});

	it('translate `term1 NEAR/3 term2` -> OV `term1 ADJ3 term2`', ()=> {
		expect(polyglot.translate('term1 NEAR/3 term2', 'Ovid MEDLINE')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 NEAR/3 term2` -> CO `term1 NEAR/3 term2`', ()=> {
		expect(polyglot.translate('term1 NEAR/3 term2', 'Cochrane Library')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 NEAR/3 term2` -> EM `term1 NEAR/3 term2`', ()=> {
		expect(polyglot.translate('term1 NEAR/3 term2', 'Embase (Elsevier)')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 NEAR/3 term2` -> CI `term1 N3 term2`', ()=> {
		expect(polyglot.translate('term1 NEAR/3 term2', 'CINAHL (Ebsco)')).to.equal('term1 N3 term2');
	});

	it('translate `term1 NEAR/3 term2` -> PY `term1 ADJ3 term2`', ()=> {
		expect(polyglot.translate('term1 NEAR/3 term2', 'PsycInfo (Ovid)')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 NEAR/3 term2` -> SC `term1 W/3 term2`', ()=> {
		expect(polyglot.translate('term1 NEAR/3 term2', 'Scopus (advanced search)')).to.equal('term1 W/3 term2');
	});

	it('translate `term1 NEAR/3 term2` -> WS `term1 NEAR/3 term2`', ()=> {
		expect(polyglot.translate('term1 NEAR/3 term2', 'Web of Science')).to.equal('term1 NEAR/3 term2');
	});

});


describe('Translate adjacency searches (N3 format)', ()=> {

	it('translate `term1 N3 term2` -> PM `term1 AND term2`', ()=> {
		expect(polyglot.translate('term1 N3 term2', 'PubMed abbreviation')).to.equal('term1 AND term2');
	});

	it('translate `term1 N3 term2` -> OV `term1 ADJ3 term2`', ()=> {
		expect(polyglot.translate('term1 N3 term2', 'Ovid MEDLINE')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 N3 term2` -> CO `term1 NEAR/3 term2`', ()=> {
		expect(polyglot.translate('term1 N3 term2', 'Cochrane Library')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 N3 term2` -> EM `Term1 NEAR3 Term2`', ()=> {
		expect(polyglot.translate('term1 N3 term2', 'Embase (Elsevier)')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 N3 term2` -> CI `term1 N3 term2`', ()=> {
		expect(polyglot.translate('term1 N3 term2', 'CINAHL (Ebsco)')).to.equal('term1 N3 term2');
	});

	it('translate `term1 N3 term2` -> PY `term1 ADJ3 term2`', ()=> {
		expect(polyglot.translate('term1 N3 term2', 'PsycInfo (Ovid)')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 N3 term2` -> SC `term1 W/3 term2`', ()=> {
		expect(polyglot.translate('term1 N3 term2', 'Scopus (advanced search)')).to.equal('term1 W/3 term2');
	});

	it('translate `term1 N3 term2` -> WS `term1 NEAR/3 term2`', ()=> {
		expect(polyglot.translate('term1 N3 term2', 'Web of Science')).to.equal('term1 NEAR/3 term2');
	});

});

describe('Translate edge case adjacency fields Cinahl', ()=> {
	it('translate `title`', ()=> {
		expect(polyglot.translate('(term1 adj3 term2).ti.', 'CINAHL (Ebsco)')).to.equal('((TI term1) N3 (TI term2))');
	});

	it('translate `abstract`', ()=> {
		expect(polyglot.translate('(term1 adj3 term2).ab.', 'CINAHL (Ebsco)')).to.equal('((AB term1) N3 (AB term2))');
	});

	it('translate `author`', ()=> {
		expect(polyglot.translate('(term1 adj3 term2).au.', 'CINAHL (Ebsco)')).to.equal('((AU term1) N3 (AU term2))');
	});

	it('translate `ISBN`', ()=> {
		expect(polyglot.translate('(term1 adj3 term2).ib.', 'CINAHL (Ebsco)')).to.equal('((IB term1) N3 (IB term2))');
	});

	it('translate `journal issue numbers`', ()=> {
		expect(polyglot.translate('(term1 adj3 term2).ip.', 'CINAHL (Ebsco)')).to.equal('((IP term1) N3 (IP term2))');
	});
});
