var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Translate adjacency searches (ADJ format)', () => {

	it('translate `term1 ADJ3 term2` -> PM `term1 AND term2`', () => {
		expect(polyglot.translate('term1 ADJ3 term2', 'PubMed abbreviation')).to.equal('term1 AND term2');
	});

	it('translate `term1 ADJ3 term2` -> OV `term1 ADJ3 term2`', () => {
		expect(polyglot.translate('term1 ADJ3 term2', 'Ovid MEDLINE')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 ADJ3 term2` -> CO `term1 NEAR/3 term2`', () => {
		expect(polyglot.translate('term1 ADJ3 term2', 'Cochrane Library')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 ADJ3 term2` -> EM `term1 NEAR/3 term2`', () => {
		expect(polyglot.translate('term1 ADJ3 term2', 'Embase (Elsevier)')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 ADJ3 term2` -> CI `term1 N3 term2`', () => {
		expect(polyglot.translate('term1 ADJ3 term2', 'CINAHL (Ebsco)')).to.equal('term1 N3 term2');
	});

	it('translate `term1 ADJ3 term2` -> PY `term1 ADJ3 term2`', () => {
		expect(polyglot.translate('term1 ADJ3 term2', 'PsycInfo (Ovid)')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 ADJ3 term2` -> SC `term1 W/3 term2`', () => {
		expect(polyglot.translate('term1 ADJ3 term2', 'Scopus (advanced search)')).to.equal('term1 W/3 term2');
	});

	it('translate `term1 ADJ3 term2` -> WS `term1 NEAR/3 term2`', () => {
		expect(polyglot.translate('term1 ADJ3 term2', 'Web of Science')).to.equal('term1 NEAR/3 term2');
	});

	//International HTA Database
	it('translate `term1 ADJ3 term2` -> HTA `term1 AND term2`', () => {
		expect(polyglot.translate('term1 ADJ3 term2', 'International HTA Database')).to.equal('term1 AND term2');
	});

	// PsycInfo(Ebsco)
	it('translate `term1 ADJ3 term2` -> PYE `term1 N3 term2`', () => {
		expect(polyglot.translate('term1 ADJ3 term2', 'PsycInfo (Ebsco)')).to.equal('term1 N3 term2');
	});

	// Business Source Ultimate
	it('translate `term1 ADJ3 term2` -> BU `term1 N3 term2`', () => {
		expect(polyglot.translate('term1 ADJ3 term2', 'Business Source Ultimate')).to.equal('term1 N3 term2');
	});

});

