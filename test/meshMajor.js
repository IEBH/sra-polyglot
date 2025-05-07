var expect = require('chai').expect;
const polyglot = require('../lib').default;

describe('Translate Mesh which appears later in search (Pubmed -> *)', () => {
	it('translate `Language[Majr]` -> OV `exp *Language/`', () => {
		expect(polyglot.translate(
			'Title[ti] and Language[Majr]', 'Ovid MEDLINE'
		)).to.equal(
			'Title.ti. AND exp *Language/'
		);
	});
	it('translate `"Practice Guidelines as Topic"[Majr]` -> OV `exp *"Practice Guidelines as Topic"/`', () => {
		expect(polyglot.translate(
			'Title[ti] and "Practice Guidelines as Topic"[Majr]', 'Ovid MEDLINE'
		)).to.equal(
			'Title.ti. AND exp *"Practice Guidelines as Topic"/'
		);
	});
	it('translate `Sandwiched mesh` -> OV', () => {
		expect(polyglot.translate(
			'"Practice Guidelines as Topic"[Majr] OR Guideline[ti] OR "Guideline Adherence"[Majr]', 'Ovid MEDLINE'
		)).to.equal(
			'exp *"Practice Guidelines as Topic"/ OR Guideline.ti. OR exp *"Guideline Adherence"/'
		);
	});
})

