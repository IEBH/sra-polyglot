var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate abstract searches (PubMed -> *)', ()=> {

	it('translate PM `term1[ab]` -> PM `term1[ab]`', ()=> {
		expect(polyglot.translate('term1[ab]', 'pubmed')).to.equal('term1[ab]');
	});

	it('translate PM `term1[ab]` -> OV `term1:ab`', ()=> {
		expect(polyglot.translate('term1[ab]', 'ovid')).to.equal('term1:ab');
	});

	it('translate PM `term1[ab]` -> CO `term1:ab`', ()=> {
		expect(polyglot.translate('term1[ab]', 'cochrane')).to.equal('term1:ab');
	});

	it('translate PM `term1[ab]` -> EM `term1:ab`', ()=> {
		expect(polyglot.translate('term1[ab]', 'embase')).to.equal('term1:ab');
	});

	it('translate PM `term1[ab]` -> CI `AB term1`', ()=> {
		expect(polyglot.translate('term1[ab]', 'cinahl')).to.equal('AB term1');
	});

	it('translate PM `term1[ab]` -> PY `AB term1`', ()=> {
		expect(polyglot.translate('term1[ab]', 'psycinfo')).to.equal('term1.ab');
	});

	it('translate PM `term1[ab]` -> SC `AB term1`', ()=> {
		expect(polyglot.translate('term1[ab]', 'scopus')).to.equal('ABS("term1")');
	});

	it('translate PM `term1[ab]` -> WS `term1`', ()=> {
		expect(polyglot.translate('term1[ab]', 'wos')).to.equal('term1');
	});

});

describe('Translate abstract searches (Ovid -> *)', ()=> {

	it('translate OV `term1:ab` -> PM `term1[ab]`', ()=> {
		expect(polyglot.translate('term1:ab', 'pubmed')).to.equal('term1[ab]');
	});

	it('translate OV `term1:ab` -> OV `term1:ab`', ()=> {
		expect(polyglot.translate('term1:ab', 'ovid')).to.equal('term1:ab');
	});

	it('translate OV `term1:ab` -> CO `term1:ab`', ()=> {
		expect(polyglot.translate('term1:ab', 'cochrane')).to.equal('term1:ab');
	});

	it('translate OV `term1:ab` -> EM `term1:ab`', ()=> {
		expect(polyglot.translate('term1:ab', 'embase')).to.equal('term1:ab');
	});

	it('translate OV `term1:ab` -> CI `AB term1`', ()=> {
		expect(polyglot.translate('term1:ab', 'cinahl')).to.equal('AB term1');
	});

	it('translate PM `term1:ab` -> PY `AB term1`', ()=> {
		expect(polyglot.translate('term1:ab', 'psycinfo')).to.equal('term1.ab');
	});

	it('translate PM `term1:ab` -> SC `AB term1`', ()=> {
		expect(polyglot.translate('term1:ab', 'scopus')).to.equal('ABS("term1")');
	});

	it('translate OV `term1:ab` -> WS `term1`', ()=> {
		expect(polyglot.translate('term1:ab', 'wos')).to.equal('term1');
	});

});
