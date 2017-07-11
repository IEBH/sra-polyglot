var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate title + abstract searches (PubMed -> *)', ()=> {

	it('translate `term[tiab]` -> PM `term[tiab]`', ()=> {
		expect(polyglot.translate('term[tiab]', 'pubmed')).to.equal('term[tiab]');
	});

	it('translate `term[tiab]` -> OV `term:ti,ab`', ()=> {
		expect(polyglot.translate('term[tiab]', 'ovid')).to.equal('term:ti,ab');
	});

	it('translate `term[tiab]` -> CO `term:ti,ab`', ()=> {
		expect(polyglot.translate('term[tiab]', 'cochrane')).to.equal('term:ti,ab');
	});

	it('translate `term[tiab]` -> EM `term:ti,ab`', ()=> {
		expect(polyglot.translate('term[tiab]', 'embase')).to.equal('term:ti,ab');
	});

	it('translate `term[tiab]` -> CI `TI term OR AB term2`', ()=> {
		expect(polyglot.translate('term[tiab]', 'cinahl')).to.equal('TI term OR AB term');
	});

	it('translate `term[tiab]` -> PY `term.ti,ab`', ()=> {
		expect(polyglot.translate('term[tiab]', 'psycinfo')).to.equal('term.ti,ab');
	});

	it('translate `term[tiab]` -> SC `TITLE-ABS(term)`', ()=> {
		expect(polyglot.translate('term[tiab]', 'scopus')).to.equal('TITLE-ABS("term")');
	});

	it('translate `term[tiab]` -> WS `term`', ()=> {
		expect(polyglot.translate('term[tiab]', 'wos')).to.equal('term');
	});

});

describe('Translate title + abstract searches (Ovid `term:ti,ab` format) -> *)', ()=> {

	it('translate `term:ti,ab` -> PM `term[tiab]`', ()=> {
		expect(polyglot.translate('term:ti,ab', 'pubmed')).to.equal('term[tiab]');
	});

	it('translate `term:ti,ab` -> OV `term:ti,ab`', ()=> {
		expect(polyglot.translate('term:ti,ab', 'ovid')).to.equal('term:ti,ab');
	});

	it('translate `term:ti,ab` -> CO `term:ti,ab`', ()=> {
		expect(polyglot.translate('term:ti,ab', 'cochrane')).to.equal('term:ti,ab');
	});

	it('translate `term:ti,ab` -> EM `term:ti,ab`', ()=> {
		expect(polyglot.translate('term:ti,ab', 'embase')).to.equal('term:ti,ab');
	});

	it('translate `term:ti,ab` -> CI `TI term OR AB term`', ()=> {
		expect(polyglot.translate('term:ti,ab', 'cinahl')).to.equal('TI term OR AB term');
	});

	it('translate `term:ti,ab` -> PY `term.ti,ab`', ()=> {
		expect(polyglot.translate('term:ti,ab', 'psycinfo')).to.equal('term.ti,ab');
	});

	it('translate `term:ti,ab` -> SC `TITLE-ABS(term)`', ()=> {
		expect(polyglot.translate('term:ti,ab', 'scopus')).to.equal('TITLE-ABS("term")');
	});

	it('translate `term:ti,ab` -> WS `term`', ()=> {
		expect(polyglot.translate('term:ti,ab', 'wos')).to.equal('term');
	});

});

describe('Translate title + abstract searches (Ovid `term.tw` format) -> *)', ()=> {

	it('translate `term.tw.` -> PM `term[tiab]`', ()=> {
		expect(polyglot.translate('term.tw.', 'pubmed')).to.equal('term[tiab]');
	});

	it('translate `term.tw.` -> OV `term:ti,ab`', ()=> {
		expect(polyglot.translate('term.tw.', 'ovid')).to.equal('term:ti,ab');
	});

	it('translate `term.tw.` -> CO `term.tw.`', ()=> {
		expect(polyglot.translate('term.tw.', 'cochrane')).to.equal('term:ti,ab');
	});

	it('translate `term.tw.` -> EM `term.tw.`', ()=> {
		expect(polyglot.translate('term.tw.', 'embase')).to.equal('term:ti,ab');
	});

	it('translate `term.tw.` -> CI `TI term OR AB term`', ()=> {
		expect(polyglot.translate('term.tw.', 'cinahl')).to.equal('TI term OR AB term');
	});

	it('translate `term.tw.` -> PY `term.ti,ab`', ()=> {
		expect(polyglot.translate('term.tw.', 'psycinfo')).to.equal('term.ti,ab');
	});

	it('translate `term.tw.` -> SC `TITLE-ABS(term)`', ()=> {
		expect(polyglot.translate('term.tw.', 'scopus')).to.equal('TITLE-ABS("term")');
	});

	it('translate `term.tw.` -> WS `term`', ()=> {
		expect(polyglot.translate('term.tw.', 'wos')).to.equal('term');
	});

});
