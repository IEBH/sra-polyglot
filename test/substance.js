var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate substance searches (PubMed -> *)', ()=> {

	it('translate `term[nm]` -> PM `term[nm]`', ()=> {
		expect(polyglot.translate('term[nm]', 'pubmed')).to.equal('term[nm]');
	});

	it('translate `term[nm]` -> OV `term.nm`', ()=> {
		expect(polyglot.translate('term[nm]', 'ovid')).to.equal('term.nm.');
	});

	it('translate `term[nm]` -> CO `term:ti`', ()=> {
		expect(polyglot.translate('term[nm]', 'cochrane')).to.equal('term:kw');
	});

	it('translate `term[nm]` -> EM `term:ti`', ()=> {
		expect(polyglot.translate('term[nm]', 'embase')).to.equal('term:tn');
	});

	it('translate `term[nm]` -> CI `TI term`', ()=> {
		expect(polyglot.translate('term[nm]', 'cinahl')).to.equal('MW term');
	});

	it('translate `term[ab]` -> PY `AB term`', ()=> {
		expect(polyglot.translate('term[nm]', 'psycinfo')).to.equal('term.hw');
	});

	it('translate `term[ab]` -> SC `AB term`', ()=> {
		expect(polyglot.translate('term[nm]', 'scopus')).to.equal('CHEM("term")');
	});

	it('translate `term[nm]` -> WS `term`', ()=> {
		expect(polyglot.translate('term[nm]', 'wos')).to.equal('term');
	});

});

describe('Translate substance searches (Ovid -> *)', ()=> {

	it('translate `term.nm` -> PM `term[nm]`', ()=> {
		expect(polyglot.translate('term.nm', 'pubmed')).to.equal('term[nm]');
	});

	it('translate `term.nm` -> OV `term.nm`', ()=> {
		expect(polyglot.translate('term.nm', 'ovid')).to.equal('term.nm.');
	});

	it('translate `term.nm` -> CO `term:ti`', ()=> {
		expect(polyglot.translate('term.nm', 'cochrane')).to.equal('term:kw');
	});

	it('translate `term.nm` -> EM `term:ti`', ()=> {
		expect(polyglot.translate('term.nm', 'embase')).to.equal('term:tn');
	});

	it('translate `term.nm` -> CI `TI term`', ()=> {
		expect(polyglot.translate('term.nm', 'cinahl')).to.equal('MW term');
	});

	it('translate `term.nm` -> PY `AB term`', ()=> {
		expect(polyglot.translate('term.nm', 'psycinfo')).to.equal('term.hw');
	});

	it('translate `term.nm` -> SC `AB term`', ()=> {
		expect(polyglot.translate('term.nm', 'scopus')).to.equal('CHEM("term")');
	});

	it('translate `term.nm` -> WS `term`', ()=> {
		expect(polyglot.translate('term.nm', 'wos')).to.equal('term');
	});

});
