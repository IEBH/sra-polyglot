var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate title searches (PubMed -> *)', ()=> {

	it('translate `term[ti]` -> PM `term[ti]`', ()=> {
		expect(polyglot.translate('term[ti]', 'pubmed')).to.equal('term[ti]');
	});

	it('translate `term[ti]` -> OV `term.ti`', ()=> {
		expect(polyglot.translate('term[ti]', 'ovid')).to.equal('term.ti.');
	});

	it('translate `term[ti]` -> CO `term:ti`', ()=> {
		expect(polyglot.translate('term[ti]', 'cochrane')).to.equal('term:ti');
	});

	it('translate `term[ti]` -> EM `term:ti`', ()=> {
		expect(polyglot.translate('term[ti]', 'embase')).to.equal('term:ti');
	});

	it('translate `term[ti]` -> CI `TI term`', ()=> {
		expect(polyglot.translate('term[ti]', 'cinahl')).to.equal('TI term');
	});

	it('translate `term[ab]` -> PY `AB term`', ()=> {
		expect(polyglot.translate('term[ti]', 'psycinfo')).to.equal('term.ti');
	});

	it('translate `term[ab]` -> SC `AB term`', ()=> {
		expect(polyglot.translate('term[ti]', 'scopus')).to.equal('TITLE("term")');
	});

	it('translate `term[ti]` -> WS `term`', ()=> {
		expect(polyglot.translate('term[ti]', 'wos')).to.equal('term');
	});

});

describe('Translate title searches (Ovid -> *)', ()=> {

	it('translate `term.ti` -> PM `term[ti]`', ()=> {
		expect(polyglot.translate('term.ti', 'pubmed')).to.equal('term[ti]');
	});

	it('translate `term.ti` -> OV `term.ti`', ()=> {
		expect(polyglot.translate('term.ti', 'ovid')).to.equal('term.ti.');
	});

	it('translate `term.ti` -> CO `term:ti`', ()=> {
		expect(polyglot.translate('term.ti', 'cochrane')).to.equal('term:ti');
	});

	it('translate `term.ti` -> EM `term:ti`', ()=> {
		expect(polyglot.translate('term.ti', 'embase')).to.equal('term:ti');
	});

	it('translate `term.ti` -> CI `TI term`', ()=> {
		expect(polyglot.translate('term.ti', 'cinahl')).to.equal('TI term');
	});

	it('translate `term.ti` -> PY `AB term`', ()=> {
		expect(polyglot.translate('term.ti', 'psycinfo')).to.equal('term.ti');
	});

	it('translate `term.ti` -> SC `AB term`', ()=> {
		expect(polyglot.translate('term.ti', 'scopus')).to.equal('TITLE("term")');
	});

	it('translate `term.ti` -> WS `term`', ()=> {
		expect(polyglot.translate('term.ti', 'wos')).to.equal('term');
	});

});
