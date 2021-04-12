var expect = require('chai').expect;
import polyglot from '../src';
describe('Translate floating subheading searches (PubMed -> *)', ()=> {

	it('translate `term[sh]` -> PM `term[sh]`', ()=> {
		expect(polyglot.translate('term[sh]', 'pubmed')).to.equal('term[sh]');
	});

	it('translate `term[sh]` -> OV `term.fs`', ()=> {
		expect(polyglot.translate('term[sh]', 'medlineOvid')).to.equal('term.fs.');
	});

	it('translate `term[sh]` -> CO `[mh /term]`', ()=> {
		expect(polyglot.translate('term[sh]', 'cochrane')).to.equal('[mh /term]');
	});

	it('translate `term[sh]` -> EM `term:lnk`', ()=> {
		expect(polyglot.translate('term[sh]', 'embase')).to.equal('term:lnk');
	});

	it('translate `term[sh]` -> CI `MW term`', ()=> {
		expect(polyglot.translate('term[sh]', 'cinahl')).to.equal('MW term');
	});

	it('translate `term[sh]` -> PY `term.hw`', ()=> {
		expect(polyglot.translate('term[sh]', 'psycinfo')).to.equal('term.hw');
	});

	it('translate `term[sh]` -> SC `INDEXTERMS("term")`', ()=> {
		expect(polyglot.translate('term[sh]', 'scopus')).to.equal('INDEXTERMS("term")');
	});

	it('translate `term[sh]` -> WS `term`', ()=> {
		expect(polyglot.translate('term[sh]', 'wos')).to.equal('term');
	});

});

describe('Translate floating subheading searches (medlineOvid -> *)', ()=> {

	it('translate `term:fs` -> PM `term[sh]`', ()=> {
		expect(polyglot.translate('term:fs', 'pubmed')).to.equal('term[sh]');
	});

	it('translate `term:fs` -> OV `term.fs`', ()=> {
		expect(polyglot.translate('term:fs', 'medlineOvid')).to.equal('term.fs.');
	});

	it('translate `term:fs` -> CO `[mh /term]`', ()=> {
		expect(polyglot.translate('term:fs', 'cochrane')).to.equal('[mh /term]');
	});

	it('translate `term:fs` -> EM `term:lnk`', ()=> {
		expect(polyglot.translate('term:fs', 'embase')).to.equal('term:lnk');
	});

	it('translate `term:fs` -> CI `MW term`', ()=> {
		expect(polyglot.translate('term:fs', 'cinahl')).to.equal('MW term');
	});

	it('translate `term:fs` -> PY `AB term.hw`', ()=> {
		expect(polyglot.translate('term:fs', 'psycinfo')).to.equal('term.hw');
	});

	it('translate `term:fs` -> SC `INDEXTERMS("term")`', ()=> {
		expect(polyglot.translate('term:fs', 'scopus')).to.equal('INDEXTERMS("term")');
	});

	it('translate `term:fs` -> WS `term`', ()=> {
		expect(polyglot.translate('term:fs', 'wos')).to.equal('term');
	});

});
