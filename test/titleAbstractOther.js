var expect = require('chai').expect;
import polyglot from '../src';
describe('Translate title + abstract + other searches (PubMed -> *)', ()=> {

	it('translate `term[tw]` -> PM `term[tw]`', ()=> {
		expect(polyglot.translate('term[tw]', 'pubmed')).to.equal('term[tw]');
	});

	it('translate `term[tw]` -> OV `term.mp.`', ()=> {
		expect(polyglot.translate('term[tw]', 'ovid')).to.equal('term.mp.');
	});

	it('translate `term[tw]` -> CO `term:ti,ab,kw`', ()=> {
		expect(polyglot.translate('term[tw]', 'cochrane')).to.equal('term:ti,ab,kw');
	});

	it('translate `term[tw]` -> EM `term:ti,ab,de,tn`', ()=> {
		expect(polyglot.translate('term[tw]', 'embase')).to.equal('term:ti,ab,de,tn');
	});

	it('translate `term[tw]` -> CI `term`', ()=> {
		expect(polyglot.translate('term[tw]', 'cinahl')).to.equal('term');
	});

	it('translate `term[tw]` -> PY `term.mp.`', ()=> {
		expect(polyglot.translate('term[tw]', 'psycinfo')).to.equal('term.mp.');
	});

	it('translate `term[tw]` -> SC `TITLE-ABS-KEY(term)`', ()=> {
		expect(polyglot.translate('term[tw]', 'scopus')).to.equal('TITLE-ABS-KEY("term")');
	});

	it('translate `term[tw]` -> WS `term`', ()=> {
		expect(polyglot.translate('term[tw]', 'wos')).to.equal('term');
	});

});

describe('Translate title + abstract + other searches (Ovid -> *)', ()=> {

	it('translate `term.mp.` -> PM `term[tw]`', ()=> {
		expect(polyglot.translate('term.mp.', 'pubmed')).to.equal('term[tw]');
	});

	it('translate `term.mp.` -> OV `term.mp.`', ()=> {
		expect(polyglot.translate('term.mp.', 'ovid')).to.equal('term.mp.');
	});

	it('translate `term.mp.` -> CO `term:ti,ab,kw`', ()=> {
		expect(polyglot.translate('term.mp.', 'cochrane')).to.equal('term:ti,ab,kw');
	});

	it('translate `term.mp.` -> EM `term:ti,ab,de,tn`', ()=> {
		expect(polyglot.translate('term.mp.', 'embase')).to.equal('term:ti,ab,de,tn');
	});

	it('translate `term.mp.` -> CI `term`', ()=> {
		expect(polyglot.translate('term.mp.', 'cinahl')).to.equal('term');
	});

	it('translate `term.mp.` -> PY `term.mp.`', ()=> {
		expect(polyglot.translate('term.mp.', 'psycinfo')).to.equal('term.mp.');
	});

	it('translate `term.mp.` -> SC `TITLE-ABS-KEY(term)`', ()=> {
		expect(polyglot.translate('term.mp.', 'scopus')).to.equal('TITLE-ABS-KEY("term")');
	});

	it('translate `term.mp.` -> WS `term`', ()=> {
		expect(polyglot.translate('term.mp.', 'wos')).to.equal('term');
	});

});

describe('Translate title + abstract + other searches, with automated gunk (Ovid -> *)', ()=> {

	it('translate `term.mp. [...]` -> PM `term[tw]`', ()=> {
		expect(polyglot.translate('term.mp. [mp=title, abstract, original title, name of substance word, subject heading word, keyword heading word, protocol supplementary concept word, rare disease supplementary concept word, unique identifier, synonyms]', 'pubmed')).to.equal('term[tw]');
	});

	it('translate `term.mp. [...]` -> OV `term.mp.`', ()=> {
		expect(polyglot.translate('term.mp. [mp=title, abstract, original title, name of substance word, subject heading word, keyword heading word, protocol supplementary concept word, rare disease supplementary concept word, unique identifier, synonyms]', 'ovid')).to.equal('term.mp.');
	});

	it('translate `term.mp. [...]` -> CO `term:ti,ab,kw`', ()=> {
		expect(polyglot.translate('term.mp. [mp=title, abstract, original title, name of substance word, subject heading word, keyword heading word, protocol supplementary concept word, rare disease supplementary concept word, unique identifier, synonyms]', 'cochrane')).to.equal('term:ti,ab,kw');
	});

	it('translate `term.mp. [...]` -> EM `term:ti,ab,de,tn`', ()=> {
		expect(polyglot.translate('term.mp. [mp=title, abstract, original title, name of substance word, subject heading word, keyword heading word, protocol supplementary concept word, rare disease supplementary concept word, unique identifier, synonyms]', 'embase')).to.equal('term:ti,ab,de,tn');
	});

	it('translate `term.mp. [...]` -> CI `term`', ()=> {
		expect(polyglot.translate('term.mp. [mp=title, abstract, original title, name of substance word, subject heading word, keyword heading word, protocol supplementary concept word, rare disease supplementary concept word, unique identifier, synonyms]', 'cinahl')).to.equal('term');
	});

	it('translate `term.mp. [...]` -> PY `term.mp.`', ()=> {
		expect(polyglot.translate('term.mp. [mp=title, abstract, original title, name of substance word, subject heading word, keyword heading word, protocol supplementary concept word, rare disease supplementary concept word, unique identifier, synonyms]', 'psycinfo')).to.equal('term.mp.');
	});

	it('translate `term.mp. [...]` -> SC `TITLE-ABS-KEY(term)`', ()=> {
		expect(polyglot.translate('term.mp. [mp=title, abstract, original title, name of substance word, subject heading word, keyword heading word, protocol supplementary concept word, rare disease supplementary concept word, unique identifier, synonyms]', 'scopus')).to.equal('TITLE-ABS-KEY("term")');
	});

	it('translate `term.mp. [...]` -> WS `term`', ()=> {
		expect(polyglot.translate('term.mp. [mp=title, abstract, original title, name of substance word, subject heading word, keyword heading word, protocol supplementary concept word, rare disease supplementary concept word, unique identifier, synonyms]', 'wos')).to.equal('term');
	});

});