//MeSH Major Topic search (exploded)
describe('Translate MeSH major terms (PubMed -> *)', () => {

	it('translate `term[Majr]` -> PM `term[Majr]`', () => {
		expect(polyglot.translate('term[Majr]', 'PubMed abbreviation')).to.equal('term[Majr]');
	});

	it('translate `term[Majr]` -> OV `exp *term/`', () => {
		expect(polyglot.translate('term[Majr]', 'Ovid MEDLINE')).to.equal('exp *term/');
	});

	it('translate `term[Majr]` -> CO `[mh term]`', () => {
		expect(polyglot.translate('term[Majr]', 'Cochrane Library')).to.equal('[mh term]');
	});

	it('translate `term[Majr]` -> EM `term/exp/mj`', () => {
		expect(polyglot.translate('term[Majr]', 'Embase (Elsevier)')).to.equal("term/exp/mj");
	});

	it('translate `term[Majr]` -> CI `(MM term+)`', () => {
		expect(polyglot.translate('term[Majr]', 'CINAHL (Ebsco)')).to.equal('(MM term+)');
	});

	it('translate `term[Majr]` -> PY `exp *term/`', () => {
		expect(polyglot.translate('term[Majr]', 'PsycInfo (Ovid)')).to.equal('exp *term/');
	});

	it('translate `term[Majr]` -> SC `((INDEXTERMS(term))`', () => {
		expect(polyglot.translate('term[Majr]', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term)');
	});

	it('translate `term[Majr]` -> WS `term`', () => {
		expect(polyglot.translate('term[Majr]', 'Web of Science')).to.equal('term');
	});

	//International HTA Database
	it('translate `term[Majr]` -> HTA `term[mhe]`', () => {
		expect(polyglot.translate('term[Majr]', 'International HTA Database')).to.equal('term[mhe]');
	})

	// PsycInfo (Ebsco)
	it('translate `term[Majr]` -> PYE `(MM term+)`', () => {
		expect(polyglot.translate('term[Majr]', 'PsycInfo (Ebsco)')).to.equal('(MM term+)');
	});

	// Business Source Ultimate
	it('translate `term[Majr]` -> BU `(MM term+)`', () => {
		expect(polyglot.translate('term[Majr]', 'Business Source Ultimate')).to.equal('(MM term+)');
	});

	// Lilacs
	// it('translate `term[Majr]` -> LI `(mh:term)`', () => {
	// 	expect(polyglot.translate('term[Majr]', 'Lilacs')).to.equal('(mh:term)');
	// });

});

//PubMed Full
describe('Translate Translate MeSH major terms (PubMed (long) -> *)', () => {

	it('translate `term[MeSH Major Topic]` -> PM `term[Majr]`', () => {
		expect(polyglot.translate('term[MeSH Major Topic]', 'PubMed abbreviation')).to.equal('term[Majr]');
	});

	it('translate `term[MeSH Major Topic]` -> OV `exp *term/`', () => {
		expect(polyglot.translate('term[MeSH Major Topic]', 'Ovid MEDLINE')).to.equal('exp *term/');
	});

	it('translate `term[MeSH Major Topic]` -> CO `[mh term]`', () => {
		expect(polyglot.translate('term[MeSH Major Topic]', 'Cochrane Library')).to.equal('[mh term]');
	});

	it('translate `term[MeSH Major Topic]` -> EM `term/exp/mj`', () => {
		expect(polyglot.translate('term[MeSH Major Topic]', 'Embase (Elsevier)')).to.equal("term/exp/mj");
	});

	it('translate `term[MeSH Major Topic]` -> CI `(MM term+)`', () => {
		expect(polyglot.translate('term[MeSH Major Topic]', 'CINAHL (Ebsco)')).to.equal('(MM term+)');
	});

	it('translate `term[MeSH Major Topic]` -> PY `exp *term/`', () => {
		expect(polyglot.translate('term[MeSH Major Topic]', 'PsycInfo (Ovid)')).to.equal('exp *term/');
	});

	it('translate `term[MeSH Major Topic]` -> SC `((INDEXTERMS(term))`', () => {
		expect(polyglot.translate('term[MeSH Major Topic]', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term)');
	});

	it('translate `term[MeSH Major Topic]` -> WS `term`', () => {
		expect(polyglot.translate('term[MeSH Major Topic]', 'Web of Science')).to.equal('term');
	});

	//International HTA Database
	it('translate `term[MeSH Major Topic]` -> HTA `term[mhe]`', () => {
		expect(polyglot.translate('term[MeSH Major Topic]', 'International HTA Database')).to.equal('term[mhe]');
	});

	// PsycInfo (Ebsco)
	it('translate `term[MeSH Major Topic]` -> PYE `(MM term+)`', () => {
		expect(polyglot.translate('term[MeSH Major Topic]', 'PsycInfo (Ebsco)')).to.equal('(MM term+)');
	});

	// Business Source Ultimate
	it('translate `term[MeSH Major Topic]` -> BU `(MM term+)`', () => {
		expect(polyglot.translate('term[MeSH Major Topic]', 'Business Source Ultimate')).to.equal('(MM term+)');
	});

});

describe('Translate Translate MeSH major terms (Ovid MEDLINE -> *)', () => {

	it('translate `exp *term/` -> PM `term[Majr]`', () => {
		expect(polyglot.translate('exp *term/', 'PubMed abbreviation')).to.equal('term[Majr]');
	});

	it('translate `exp *term/` -> OV `exp *term/`', () => {
		expect(polyglot.translate('exp *term/', 'Ovid MEDLINE')).to.equal('exp *term/');
	});

	it('translate `termexp *term/` -> CO `[mh term]`', () => {
		expect(polyglot.translate('exp *term/', 'Cochrane Library')).to.equal('[mh term]');
	});

	it('translate `exp *term/` -> EM `term/exp/mj`', () => {
		expect(polyglot.translate('exp *term/', 'Embase (Elsevier)')).to.equal("term/exp/mj");
	});

	it('translate `exp *term/` -> CI `(MM term+)`', () => {
		expect(polyglot.translate('exp *term/', 'CINAHL (Ebsco)')).to.equal('(MM term+)');
	});

	it('translate `exp *term/` -> PY `exp *term/`', () => {
		expect(polyglot.translate('exp *term/', 'PsycInfo (Ovid)')).to.equal('exp *term/');
	});

	it('translate `exp *term/` -> SC `((INDEXTERMS(term))`', () => {
		expect(polyglot.translate('exp *term/', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term)');
	});

	it('translate `exp *term/` -> WS `term`', () => {
		expect(polyglot.translate('exp *term/', 'Web of Science')).to.equal('term');
	});

	//International HTA Database
	it('translate `exp *term/` -> HTA `term[mhe]`', () => {
		expect(polyglot.translate('exp *term/', 'International HTA Database')).to.equal('term[mhe]');
	});

	// PsycInfo (Ebsco)
	it('translate `exp *term/` -> PYE `(MM term+)`', () => {
		expect(polyglot.translate('exp *term/', 'PsycInfo (Ebsco)')).to.equal('(MM term+)');
	});

	// Business Source Ultimate
	it('translate `exp *term/` -> BU `(MM term+)`', () => {
		expect(polyglot.translate('exp *term/', 'Business Source Ultimate')).to.equal('(MM term+)');
	});

});
