var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate title searches (PubMed -> *)', ()=> {

	it('translate PM `term1[ti]` -> PM `term1[ti]`', ()=> {
		expect(polyglot.translate('term1[ti]', 'pubmed')).to.equal('term1[ti]');
	});

	it('translate PM `term1[ti]` -> OV `term1:ti`', ()=> {
		expect(polyglot.translate('term1[ti]', 'ovid')).to.equal('term1:ti');
	});

	it('translate PM `term1[ti]` -> CO `term1:ti`', ()=> {
		expect(polyglot.translate('term1[ti]', 'cochrane')).to.equal('term1:ti');
	});

	it('translate PM `term1[ti]` -> EM `term1:ti`', ()=> {
		expect(polyglot.translate('term1[ti]', 'embase')).to.equal('term1:ti');
	});

	it('translate PM `term1[ti]` -> CI `TI term1`', ()=> {
		expect(polyglot.translate('term1[ti]', 'cinahl')).to.equal('TI term1');
	});

	it('translate PM `term1[ab]` -> PY `AB term1`', ()=> {
		expect(polyglot.translate('term1[ti]', 'psycinfo')).to.equal('term1.ti');
	});

	it('translate PM `term1[ab]` -> SC `AB term1`', ()=> {
		expect(polyglot.translate('term1[ti]', 'scopus')).to.equal('TITLE("term1")');
	});

	it('translate PM `term1[ti]` -> WS `term1`', ()=> {
		expect(polyglot.translate('term1[ti]', 'wos')).to.equal('term1');
	});

});

describe('Translate title searches (Ovid -> *)', ()=> {

	it('translate OV `term1:ti` -> PM `term1[ti]`', ()=> {
		expect(polyglot.translate('term1:ti', 'pubmed')).to.equal('term1[ti]');
	});

	it('translate OV `term1:ti` -> OV `term1:ti`', ()=> {
		expect(polyglot.translate('term1:ti', 'ovid')).to.equal('term1:ti');
	});

	it('translate OV `term1:ti` -> CO `term1:ti`', ()=> {
		expect(polyglot.translate('term1:ti', 'cochrane')).to.equal('term1:ti');
	});

	it('translate OV `term1:ti` -> EM `term1:ti`', ()=> {
		expect(polyglot.translate('term1:ti', 'embase')).to.equal('term1:ti');
	});

	it('translate OV `term1:ti` -> CI `TI term1`', ()=> {
		expect(polyglot.translate('term1:ti', 'cinahl')).to.equal('TI term1');
	});

	it('translate PM `term1:ti` -> PY `AB term1`', ()=> {
		expect(polyglot.translate('term1:ti', 'psycinfo')).to.equal('term1.ti');
	});

	it('translate PM `term1:ti` -> SC `AB term1`', ()=> {
		expect(polyglot.translate('term1:ti', 'scopus')).to.equal('TITLE("term1")');
	});

	it('translate OV `term1:ti` -> WS `term1`', ()=> {
		expect(polyglot.translate('term1:ti', 'wos')).to.equal('term1');
	});

});
