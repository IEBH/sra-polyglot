var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Translate title + abstract searches (PubMed -> *)', () => {

	it('translate `term[tiab]` -> PM `term[tiab]`', () => {
		expect(polyglot.translate('term[tiab]', 'PubMed abbreviation')).to.equal('term[tiab]');
	});

	it('translate `term[tiab]` -> OV `term.tw.`', () => {
		expect(polyglot.translate('term[tiab]', 'Ovid MEDLINE')).to.equal('term.tw.');
	});

	it('translate `term[tiab]` -> CO `term:ti,ab`', () => {
		expect(polyglot.translate('term[tiab]', 'Cochrane Library')).to.equal('term:ti,ab');
	});

	it('translate `term[tiab]` -> EM `term:ti,ab`', () => {
		expect(polyglot.translate('term[tiab]', 'Embase (Elsevier)')).to.equal('term:ti,ab');
	});

	it('translate `term[tiab]` -> CI `TI term OR AB term2`', () => {
		expect(polyglot.translate('term[tiab]', 'CINAHL (Ebsco)')).to.equal('(TI term OR AB term)');
	});

	it('translate `term[tiab]` -> PY `term.ti,ab.`', () => {
		expect(polyglot.translate('term[tiab]', 'PsycInfo (Ovid)')).to.equal('term.ti,ab.');
	});

	it('translate `term[tiab]` -> SC `TITLE-ABS(term)`', () => {
		expect(polyglot.translate('term[tiab]', 'Scopus (advanced search)')).to.equal('TITLE-ABS(term)');
	});

	it('translate `term[tiab]` -> WS `term`', () => {
		expect(polyglot.translate('term[tiab]', 'Web of Science')).to.equal('term');
	});

	//International HTA Database
	it('translate `term[tiab]` -> HTA `(term)[title] OR (term)[abs]`', () => {
		expect(polyglot.translate('term[tiab]', 'International HTA Database')).to.equal('(term)[title] OR (term)[abs]');
	});

	// PsycInfo(Ebsco)
	it('translate `term[tiab]` -> PYE `TI term OR AB term2`', () => {
		expect(polyglot.translate('term[tiab]', 'PsycInfo (Ebsco)')).to.equal('(TI term OR AB term)');
	});
});

describe('Translate title + abstract searches (PubMed -> *)', () => {

	it('translate `term[Title/Abstract]` -> PM `term[tiab]`', () => {
		expect(polyglot.translate('term[Title/Abstract]', 'PubMed abbreviation')).to.equal('term[tiab]');
	});

	it('translate `term[Title/Abstract]` -> OV `term.tw`', () => {
		expect(polyglot.translate('term[Title/Abstract]', 'Ovid MEDLINE')).to.equal('term.tw.');
	});

	it('translate `term[Title/Abstract]` -> CO `term:ti,ab`', () => {
		expect(polyglot.translate('term[Title/Abstract]', 'Cochrane Library')).to.equal('term:ti,ab');
	});

	it('translate `term[Title/Abstract]` -> EM `term:ti,ab`', () => {
		expect(polyglot.translate('term[Title/Abstract]', 'Embase (Elsevier)')).to.equal('term:ti,ab');
	});

	it('translate `term[Title/Abstract]` -> CI `TI term OR AB term2`', () => {
		expect(polyglot.translate('term[Title/Abstract]', 'CINAHL (Ebsco)')).to.equal('(TI term OR AB term)');
	});

	it('translate `term[Title/Abstract]` -> PY `term.ti,ab.`', () => {
		expect(polyglot.translate('term[Title/Abstract]', 'PsycInfo (Ovid)')).to.equal('term.ti,ab.');
	});

	it('translate `term[Title/Abstract]` -> SC `TITLE-ABS(term)`', () => {
		expect(polyglot.translate('term[Title/Abstract]', 'Scopus (advanced search)')).to.equal('TITLE-ABS(term)');
	});

	it('translate `term[Title/Abstract]` -> WS `term`', () => {
		expect(polyglot.translate('term[Title/Abstract]', 'Web of Science')).to.equal('term');
	});

	//International HTA Database
	it('translate `term[Title/Abstract]` -> HTA `(term)[title] OR (term)[abs]`', () => {
		expect(polyglot.translate('term[Title/Abstract]', 'International HTA Database')).to.equal('(term)[title] OR (term)[abs]');
	});

	// PsycInfo(Ebsco)
	it('translate `term[Title/Abstract]` -> PYE `TI term OR AB term2`', () => {
		expect(polyglot.translate('term[Title/Abstract]', 'PsycInfo (Ebsco)')).to.equal('(TI term OR AB term)');
	});
});