describe('Translate adjacency searches (NEAR3 format)', () => {

	it('translate `term1 NEAR3 term2` -> PM `term1 AND term2`', () => {
		expect(polyglot.translate('term1 NEAR3 term2', 'PubMed abbreviation')).to.equal('term1 AND term2');
	});

	it('translate `term1 NEAR3 term2` -> OV `term1 ADJ3 term2`', () => {
		expect(polyglot.translate('term1 NEAR3 term2', 'Ovid MEDLINE')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 NEAR3 term2` -> CO `term1 NEAR/3 term2`', () => {
		expect(polyglot.translate('term1 NEAR/3 term2', 'Cochrane Library')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 NEAR3 term2` -> EM `term1 NEAR/3 term2`', () => {
		expect(polyglot.translate('term1 NEAR3 term2', 'Embase (Elsevier)')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 NEAR3 term2` -> CI `term1 N3 term2`', () => {
		expect(polyglot.translate('term1 NEAR3 term2', 'CINAHL (Ebsco)')).to.equal('term1 N3 term2');
	});

	it('translate `term1 NEAR3 term2` -> PY `term1 ADJ3 term2`', () => {
		expect(polyglot.translate('term1 NEAR3 term2', 'PsycInfo (Ovid)')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 NEAR3 term2` -> SC `term1 W/3 term2`', () => {
		expect(polyglot.translate('term1 NEAR3 term2', 'Scopus (advanced search)')).to.equal('term1 W/3 term2');
	});

	it('translate `term1 NEAR3 term2` -> WS `term1 NEAR/3 term2`', () => {
		expect(polyglot.translate('term1 NEAR3 term2', 'Web of Science')).to.equal('term1 NEAR/3 term2');
	});

	//International HTA Database
	it('translate `term1 NEAR3 term2` -> HTA `term1 AND term2`', () => {
		expect(polyglot.translate('term1 NEAR3 term2', 'International HTA Database')).to.equal('term1 AND term2');
	});

	// PsycInfo (Ebsco)
	it('translate `term1 NEAR3 term2` -> PYE `term1 N3 term2`', () => {
		expect(polyglot.translate('term1 NEAR3 term2', 'PsycInfo (Ebsco)')).to.equal('term1 N3 term2');
	});

	// Business Source Ultimate
	it('translate `term1 NEAR3 term2` -> BU `term1 N3 term2`', () => {
		expect(polyglot.translate('term1 NEAR3 term2', 'Business Source Ultimate')).to.equal('term1 N3 term2');
	});

});


describe('Translate adjacency searches (NEAR/3 format)', () => {

	it('translate `term1 NEAR/3 term2` -> PM `term1 AND term2`', () => {
		expect(polyglot.translate('term1 NEAR/3 term2', 'PubMed abbreviation')).to.equal('term1 AND term2');
	});

	it('translate `term1 NEAR/3 term2` -> OV `term1 ADJ3 term2`', () => {
		expect(polyglot.translate('term1 NEAR/3 term2', 'Ovid MEDLINE')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 NEAR/3 term2` -> CO `term1 NEAR/3 term2`', () => {
		expect(polyglot.translate('term1 NEAR/3 term2', 'Cochrane Library')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 NEAR/3 term2` -> EM `term1 NEAR/3 term2`', () => {
		expect(polyglot.translate('term1 NEAR/3 term2', 'Embase (Elsevier)')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 NEAR/3 term2` -> CI `term1 N3 term2`', () => {
		expect(polyglot.translate('term1 NEAR/3 term2', 'CINAHL (Ebsco)')).to.equal('term1 N3 term2');
	});

	it('translate `term1 NEAR/3 term2` -> PY `term1 ADJ3 term2`', () => {
		expect(polyglot.translate('term1 NEAR/3 term2', 'PsycInfo (Ovid)')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 NEAR/3 term2` -> SC `term1 W/3 term2`', () => {
		expect(polyglot.translate('term1 NEAR/3 term2', 'Scopus (advanced search)')).to.equal('term1 W/3 term2');
	});

	it('translate `term1 NEAR/3 term2` -> WS `term1 NEAR/3 term2`', () => {
		expect(polyglot.translate('term1 NEAR/3 term2', 'Web of Science')).to.equal('term1 NEAR/3 term2');
	});

	//International HTA Database
	it('translate `term1 NEAR/3 term2` -> HTA `term1 AND term2`', () => {
		expect(polyglot.translate('term1 NEAR/3 term2', 'International HTA Database')).to.equal('term1 AND term2');
	});

	// PsycInfo(Ebsco)
	it('translate `term1 NEAR/3 term2` -> PYE `term1 N3 term2`', () => {
		expect(polyglot.translate('term1 NEAR/3 term2', 'PsycInfo (Ebsco)')).to.equal('term1 N3 term2');
	});

	// Business Source Ultimate
	it('translate `term1 NEAR/3 term2` -> BU `term1 N3 term2`', () => {
		expect(polyglot.translate('term1 NEAR/3 term2', 'Business Source Ultimate')).to.equal('term1 N3 term2');
	});
});


describe('Translate adjacency searches (N3 format)', () => {

	it('translate `term1 N3 term2` -> PM `term1 AND term2`', () => {
		expect(polyglot.translate('term1 N3 term2', 'PubMed abbreviation')).to.equal('term1 AND term2');
	});

	it('translate `term1 N3 term2` -> OV `term1 ADJ3 term2`', () => {
		expect(polyglot.translate('term1 N3 term2', 'Ovid MEDLINE')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 N3 term2` -> CO `term1 NEAR/3 term2`', () => {
		expect(polyglot.translate('term1 N3 term2', 'Cochrane Library')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 N3 term2` -> EM `Term1 NEAR3 Term2`', () => {
		expect(polyglot.translate('term1 N3 term2', 'Embase (Elsevier)')).to.equal('term1 NEAR/3 term2');
	});

	it('translate `term1 N3 term2` -> CI `term1 N3 term2`', () => {
		expect(polyglot.translate('term1 N3 term2', 'CINAHL (Ebsco)')).to.equal('term1 N3 term2');
	});

	it('translate `term1 N3 term2` -> PY `term1 ADJ3 term2`', () => {
		expect(polyglot.translate('term1 N3 term2', 'PsycInfo (Ovid)')).to.equal('term1 ADJ3 term2');
	});

	it('translate `term1 N3 term2` -> SC `term1 W/3 term2`', () => {
		expect(polyglot.translate('term1 N3 term2', 'Scopus (advanced search)')).to.equal('term1 W/3 term2');
	});

	it('translate `term1 N3 term2` -> WS `term1 NEAR/3 term2`', () => {
		expect(polyglot.translate('term1 N3 term2', 'Web of Science')).to.equal('term1 NEAR/3 term2');
	});

	//International HTA Database
	it('translate `term1 N3 term2` -> HTA `term1 AND term2`', () => {
		expect(polyglot.translate('term1 N3 term2', 'International HTA Database')).to.equal('term1 AND term2');
	});

	// PsycInfo(Ebsco)
	it('translate `term1 N3 term2` -> PYE `term1 N3 term2`', () => {
		expect(polyglot.translate('term1 N3 term2', 'PsycInfo (Ebsco)')).to.equal('term1 N3 term2');
	});

	// Business Source Ultimate
	it('translate `term1 N3 term2` -> BU `term1 N3 term2`', () => {
		expect(polyglot.translate('term1 N3 term2', 'Business Source Ultimate')).to.equal('term1 N3 term2');
	});

});

describe('Translate edge case adjacency fields Cinahl', () => {
	it('translate `title`', () => {
		expect(polyglot.translate('(term1 adj3 term2).ti.', 'CINAHL (Ebsco)')).to.equal('((TI term1) N3 (TI term2))');
	});

	it('translate `abstract`', () => {
		expect(polyglot.translate('(term1 adj3 term2).ab.', 'CINAHL (Ebsco)')).to.equal('((AB term1) N3 (AB term2))');
	});

	it('translate `author`', () => {
		expect(polyglot.translate('(term1 adj3 term2).au.', 'CINAHL (Ebsco)')).to.equal('((AU term1) N3 (AU term2))');
	});

	it('translate `ISBN`', () => {
		expect(polyglot.translate('(term1 adj3 term2).ib.', 'CINAHL (Ebsco)')).to.equal('((IB term1) N3 (IB term2))');
	});

	it('translate `journal issue numbers`', () => {
		expect(polyglot.translate('(term1 adj3 term2).ip.', 'CINAHL (Ebsco)')).to.equal('((IP term1) N3 (IP term2))');
	});
});

//International HTA Database
describe('Translate Ovid MEDLINE adjacency fields to HTA', () => {
	it('translate `title`', () => {
		expect(polyglot.translate('(term1 adj3 term2).ti.', 'International HTA Database')).to.equal('((term1)[title] AND (term2)[title])');
	});

	it('translate `abstract`', () => {
		expect(polyglot.translate('(term1 adj3 term2).ab.', 'International HTA Database')).to.equal('((term1)[abs] AND (term2)[abs])');
	});

	it('translate `author`', () => {
		expect(polyglot.translate('(term1 adj3 term2).au.', 'International HTA Database')).to.equal('((term1)[Author] AND (term2)[Author])');
	});

	it('translate `ISBN`', () => {
		expect(polyglot.translate('(term1 adj3 term2).ib.', 'International HTA Database')).to.equal('(term1 AND term2)');
	});

	it('translate `journal issue numbers`', () => {
		expect(polyglot.translate('(term1 adj3 term2).ip.', 'International HTA Database')).to.equal('(term1 AND term2)');
	});
});

// PsycInfo(Ebsco)

describe('Translate edge case adjacency fields PsycInfo', () => {
	it('translate `title`', () => {
		expect(polyglot.translate('(term1 adj3 term2).ti.', 'PsycInfo (Ebsco)')).to.equal('((TI term1) N3 (TI term2))');
	});

	it('translate `abstract`', () => {
		expect(polyglot.translate('(term1 adj3 term2).ab.', 'PsycInfo (Ebsco)')).to.equal('((AB term1) N3 (AB term2))');
	});

	it('translate `author`', () => {
		expect(polyglot.translate('(term1 adj3 term2).au.', 'PsycInfo (Ebsco)')).to.equal('((AU term1) N3 (AU term2))');
	});

	it('translate `ISBN`', () => {
		expect(polyglot.translate('(term1 adj3 term2).ib.', 'PsycInfo (Ebsco)')).to.equal('((IB term1) N3 (IB term2))');
	});

	it('translate `journal issue numbers`', () => {
		expect(polyglot.translate('(term1 adj3 term2).ip.', 'PsycInfo (Ebsco)')).to.equal('((IP term1) N3 (IP term2))');
	});
});

// Business Source Ultimate
describe('Translate edge case adjacency fields Business', () => {
	it('translate `title`', () => {
		expect(polyglot.translate('(term1 adj3 term2).ti.', 'Business Source Ultimate')).to.equal('((TI term1) N3 (TI term2))');
	});

	it('translate `abstract`', () => {
		expect(polyglot.translate('(term1 adj3 term2).ab.', 'Business Source Ultimate')).to.equal('((AB term1) N3 (AB term2))');
	});

	it('translate `author`', () => {
		expect(polyglot.translate('(term1 adj3 term2).au.', 'Business Source Ultimate')).to.equal('((AU term1) N3 (AU term2))');
	});

	it('translate `ISBN`', () => {
		expect(polyglot.translate('(term1 adj3 term2).ib.', 'Business Source Ultimate')).to.equal('((IB term1) N3 (IB term2))');
	});

	it('translate `journal issue numbers`', () => {
		expect(polyglot.translate('(term1 adj3 term2).ip.', 'Business Source Ultimate')).to.equal('((IP term1) N3 (IP term2))');
	});
});
