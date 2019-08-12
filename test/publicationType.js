var expect = require('chai').expect;
import polyglot from '../src';
describe('Translate publication type searches (PubMed -> *)', ()=> {

	it('translate `term[pt]` -> PM `term[pt]`', ()=> {
		expect(polyglot.translate('term[pt]', 'pubmed')).to.equal('term[pt]');
	});

	it('translate `term[pt]` -> OV `term.pt`', ()=> {
		expect(polyglot.translate('term[pt]', 'ovid')).to.equal('term.pt.');
	});

	it('translate `term[pt]` -> CO `term:pt`', ()=> {
		expect(polyglot.translate('term[pt]', 'cochrane')).to.equal('term:pt');
	});

	it('translate `term[pt]` -> EM `term:it`', ()=> {
		expect(polyglot.translate('term[pt]', 'embase')).to.equal('term:it');
	});

	it('translate `term[pt]` -> CI `PT term`', ()=> {
		expect(polyglot.translate('term[pt]', 'cinahl')).to.equal('PT term');
	});

	it('translate `term[pt]` -> PY `term.pt`', ()=> {
		expect(polyglot.translate('term[pt]', 'psycinfo')).to.equal('term.pt');
	});

	it('translate `term[pt]` -> SC `DOCTYPE("term")`', ()=> {
		expect(polyglot.translate('term[pt]', 'scopus')).to.equal('DOCTYPE("term")');
	});

	it('translate `term[pt]` -> WS `term`', ()=> {
		expect(polyglot.translate('term[pt]', 'wos')).to.equal('term');
	});

});

describe('Translate publication type searches (Ovid -> *)', ()=> {

	it('translate `term:pt` -> PM `term[pt]`', ()=> {
		expect(polyglot.translate('term:pt', 'pubmed')).to.equal('term[pt]');
	});

	it('translate `term:pt` -> OV `term.pt`', ()=> {
		expect(polyglot.translate('term.pt', 'ovid')).to.equal('term.pt.');
	});

	it('translate `term:pt` -> CO `term:pt`', ()=> {
		expect(polyglot.translate('term:pt', 'cochrane')).to.equal('term:pt');
	});

	it('translate `term:pt` -> EM `term:it`', ()=> {
		expect(polyglot.translate('term:pt', 'embase')).to.equal('term:it');
	});

	it('translate `term:pt` -> CI `PT term`', ()=> {
		expect(polyglot.translate('term:pt', 'cinahl')).to.equal('PT term');
	});

	it('translate `term:pt` -> PY `AB term`', ()=> {
		expect(polyglot.translate('term:pt', 'psycinfo')).to.equal('term.pt');
	});

	it('translate `term:pt` -> SC `DOCTYPE("term")`', ()=> {
		expect(polyglot.translate('term:pt', 'scopus')).to.equal('DOCTYPE("term")');
	});

	it('translate `term:pt` -> WS `term`', ()=> {
		expect(polyglot.translate('term:pt', 'wos')).to.equal('term');
	});

});