describe('Translate title + abstract searches (Ovid MEDLINE `term.ti,ab` format) -> *)', () => {

	it('translate `term.ti,ab` -> PM `term[tiab]`', () => {
		expect(polyglot.translate('term.ti,ab', 'PubMed abbreviation')).to.equal('term[tiab]');
	});

	it('translate `term.tw` -> OV `term.ti,ab`', () => {
		expect(polyglot.translate('term.ti,ab', 'Ovid MEDLINE')).to.equal('term.tw.');
	});

	it('translate `term.ti,ab` -> CO `term.ti,ab`', () => {
		expect(polyglot.translate('term.ti,ab', 'Cochrane Library')).to.equal('term:ti,ab');
	});

	it('translate `term.ti,ab` -> EM `term.ti,ab`', () => {
		expect(polyglot.translate('term.ti,ab', 'Embase (Elsevier)')).to.equal('term:ti,ab');
	});

	it('translate `term.ti,ab` -> CI `TI term OR AB term`', () => {
		expect(polyglot.translate('term.ti,ab', 'CINAHL (Ebsco)')).to.equal('(TI term OR AB term)');
	});

	it('translate `term.ti,ab` -> PY `term.ti,ab.`', () => {
		expect(polyglot.translate('term.ti,ab', 'PsycInfo (Ovid)')).to.equal('term.ti,ab.');
	});

	it('translate `term.ti,ab` -> SC `TITLE-ABS(term)`', () => {
		expect(polyglot.translate('term.ti,ab', 'Scopus (advanced search)')).to.equal('TITLE-ABS(term)');
	});

	it('translate `term.ti,ab` -> WS `term`', () => {
		expect(polyglot.translate('term.ti,ab', 'Web of Science')).to.equal('term');
	});

	//International HTA Database
	it('translate `term.ti,ab` -> HTA `(term)[title] OR (term)[abs]`', () => {
		expect(polyglot.translate('term.ti,ab', 'International HTA Database')).to.equal('(term)[title] OR (term)[abs]');
	});

	// PsycInfo(Ebsco)
	it('translate `term.ti,ab` -> PYE `TI term OR AB term`', () => {
		expect(polyglot.translate('term.ti,ab', 'PsycInfo (Ebsco)')).to.equal('(TI term OR AB term)');
	});
});

describe('Translate title + abstract searches (Ovid MEDLINE `term.tw` format) -> *)', () => {

	it('translate `term.tw.` -> PM `term[tiab]`', () => {
		expect(polyglot.translate('term.tw.', 'PubMed abbreviation')).to.equal('term[tiab]');
	});

	it('translate `term.tw.` -> OV `term.tw.`', () => {
		expect(polyglot.translate('term.tw.', 'Ovid MEDLINE')).to.equal('term.tw.');
	});

	it('translate `term.tw.` -> CO `term:ti,ab`', () => {
		expect(polyglot.translate('term.tw.', 'Cochrane Library')).to.equal('term:ti,ab');
	});

	it('translate `term.tw.` -> EM `term:ti,ab`', () => {
		expect(polyglot.translate('term.tw.', 'Embase (Elsevier)')).to.equal('term:ti,ab');
	});

	it('translate `term.tw.` -> CI `TI term OR AB term`', () => {
		expect(polyglot.translate('term.tw.', 'CINAHL (Ebsco)')).to.equal('(TI term OR AB term)');
	});

	it('translate `term.tw.` -> PY `term.ti,ab.`', () => {
		expect(polyglot.translate('term.tw.', 'PsycInfo (Ovid)')).to.equal('term.ti,ab.');
	});

	it('translate `term.tw.` -> SC `TITLE-ABS(term)`', () => {
		expect(polyglot.translate('term.tw.', 'Scopus (advanced search)')).to.equal('TITLE-ABS(term)');
	});

	it('translate `term.tw.` -> WS `term`', () => {
		expect(polyglot.translate('term.tw.', 'Web of Science')).to.equal('term');
	});

	//International HTA Database
	it('translate `term.tw` -> HTA `(term)[title] OR (term)[abs]`', () => {
		expect(polyglot.translate('term.tw', 'International HTA Database')).to.equal('(term)[title] OR (term)[abs]');
	});

	// PsycInfo(Ebsco)
	it('translate `term.tw.` -> PYE `TI term OR AB term`', () => {
		expect(polyglot.translate('term.tw.', 'PsycInfo (Ebsco)')).to.equal('(TI term OR AB term)');
	});
});

