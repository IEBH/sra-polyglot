var expect = require('chai').expect;
const polyglot = require('../lib').default;

describe('Translate abstract searches (PubMed -> *)', ()=> {

	it('translate `term[ab]` -> PM `term[tiab]`', ()=> {
		expect(polyglot.translateGeneric('term[ab]', 'PubMed abbreviation')).to.equal('term[tiab]');
	});

	it('translate `term[ab]` -> OV `term.ab`', ()=> {
		expect(polyglot.translateGeneric('term[ab]', 'Ovid MEDLINE')).to.equal('term.ab.');
	});

	it('translate `term[ab]` -> CO `term:ab`', ()=> {
		expect(polyglot.translateGeneric('term[ab]', 'Cochrane Library')).to.equal('term:ab');
	});

	it('translate `term[ab]` -> EM `term:ab`', ()=> {
		expect(polyglot.translateGeneric('term[ab]', 'Embase (Elsevier)')).to.equal('term:ab');
	});

	it('translate `term[ab]` -> CI `AB term`', ()=> {
		expect(polyglot.translateGeneric('term[ab]', 'CINAHL (Ebsco)')).to.equal('AB term');
	});

	it('translate `term[ab]` -> PY `AB term`', ()=> {
		expect(polyglot.translateGeneric('term[ab]', 'PsycInfo (Ovid)')).to.equal('term.ab');
	});

	it('translate `term[ab]` -> SC `AB term`', ()=> {
		expect(polyglot.translateGeneric('term[ab]', 'Scopus (advanced search)')).to.equal('ABS(term)');
	});

	it('translate `term[ab]` -> WS `term`', ()=> {
		expect(polyglot.translateGeneric('term[ab]', 'Web of Science')).to.equal('term');
	});

});

describe('Translate abstract searches (Ovid MEDLINE -> *)', ()=> {

	it('translate `term:ab` -> PM `term[tiab]`', ()=> {
		expect(polyglot.translateGeneric('term:ab', 'PubMed abbreviation')).to.equal('term[tiab]');
	});

	it('translate `term:ab` -> OV `term.ab`', ()=> {
		expect(polyglot.translateGeneric('term:ab', 'Ovid MEDLINE')).to.equal('term.ab.');
	});

	it('translate `term:ab` -> CO `term:ab`', ()=> {
		expect(polyglot.translateGeneric('term:ab', 'Cochrane Library')).to.equal('term:ab');
	});

	it('translate `term:ab` -> EM `term:ab`', ()=> {
		expect(polyglot.translateGeneric('term:ab', 'Embase (Elsevier)')).to.equal('term:ab');
	});

	it('translate `term:ab` -> CI `AB term`', ()=> {
		expect(polyglot.translateGeneric('term:ab', 'CINAHL (Ebsco)')).to.equal('AB term');
	});

	it('translate `term:ab` -> PY `AB term`', ()=> {
		expect(polyglot.translateGeneric('term:ab', 'PsycInfo (Ovid)')).to.equal('term.ab');
	});

	it('translate `term:ab` -> SC `AB term`', ()=> {
		expect(polyglot.translateGeneric('term:ab', 'Scopus (advanced search)')).to.equal('ABS(term)');
	});

	it('translate `term:ab` -> WS `term`', ()=> {
		expect(polyglot.translateGeneric('term:ab', 'Web of Science')).to.equal('term');
	});

});
