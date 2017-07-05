var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate publication type searches (PubMed -> *)', ()=> {

	it('translate `term1[pt]` -> PM `term1[pt]`', ()=> {
		expect(polyglot.translate('term1[pt]', 'pubmed')).to.equal('term1[pt]');
	});

	it('translate `term1[pt]` -> OV `term1:pt`', ()=> {
		expect(polyglot.translate('term1[pt]', 'ovid')).to.equal('term1:pt');
	});

	it('translate `term1[pt]` -> CO `term1:pt`', ()=> {
		expect(polyglot.translate('term1[pt]', 'cochrane')).to.equal('term1:pt');
	});

	it('translate `term1[pt]` -> EM `term1:it`', ()=> {
		expect(polyglot.translate('term1[pt]', 'embase')).to.equal('term1:it');
	});

	it('translate `term1[pt]` -> CI `PT term1`', ()=> {
		expect(polyglot.translate('term1[pt]', 'cinahl')).to.equal('PT term1');
	});

	it('translate `term1[ab]` -> PY `term1.hw`', ()=> {
		expect(polyglot.translate('term1[pt]', 'psycinfo')).to.equal('term1.pt');
	});

	it('translate `term1[ab]` -> SC `SRCTYPE("term1")`', ()=> {
		expect(polyglot.translate('term1[pt]', 'scopus')).to.equal('SRCTYPE("term1")');
	});

	it('translate `term1[pt]` -> WS `term1`', ()=> {
		expect(polyglot.translate('term1[pt]', 'wos')).to.equal('term1');
	});

});

describe('Translate publication type searches (Ovid -> *)', ()=> {

	it('translate `term1:pt` -> PM `term1[pt]`', ()=> {
		expect(polyglot.translate('term1:pt', 'pubmed')).to.equal('term1[pt]');
	});

	it('translate `term1:pt` -> OV `term1:pt`', ()=> {
		expect(polyglot.translate('term1:pt', 'ovid')).to.equal('term1:pt');
	});

	it('translate `term1:pt` -> CO `term1:pt`', ()=> {
		expect(polyglot.translate('term1:pt', 'cochrane')).to.equal('term1:pt');
	});

	it('translate `term1:pt` -> EM `term1:it`', ()=> {
		expect(polyglot.translate('term1:pt', 'embase')).to.equal('term1:it');
	});

	it('translate `term1:pt` -> CI `PT term1`', ()=> {
		expect(polyglot.translate('term1:pt', 'cinahl')).to.equal('PT term1');
	});

	it('translate `term1:pt` -> PY `AB term1`', ()=> {
		expect(polyglot.translate('term1:pt', 'psycinfo')).to.equal('term1.pt');
	});

	it('translate `term1:pt` -> SC `SRCTYPE("term1")`', ()=> {
		expect(polyglot.translate('term1:pt', 'scopus')).to.equal('SRCTYPE("term1")');
	});

	it('translate `term1:pt` -> WS `term1`', ()=> {
		expect(polyglot.translate('term1:pt', 'wos')).to.equal('term1');
	});

});
