var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate abstract searches (PubMed -> *)', ()=> {

	it('translate `term[ab]` -> PM `term[tiab]`', ()=> {
		expect(polyglot.translate('term[ab]', 'pubmed')).to.equal('term[tiab]');
	});

	it('translate `term[ab]` -> OV `term.ab`', ()=> {
		expect(polyglot.translate('term[ab]', 'ovid')).to.equal('term.ab');
	});

	it('translate `term[ab]` -> CO `term:ab`', ()=> {
		expect(polyglot.translate('term[ab]', 'cochrane')).to.equal('term:ab');
	});

	it('translate `term[ab]` -> EM `term:ab`', ()=> {
		expect(polyglot.translate('term[ab]', 'embase')).to.equal('term:ab');
	});

	it('translate `term[ab]` -> CI `AB term`', ()=> {
		expect(polyglot.translate('term[ab]', 'cinahl')).to.equal('AB term');
	});

	it('translate `term[ab]` -> PY `AB term`', ()=> {
		expect(polyglot.translate('term[ab]', 'psycinfo')).to.equal('term.ab');
	});

	it('translate `term[ab]` -> SC `AB term`', ()=> {
		expect(polyglot.translate('term[ab]', 'scopus')).to.equal('ABS("term")');
	});

	it('translate `term[ab]` -> WS `term`', ()=> {
		expect(polyglot.translate('term[ab]', 'wos')).to.equal('term');
	});

});

describe('Translate abstract searches (Ovid -> *)', ()=> {

	it('translate `term:ab` -> PM `term[tiab]`', ()=> {
		expect(polyglot.translate('term:ab', 'pubmed')).to.equal('term[tiab]');
	});

	it('translate `term:ab` -> OV `term.ab`', ()=> {
		expect(polyglot.translate('term:ab', 'ovid')).to.equal('term.ab');
	});

	it('translate `term:ab` -> CO `term:ab`', ()=> {
		expect(polyglot.translate('term:ab', 'cochrane')).to.equal('term:ab');
	});

	it('translate `term:ab` -> EM `term:ab`', ()=> {
		expect(polyglot.translate('term:ab', 'embase')).to.equal('term:ab');
	});

	it('translate `term:ab` -> CI `AB term`', ()=> {
		expect(polyglot.translate('term:ab', 'cinahl')).to.equal('AB term');
	});

	it('translate `term:ab` -> PY `AB term`', ()=> {
		expect(polyglot.translate('term:ab', 'psycinfo')).to.equal('term.ab');
	});

	it('translate `term:ab` -> SC `AB term`', ()=> {
		expect(polyglot.translate('term:ab', 'scopus')).to.equal('ABS("term")');
	});

	it('translate `term:ab` -> WS `term`', ()=> {
		expect(polyglot.translate('term:ab', 'wos')).to.equal('term');
	});

});
