var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Translate title + abstract + other searches (PubMed -> *)', ()=> {

	it('translate `term[tw]` -> PM `term[tw]`', ()=> {
		expect(polyglot.translateGeneric('term[tw]', 'PubMed abbreviation')).to.equal('term[tw]');
	});

	it('translate `term[tw]` -> OV `term.mp.`', ()=> {
		expect(polyglot.translateGeneric('term[tw]', 'Ovid MEDLINE')).to.equal('term.mp.');
	});

	it('translate `term[tw]` -> CO `term:ti,ab,kw`', ()=> {
		expect(polyglot.translateGeneric('term[tw]', 'Cochrane Library')).to.equal('term:ti,ab,kw');
	});

	it('translate `term[tw]` -> EM `term:ti,ab,de,tn`', ()=> {
		expect(polyglot.translateGeneric('term[tw]', 'Embase (Elsevier)')).to.equal('term:ti,ab,de,tn');
	});

	it('translate `term[tw]` -> CI `term`', ()=> {
		expect(polyglot.translateGeneric('term[tw]', 'CINAHL (Ebsco)')).to.equal('term');
	});

	it('translate `term[tw]` -> PY `term.mp.`', ()=> {
		expect(polyglot.translateGeneric('term[tw]', 'PsycInfo (Ovid)')).to.equal('term.mp.');
	});

	it('translate `term[tw]` -> SC `TITLE-ABS-KEY(term)`', ()=> {
		expect(polyglot.translateGeneric('term[tw]', 'Scopus (advanced search)')).to.equal('TITLE-ABS-KEY(term)');
	});

	it('translate `term[tw]` -> WS `term`', ()=> {
		expect(polyglot.translateGeneric('term[tw]', 'Web of Science')).to.equal('term');
	});

});

describe('Translate title + abstract + other searches (Ovid MEDLINE -> *)', ()=> {

	it('translate `term.mp.` -> PM `term[tw]`', ()=> {
		expect(polyglot.translateGeneric('term.mp.', 'PubMed abbreviation')).to.equal('term[tw]');
	});

	it('translate `term.mp.` -> OV `term.mp.`', ()=> {
		expect(polyglot.translateGeneric('term.mp.', 'Ovid MEDLINE')).to.equal('term.mp.');
	});

	it('translate `term.mp.` -> CO `term:ti,ab,kw`', ()=> {
		expect(polyglot.translateGeneric('term.mp.', 'Cochrane Library')).to.equal('term:ti,ab,kw');
	});

	it('translate `term.mp.` -> EM `term:ti,ab,de,tn`', ()=> {
		expect(polyglot.translateGeneric('term.mp.', 'Embase (Elsevier)')).to.equal('term:ti,ab,de,tn');
	});

	it('translate `term.mp.` -> CI `term`', ()=> {
		expect(polyglot.translateGeneric('term.mp.', 'CINAHL (Ebsco)')).to.equal('term');
	});

	it('translate `term.mp.` -> PY `term.mp.`', ()=> {
		expect(polyglot.translateGeneric('term.mp.', 'PsycInfo (Ovid)')).to.equal('term.mp.');
	});

	it('translate `term.mp.` -> SC `TITLE-ABS-KEY(term)`', ()=> {
		expect(polyglot.translateGeneric('term.mp.', 'Scopus (advanced search)')).to.equal('TITLE-ABS-KEY(term)');
	});

	it('translate `term.mp.` -> WS `term`', ()=> {
		expect(polyglot.translateGeneric('term.mp.', 'Web of Science')).to.equal('term');
	});

});

describe('Translate title + abstract + other searches, with automated gunk (Ovid MEDLINE -> *)', ()=> {

	it('translate `term.mp. [...]` -> PM `term[tw]`', ()=> {
		expect(polyglot.translateGeneric('term.mp. [mp=title, abstract, original title, name of substance word, subject heading word, keyword heading word, protocol supplementary concept word, rare disease supplementary concept word, unique identifier, synonyms]', 'PubMed abbreviation')).to.equal('term[tw]');
	});

	it('translate `term.mp. [...]` -> OV `term.mp.`', ()=> {
		expect(polyglot.translateGeneric('term.mp. [mp=title, abstract, original title, name of substance word, subject heading word, keyword heading word, protocol supplementary concept word, rare disease supplementary concept word, unique identifier, synonyms]', 'Ovid MEDLINE')).to.equal('term.mp.');
	});

	it('translate `term.mp. [...]` -> CO `term:ti,ab,kw`', ()=> {
		expect(polyglot.translateGeneric('term.mp. [mp=title, abstract, original title, name of substance word, subject heading word, keyword heading word, protocol supplementary concept word, rare disease supplementary concept word, unique identifier, synonyms]', 'Cochrane Library')).to.equal('term:ti,ab,kw');
	});

	it('translate `term.mp. [...]` -> EM `term:ti,ab,de,tn`', ()=> {
		expect(polyglot.translateGeneric('term.mp. [mp=title, abstract, original title, name of substance word, subject heading word, keyword heading word, protocol supplementary concept word, rare disease supplementary concept word, unique identifier, synonyms]', 'Embase (Elsevier)')).to.equal('term:ti,ab,de,tn');
	});

	it('translate `term.mp. [...]` -> CI `term`', ()=> {
		expect(polyglot.translateGeneric('term.mp. [mp=title, abstract, original title, name of substance word, subject heading word, keyword heading word, protocol supplementary concept word, rare disease supplementary concept word, unique identifier, synonyms]', 'CINAHL (Ebsco)')).to.equal('term');
	});

	it('translate `term.mp. [...]` -> PY `term.mp.`', ()=> {
		expect(polyglot.translateGeneric('term.mp. [mp=title, abstract, original title, name of substance word, subject heading word, keyword heading word, protocol supplementary concept word, rare disease supplementary concept word, unique identifier, synonyms]', 'PsycInfo (Ovid)')).to.equal('term.mp.');
	});

	it('translate `term.mp. [...]` -> SC `TITLE-ABS-KEY(term)`', ()=> {
		expect(polyglot.translateGeneric('term.mp. [mp=title, abstract, original title, name of substance word, subject heading word, keyword heading word, protocol supplementary concept word, rare disease supplementary concept word, unique identifier, synonyms]', 'Scopus (advanced search)')).to.equal('TITLE-ABS-KEY(term)');
	});

	it('translate `term.mp. [...]` -> WS `term`', ()=> {
		expect(polyglot.translateGeneric('term.mp. [mp=title, abstract, original title, name of substance word, subject heading word, keyword heading word, protocol supplementary concept word, rare disease supplementary concept word, unique identifier, synonyms]', 'Web of Science')).to.equal('term');
	});

});
