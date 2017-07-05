var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate floating subheading searches (PubMed -> *)', ()=> {

	it('translate `term1[sh]` -> PM `term1[sh]`', ()=> {
		expect(polyglot.translate('term1[sh]', 'pubmed')).to.equal('term1[sh]');
	});

	it('translate `term1[sh]` -> OV `term1:fs`', ()=> {
		expect(polyglot.translate('term1[sh]', 'ovid')).to.equal('term1:fs');
	});

	it('translate `term1[sh]` -> CO `term1:fs`', ()=> {
		expect(polyglot.translate('term1[sh]', 'cochrane')).to.equal('term1:fs');
	});

	it('translate `term1[sh]` -> EM `term1:lnk`', ()=> {
		expect(polyglot.translate('term1[sh]', 'embase')).to.equal('term1:lnk');
	});

	it('translate `term1[sh]` -> CI `MW term1`', ()=> {
		expect(polyglot.translate('term1[sh]', 'cinahl')).to.equal('MW term1');
	});

	it('translate `term1[ab]` -> PY `term1.hw`', ()=> {
		expect(polyglot.translate('term1[sh]', 'psycinfo')).to.equal('term1.hw');
	});

	it('translate `term1[ab]` -> SC `INDEXTERM("term1")`', ()=> {
		expect(polyglot.translate('term1[sh]', 'scopus')).to.equal('INDEXTERM("term1")');
	});

	it('translate `term1[sh]` -> WS `term1`', ()=> {
		expect(polyglot.translate('term1[sh]', 'wos')).to.equal('term1');
	});

});

describe('Translate floating subheading searches (Ovid -> *)', ()=> {

	it('translate `term1:fs` -> PM `term1[sh]`', ()=> {
		expect(polyglot.translate('term1:fs', 'pubmed')).to.equal('term1[sh]');
	});

	it('translate `term1:fs` -> OV `term1:fs`', ()=> {
		expect(polyglot.translate('term1:fs', 'ovid')).to.equal('term1:fs');
	});

	it('translate `term1:fs` -> CO `term1:fs`', ()=> {
		expect(polyglot.translate('term1:fs', 'cochrane')).to.equal('term1:fs');
	});

	it('translate `term1:fs` -> EM `term1:lnk`', ()=> {
		expect(polyglot.translate('term1:fs', 'embase')).to.equal('term1:lnk');
	});

	it('translate `term1:fs` -> CI `MW term1`', ()=> {
		expect(polyglot.translate('term1:fs', 'cinahl')).to.equal('MW term1');
	});

	it('translate `term1:fs` -> PY `AB term1.hw`', ()=> {
		expect(polyglot.translate('term1:fs', 'psycinfo')).to.equal('term1.hw');
	});

	it('translate `term1:fs` -> SC `INDEXTERM("term1")`', ()=> {
		expect(polyglot.translate('term1:fs', 'scopus')).to.equal('INDEXTERM("term1")');
	});

	it('translate `term1:fs` -> WS `term1`', ()=> {
		expect(polyglot.translate('term1:fs', 'wos')).to.equal('term1');
	});

});
