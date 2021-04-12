var expect = require('chai').expect;
import polyglot from '../src';
describe('Translate title + abstract searches (PubMed -> *)', ()=> {

	it('translate `term[tiab]` -> PM `term[tiab]`', ()=> {
		expect(polyglot.translate('term[tiab]', 'pubmed')).to.equal('term[tiab]');
	});

	it('translate `term[tiab]` -> OV `term.ti,ab`', ()=> {
		expect(polyglot.translate('term[tiab]', 'medlineOvid')).to.equal('term.ti,ab.');
	});

	it('translate `term[tiab]` -> CO `term:ti,ab`', ()=> {
		expect(polyglot.translate('term[tiab]', 'cochrane')).to.equal('term:ti,ab');
	});

	it('translate `term[tiab]` -> EM `term:ti,ab`', ()=> {
		expect(polyglot.translate('term[tiab]', 'embase')).to.equal('term:ti,ab');
	});

	it('translate `term[tiab]` -> CI `TI term OR AB term2`', ()=> {
		expect(polyglot.translate('term[tiab]', 'cinahl')).to.equal('(TI term OR AB term)');
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

describe('Translate title + abstract searches (PubMed -> *)', ()=> {

	it('translate `term[Title/Abstract]` -> PM `term[tiab]`', ()=> {
		expect(polyglot.translate('term[Title/Abstract]', 'pubmed')).to.equal('term[tiab]');
	});

	it('translate `term[Title/Abstract]` -> OV `term.ti,ab`', ()=> {
		expect(polyglot.translate('term[Title/Abstract]', 'medlineOvid')).to.equal('term.ti,ab.');
	});

	it('translate `term[Title/Abstract]` -> CO `term:ti,ab`', ()=> {
		expect(polyglot.translate('term[Title/Abstract]', 'cochrane')).to.equal('term:ti,ab');
	});

	it('translate `term[Title/Abstract]` -> EM `term:ti,ab`', ()=> {
		expect(polyglot.translate('term[Title/Abstract]', 'embase')).to.equal('term:ti,ab');
	});

	it('translate `term[Title/Abstract]` -> CI `TI term OR AB term2`', ()=> {
		expect(polyglot.translate('term[Title/Abstract]', 'cinahl')).to.equal('(TI term OR AB term)');
	});

	it('translate `term[Title/Abstract]` -> PY `term.ti,ab`', ()=> {
		expect(polyglot.translate('term[Title/Abstract]', 'psycinfo')).to.equal('term.ti,ab');
	});

	it('translate `term[Title/Abstract]` -> SC `TITLE-ABS(term)`', ()=> {
		expect(polyglot.translate('term[Title/Abstract]', 'scopus')).to.equal('TITLE-ABS("term")');
	});

	it('translate `term[Title/Abstract]` -> WS `term`', ()=> {
		expect(polyglot.translate('term[Title/Abstract]', 'wos')).to.equal('term');
	});

});

describe('Translate title + abstract searches (medlineOvid `term:ti,ab` format) -> *)', ()=> {

	it('translate `term:ti,ab` -> PM `term[tiab]`', ()=> {
		expect(polyglot.translate('term:ti,ab', 'pubmed')).to.equal('term[tiab]');
	});

	it('translate `term:ti,ab` -> OV `term.ti,ab`', ()=> {
		expect(polyglot.translate('term:ti,ab', 'medlineOvid')).to.equal('term.ti,ab.');
	});

	it('translate `term:ti,ab` -> CO `term:ti,ab`', ()=> {
		expect(polyglot.translate('term:ti,ab', 'cochrane')).to.equal('term:ti,ab');
	});

	it('translate `term:ti,ab` -> EM `term:ti,ab`', ()=> {
		expect(polyglot.translate('term:ti,ab', 'embase')).to.equal('term:ti,ab');
	});

	it('translate `term:ti,ab` -> CI `TI term OR AB term`', ()=> {
		expect(polyglot.translate('term:ti,ab', 'cinahl')).to.equal('(TI term OR AB term)');
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

describe('Translate title + abstract searches (medlineOvid `term.ti,ab` format) -> *)', ()=> {

	it('translate `term.ti,ab` -> PM `term[tiab]`', ()=> {
		expect(polyglot.translate('term.ti,ab', 'pubmed')).to.equal('term[tiab]');
	});

	it('translate `term.ti,ab` -> OV `term.ti,ab`', ()=> {
		expect(polyglot.translate('term.ti,ab', 'medlineOvid')).to.equal('term.ti,ab.');
	});

	it('translate `term.ti,ab` -> CO `term.ti,ab`', ()=> {
		expect(polyglot.translate('term.ti,ab', 'cochrane')).to.equal('term:ti,ab');
	});

	it('translate `term.ti,ab` -> EM `term.ti,ab`', ()=> {
		expect(polyglot.translate('term.ti,ab', 'embase')).to.equal('term:ti,ab');
	});

	it('translate `term.ti,ab` -> CI `TI term OR AB term`', ()=> {
		expect(polyglot.translate('term.ti,ab', 'cinahl')).to.equal('(TI term OR AB term)');
	});

	it('translate `term.ti,ab` -> PY `term.ti,ab`', ()=> {
		expect(polyglot.translate('term.ti,ab', 'psycinfo')).to.equal('term.ti,ab');
	});

	it('translate `term.ti,ab` -> SC `TITLE-ABS(term)`', ()=> {
		expect(polyglot.translate('term.ti,ab', 'scopus')).to.equal('TITLE-ABS("term")');
	});

	it('translate `term.ti,ab` -> WS `term`', ()=> {
		expect(polyglot.translate('term.ti,ab', 'wos')).to.equal('term');
	});

});

describe('Translate title + abstract searches (medlineOvid `term.tw` format) -> *)', ()=> {

	it('translate `term.tw.` -> PM `term[tiab]`', ()=> {
		expect(polyglot.translate('term.tw.', 'pubmed')).to.equal('term[tiab]');
	});

	it('translate `term.tw.` -> OV `term.tw.`', ()=> {
		expect(polyglot.translate('term.tw.', 'medlineOvid')).to.equal('term.tw.');
	});

	it('translate `term.tw.` -> CO `term:ti,ab`', ()=> {
		expect(polyglot.translate('term.tw.', 'cochrane')).to.equal('term:ti,ab');
	});

	it('translate `term.tw.` -> EM `term:ti,ab`', ()=> {
		expect(polyglot.translate('term.tw.', 'embase')).to.equal('term:ti,ab');
	});

	it('translate `term.tw.` -> CI `TI term OR AB term`', ()=> {
		expect(polyglot.translate('term.tw.', 'cinahl')).to.equal('(TI term OR AB term)');
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

describe('Translate abstract + title searches (medlineOvid `term.ab,ti` format) -> *)', ()=> {

	it('translate `term.ab,ti` -> PM `term[tiab]`', ()=> {
		expect(polyglot.translate('term.ab,ti', 'pubmed')).to.equal('term[tiab]');
	});

	it('translate `term.ab,ti` -> OV `term.ti,ab`', ()=> {
		expect(polyglot.translate('term.ab,ti', 'medlineOvid')).to.equal('term.ti,ab.');
	});

	it('translate `term.ab,ti` -> CO `term.tw.`', ()=> {
		expect(polyglot.translate('term.ab,ti', 'cochrane')).to.equal('term:ti,ab');
	});

	it('translate `term.ab,ti` -> EM `term.tw.`', ()=> {
		expect(polyglot.translate('term.ab,ti', 'embase')).to.equal('term:ti,ab');
	});

	it('translate `term.ab,ti` -> CI `TI term OR AB term`', ()=> {
		expect(polyglot.translate('term.ab,ti', 'cinahl')).to.equal('(TI term OR AB term)');
	});

	it('translate `term.ab,ti` -> PY `term.ti,ab`', ()=> {
		expect(polyglot.translate('term.ab,ti', 'psycinfo')).to.equal('term.ti,ab');
	});

	it('translate `term.ab,ti` -> SC `TITLE-ABS(term)`', ()=> {
		expect(polyglot.translate('term.ab,ti', 'scopus')).to.equal('TITLE-ABS("term")');
	});

	it('translate `term.ab,ti` -> WS `term`', ()=> {
		expect(polyglot.translate('term.ab,ti', 'wos')).to.equal('term');
	});

});

describe('Translate abstract + title searches (medlineOvid `term.ab,ti.` format) -> *)', ()=> {

	it('translate `term.ab,ti.` -> PM `term[tiab]`', ()=> {
		expect(polyglot.translate('term.ab,ti.', 'pubmed')).to.equal('term[tiab]');
	});

	it('translate `term.ab,ti.` -> OV `term.ab,ti`', ()=> {
		expect(polyglot.translate('term.ab,ti.', 'medlineOvid')).to.equal('term.ti,ab.');
	});

	it('translate `term.ab,ti.` -> CO `term.tw.`', ()=> {
		expect(polyglot.translate('term.ab,ti.', 'cochrane')).to.equal('term:ti,ab');
	});

	it('translate `term.ab,ti.` -> EM `term.tw.`', ()=> {
		expect(polyglot.translate('term.ab,ti.', 'embase')).to.equal('term:ti,ab');
	});

	it('translate `term.ab,ti.` -> CI `TI term OR AB term`', ()=> {
		expect(polyglot.translate('term.ab,ti.', 'cinahl')).to.equal('(TI term OR AB term)');
	});

	it('translate `term.ab,ti.` -> PY `term.ti,ab`', ()=> {
		expect(polyglot.translate('term.ab,ti.', 'psycinfo')).to.equal('term.ti,ab');
	});

	it('translate `term.ab,ti.` -> SC `TITLE-ABS(term)`', ()=> {
		expect(polyglot.translate('term.ab,ti.', 'scopus')).to.equal('TITLE-ABS("term")');
	});

	it('translate `term.ab,ti.` -> WS `term`', ()=> {
		expect(polyglot.translate('term.ab,ti.', 'wos')).to.equal('term');
	});

});
