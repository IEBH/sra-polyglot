var expect = require('chai').expect;
import polyglot from '..';

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

describe('Translate title searches (PubMed -> *)', ()=> {

	it('translate `term[Title]` -> PM `term[ti]`', ()=> {
		expect(polyglot.translate('term[Title]', 'pubmed')).to.equal('term[ti]');
	});

	it('translate `term[Title]` -> OV `term.ti`', ()=> {
		expect(polyglot.translate('term[Title]', 'ovid')).to.equal('term.ti.');
	});

	it('translate `term[Title]` -> CO `term:ti`', ()=> {
		expect(polyglot.translate('term[Title]', 'cochrane')).to.equal('term:ti');
	});

	it('translate `term[Title]` -> EM `term:ti`', ()=> {
		expect(polyglot.translate('term[Title]', 'embase')).to.equal('term:ti');
	});

	it('translate `term[Title]` -> CI `TI term`', ()=> {
		expect(polyglot.translate('term[Title]', 'cinahl')).to.equal('TI term');
	});

	it('translate `term[Title]` -> PY `AB term`', ()=> {
		expect(polyglot.translate('term[Title]', 'psycinfo')).to.equal('term.ti');
	});

	it('translate `term[Title]` -> SC `AB term`', ()=> {
		expect(polyglot.translate('term[Title]', 'scopus')).to.equal('TITLE("term")');
	});

	it('translate `term[Title]` -> WS `term`', ()=> {
		expect(polyglot.translate('term[Title]', 'wos')).to.equal('term');
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
