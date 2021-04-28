var expect = require('chai').expect;
import polyglot from '../src';
describe('Translate substance searches (PubMed -> *)', ()=> {

	it('translate `term[nm]` -> PM `term[nm]`', ()=> {
		expect(polyglot.translateGeneric('term[nm]', 'PubMed abbreviation')).to.equal('term[nm]');
	});

	it('translate `term[nm]` -> OV `term.nm`', ()=> {
		expect(polyglot.translateGeneric('term[nm]', 'Ovid MEDLINE')).to.equal('term.nm.');
	});

	it('translate `term[nm]` -> CO `term:ti`', ()=> {
		expect(polyglot.translateGeneric('term[nm]', 'Cochrane Library')).to.equal('term:kw');
	});

	it('translate `term[nm]` -> EM `term:ti`', ()=> {
		expect(polyglot.translateGeneric('term[nm]', 'Embase (Elsevier)')).to.equal('term:tn');
	});

	it('translate `term[nm]` -> CI `TI term`', ()=> {
		expect(polyglot.translateGeneric('term[nm]', 'CINAHL (Ebsco)')).to.equal('MW term');
	});

	it('translate `term[ab]` -> PY `AB term`', ()=> {
		expect(polyglot.translateGeneric('term[nm]', 'PsycInfo (Ovid)')).to.equal('term.hw');
	});

	it('translate `term[ab]` -> SC `AB term`', ()=> {
		expect(polyglot.translateGeneric('term[nm]', 'Scopus (advanced search)')).to.equal('CHEM(term)');
	});

	it('translate `term[nm]` -> WS `term`', ()=> {
		expect(polyglot.translateGeneric('term[nm]', 'Web of Science')).to.equal('term');
	});

});

describe('Translate substance searches (Ovid MEDLINE -> *)', ()=> {

	it('translate `term.nm` -> PM `term[nm]`', ()=> {
		expect(polyglot.translateGeneric('term.nm', 'PubMed abbreviation')).to.equal('term[nm]');
	});

	it('translate `term.nm` -> OV `term.nm`', ()=> {
		expect(polyglot.translateGeneric('term.nm', 'Ovid MEDLINE')).to.equal('term.nm.');
	});

	it('translate `term.nm` -> CO `term:ti`', ()=> {
		expect(polyglot.translateGeneric('term.nm', 'Cochrane Library')).to.equal('term:kw');
	});

	it('translate `term.nm` -> EM `term:ti`', ()=> {
		expect(polyglot.translateGeneric('term.nm', 'Embase (Elsevier)')).to.equal('term:tn');
	});

	it('translate `term.nm` -> CI `TI term`', ()=> {
		expect(polyglot.translateGeneric('term.nm', 'CINAHL (Ebsco)')).to.equal('MW term');
	});

	it('translate `term.nm` -> PY `AB term`', ()=> {
		expect(polyglot.translateGeneric('term.nm', 'PsycInfo (Ovid)')).to.equal('term.hw');
	});

	it('translate `term.nm` -> SC `AB term`', ()=> {
		expect(polyglot.translateGeneric('term.nm', 'Scopus (advanced search)')).to.equal('CHEM(term)');
	});

	it('translate `term.nm` -> WS `term`', ()=> {
		expect(polyglot.translateGeneric('term.nm', 'Web of Science')).to.equal('term');
	});

});