describe('Translate abstract + title searches (Ovid MEDLINE `term.ab,ti` format) -> *)', () => {

	it('translate `term.ab,ti` -> PM `term[tiab]`', () => {
		expect(polyglot.translate('term.ab,ti', 'PubMed abbreviation')).to.equal('term[tiab]');
	});

	it('translate `term.ab,ti` -> OV `term.tw`', () => {
		expect(polyglot.translate('term.ab,ti', 'Ovid MEDLINE')).to.equal('term.tw.');
	});

	it('translate `term.ab,ti` -> CO `term.tw.`', () => {
		expect(polyglot.translate('term.ab,ti', 'Cochrane Library')).to.equal('term:ti,ab');
	});

	it('translate `term.ab,ti` -> EM `term.tw.`', () => {
		expect(polyglot.translate('term.ab,ti', 'Embase (Elsevier)')).to.equal('term:ti,ab');
	});

	it('translate `term.ab,ti` -> CI `TI term OR AB term`', () => {
		expect(polyglot.translate('term.ab,ti', 'CINAHL (Ebsco)')).to.equal('(TI term OR AB term)');
	});

	it('translate `term.ab,ti` -> PY `term.ti,ab.`', () => {
		expect(polyglot.translate('term.ab,ti', 'PsycInfo (Ovid)')).to.equal('term.ti,ab.');
	});

	it('translate `term.ab,ti` -> SC `TITLE-ABS(term)`', () => {
		expect(polyglot.translate('term.ab,ti', 'Scopus (advanced search)')).to.equal('TITLE-ABS(term)');
	});

	it('translate `term.ab,ti` -> WS `term`', () => {
		expect(polyglot.translate('term.ab,ti', 'Web of Science')).to.equal('term');
	});

	//International HTA Database
	it('translate `term.ab,ti` -> HTA `(term)[title] OR (term)[abs]`', () => {
		expect(polyglot.translate('term.ab,ti', 'International HTA Database')).to.equal('(term)[title] OR (term)[abs]');
	});

	// PsycInfo(Ebsco)
	it('translate `term.ab,ti` -> PYE `TI term OR AB term`', () => {
		expect(polyglot.translate('term.ab,ti', 'PsycInfo (Ebsco)')).to.equal('(TI term OR AB term)');
	});
});

describe('Translate abstract + title searches (Ovid MEDLINE `term.ab,ti.` format) -> *)', () => {

	it('translate `term.ab,ti.` -> PM `term[tiab]`', () => {
		expect(polyglot.translate('term.ab,ti.', 'PubMed abbreviation')).to.equal('term[tiab]');
	});

	it('translate `term.ab,ti.` -> OV `term.tw`', () => {
		expect(polyglot.translate('term.ab,ti.', 'Ovid MEDLINE')).to.equal('term.tw.');
	});

	it('translate `term.ab,ti.` -> CO `term.tw.`', () => {
		expect(polyglot.translate('term.ab,ti.', 'Cochrane Library')).to.equal('term:ti,ab');
	});

	it('translate `term.ab,ti.` -> EM `term.tw.`', () => {
		expect(polyglot.translate('term.ab,ti.', 'Embase (Elsevier)')).to.equal('term:ti,ab');
	});

	it('translate `term.ab,ti.` -> CI `TI term OR AB term`', () => {
		expect(polyglot.translate('term.ab,ti.', 'CINAHL (Ebsco)')).to.equal('(TI term OR AB term)');
	});

	it('translate `term.ab,ti.` -> PY `term.ti,ab.`', () => {
		expect(polyglot.translate('term.ab,ti.', 'PsycInfo (Ovid)')).to.equal('term.ti,ab.');
	});

	it('translate `term.ab,ti.` -> SC `TITLE-ABS(term)`', () => {
		expect(polyglot.translate('term.ab,ti.', 'Scopus (advanced search)')).to.equal('TITLE-ABS(term)');
	});

	it('translate `term.ab,ti.` -> WS `term`', () => {
		expect(polyglot.translate('term.ab,ti.', 'Web of Science')).to.equal('term');
	});

	//International HTA Database
	it('translate `term.ab,ti.` -> HTA `(term)[title] OR (term)[abs]`', () => {
		expect(polyglot.translate('term.ab,ti.', 'International HTA Database')).to.equal('(term)[title] OR (term)[abs]');
	})

	// PsycInfo (Ebsco)
	it('translate `term.ab,ti.` -> PYE `TI term OR AB term`', () => {
		expect(polyglot.translate('term.ab,ti.', 'PsycInfo (Ebsco)')).to.equal('(TI term OR AB term)');
	});
});
