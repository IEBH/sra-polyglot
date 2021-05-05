var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Translate publication type searches (PubMed -> *)', ()=> {

	it('translate `term[pt]` -> PM `term[pt]`', ()=> {
		expect(polyglot.translateGeneric('term[pt]', 'PubMed abbreviation')).to.equal('term[pt]');
	});

	it('translate `term[pt]` -> OV `term.pt`', ()=> {
		expect(polyglot.translateGeneric('term[pt]', 'Ovid MEDLINE')).to.equal('term.pt.');
	});

	it('translate `term[pt]` -> CO `term:pt`', ()=> {
		expect(polyglot.translateGeneric('term[pt]', 'Cochrane Library')).to.equal('term:pt');
	});

	it('translate `term[pt]` -> EM `term:it`', ()=> {
		expect(polyglot.translateGeneric('term[pt]', 'Embase (Elsevier)')).to.equal('term:it');
	});

	it('translate `term[pt]` -> CI `PT term`', ()=> {
		expect(polyglot.translateGeneric('term[pt]', 'CINAHL (Ebsco)')).to.equal('PT term');
	});

	it('translate `term[pt]` -> PY `term.pt`', ()=> {
		expect(polyglot.translateGeneric('term[pt]', 'PsycInfo (Ovid)')).to.equal('term.pt');
	});

	it('translate `term[pt]` -> SC `DOCTYPE(term)`', ()=> {
		expect(polyglot.translateGeneric('term[pt]', 'Scopus (advanced search)')).to.equal('DOCTYPE(term)');
	});

	it('translate `term[pt]` -> WS `term`', ()=> {
		expect(polyglot.translateGeneric('term[pt]', 'Web of Science')).to.equal('term');
	});

});

describe('Translate publication type searches (Ovid MEDLINE -> *)', ()=> {

	it('translate `term:pt` -> PM `term[pt]`', ()=> {
		expect(polyglot.translateGeneric('term:pt', 'PubMed abbreviation')).to.equal('term[pt]');
	});

	it('translate `term:pt` -> OV `term.pt`', ()=> {
		expect(polyglot.translateGeneric('term.pt', 'Ovid MEDLINE')).to.equal('term.pt.');
	});

	it('translate `term:pt` -> CO `term:pt`', ()=> {
		expect(polyglot.translateGeneric('term:pt', 'Cochrane Library')).to.equal('term:pt');
	});

	it('translate `term:pt` -> EM `term:it`', ()=> {
		expect(polyglot.translateGeneric('term:pt', 'Embase (Elsevier)')).to.equal('term:it');
	});

	it('translate `term:pt` -> CI `PT term`', ()=> {
		expect(polyglot.translateGeneric('term:pt', 'CINAHL (Ebsco)')).to.equal('PT term');
	});

	it('translate `term:pt` -> PY `AB term`', ()=> {
		expect(polyglot.translateGeneric('term:pt', 'PsycInfo (Ovid)')).to.equal('term.pt');
	});

	it('translate `term:pt` -> SC `DOCTYPE(term)`', ()=> {
		expect(polyglot.translateGeneric('term:pt', 'Scopus (advanced search)')).to.equal('DOCTYPE(term)');
	});

	it('translate `term:pt` -> WS `term`', ()=> {
		expect(polyglot.translateGeneric('term:pt', 'Web of Science')).to.equal('term');
	});

});
