var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Translate title searches (PubMed -> *)', ()=> {

	it('translate `term[ti]` -> PM `term[ti]`', ()=> {
		expect(polyglot.translate('term[ti]', 'PubMed abbreviation')).to.equal('term[ti]');
	});

	it('translate `term[ti]` -> OV `term.ti`', ()=> {
		expect(polyglot.translate('term[ti]', 'Ovid MEDLINE')).to.equal('term.ti.');
	});

	it('translate `term[ti]` -> CO `term:ti`', ()=> {
		expect(polyglot.translate('term[ti]', 'Cochrane Library')).to.equal('term:ti');
	});

	it('translate `term[ti]` -> EM `term:ti`', ()=> {
		expect(polyglot.translate('term[ti]', 'Embase (Elsevier)')).to.equal('term:ti');
	});

	it('translate `term[ti]` -> CI `TI term`', ()=> {
		expect(polyglot.translate('term[ti]', 'CINAHL (Ebsco)')).to.equal('(TI term)');
	});

	it('translate `term[ab]` -> PY `term.ti.`', ()=> {
		expect(polyglot.translate('term[ti]', 'PsycInfo (Ovid)')).to.equal('term.ti.');
	});

	it('translate `term[ab]` -> SC `AB term`', ()=> {
		expect(polyglot.translate('term[ti]', 'Scopus (advanced search)')).to.equal('TITLE(term)');
	});

	it('translate `term[ti]` -> WS `term`', ()=> {
		expect(polyglot.translate('term[ti]', 'Web of Science')).to.equal('term');
	});

	//International HTA Database
	it('translate `term[ti]` -> HTA `(term)[title]`', ()=> {
		expect(polyglot.translate('term[ti]', 'International HTA Database')).to.equal('(term)[title]');
	});

});

describe('Translate title searches (PubMed -> *)', ()=> {

	it('translate `term[Title]` -> PM `term[ti]`', ()=> {
		expect(polyglot.translate('term[Title]', 'PubMed abbreviation')).to.equal('term[ti]');
	});

	it('translate `term[Title]` -> OV `term.ti`', ()=> {
		expect(polyglot.translate('term[Title]', 'Ovid MEDLINE')).to.equal('term.ti.');
	});

	it('translate `term[Title]` -> CO `term:ti`', ()=> {
		expect(polyglot.translate('term[Title]', 'Cochrane Library')).to.equal('term:ti');
	});

	it('translate `term[Title]` -> EM `term:ti`', ()=> {
		expect(polyglot.translate('term[Title]', 'Embase (Elsevier)')).to.equal('term:ti');
	});

	it('translate `term[Title]` -> CI `TI term`', ()=> {
		expect(polyglot.translate('term[Title]', 'CINAHL (Ebsco)')).to.equal('(TI term)');
	});

	it('translate `term[Title]` -> PY `term.ti.`', ()=> {
		expect(polyglot.translate('term[Title]', 'PsycInfo (Ovid)')).to.equal('term.ti.');
	});

	it('translate `term[Title]` -> SC `AB term`', ()=> {
		expect(polyglot.translate('term[Title]', 'Scopus (advanced search)')).to.equal('TITLE(term)');
	});

	it('translate `term[Title]` -> WS `term`', ()=> {
		expect(polyglot.translate('term[Title]', 'Web of Science')).to.equal('term');
	});

	//International HTA Database
	it('translate `term[Title]` -> HTA `(term)[title]`', ()=> {
		expect(polyglot.translate('term[Title]', 'International HTA Database')).to.equal('(term)[title]');
	});
});

describe('Translate title searches (Ovid MEDLINE -> *)', ()=> {

	it('translate `term.ti` -> PM `term[ti]`', ()=> {
		expect(polyglot.translate('term.ti', 'PubMed abbreviation')).to.equal('term[ti]');
	});

	it('translate `term.ti` -> OV `term.ti`', ()=> {
		expect(polyglot.translate('term.ti', 'Ovid MEDLINE')).to.equal('term.ti.');
	});

	it('translate `term.ti` -> CO `term:ti`', ()=> {
		expect(polyglot.translate('term.ti', 'Cochrane Library')).to.equal('term:ti');
	});

	it('translate `term.ti` -> EM `term:ti`', ()=> {
		expect(polyglot.translate('term.ti', 'Embase (Elsevier)')).to.equal('term:ti');
	});

	it('translate `term.ti` -> CI `TI term`', ()=> {
		expect(polyglot.translate('term.ti', 'CINAHL (Ebsco)')).to.equal('(TI term)');
	});

	it('translate `term.ti.` -> PY `AB term`', ()=> {
		expect(polyglot.translate('term.ti', 'PsycInfo (Ovid)')).to.equal('term.ti.');
	});

	it('translate `term.ti` -> SC `AB term`', ()=> {
		expect(polyglot.translate('term.ti', 'Scopus (advanced search)')).to.equal('TITLE(term)');
	});

	it('translate `term.ti` -> WS `term`', ()=> {
		expect(polyglot.translate('term.ti', 'Web of Science')).to.equal('term');
	});

	//International HTA Database
	it('translate `term.ti` -> HTA `(term)[title]`', ()=> {
		expect(polyglot.translate('term.ti', 'International HTA Database')).to.equal('(term)[title]');
	});
});
