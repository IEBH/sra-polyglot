var expect = require('chai').expect;
import polyglot from '../src';
describe('Translate floating subheading searches (PubMed -> *)', ()=> {

	it('translate `term[sh]` -> PM `term[sh]`', ()=> {
		expect(polyglot.translateGeneric('term[sh]', 'PubMed abbreviation')).to.equal('term[sh]');
	});

	it('translate `term[sh]` -> OV `term.fs`', ()=> {
		expect(polyglot.translateGeneric('term[sh]', 'Ovid MEDLINE')).to.equal('term.fs.');
	});

	it('translate `term[sh]` -> CO `[mh /term]`', ()=> {
		expect(polyglot.translateGeneric('term[sh]', 'Cochrane Library')).to.equal('[mh /term]');
	});

	it('translate `term[sh]` -> EM `term:lnk`', ()=> {
		expect(polyglot.translateGeneric('term[sh]', 'Embase (Elsevier)')).to.equal('term:lnk');
	});

	it('translate `term[sh]` -> CI `MW term`', ()=> {
		expect(polyglot.translateGeneric('term[sh]', 'CINAHL (Ebsco)')).to.equal('MW term');
	});

	it('translate `term[sh]` -> PY `term.hw`', ()=> {
		expect(polyglot.translateGeneric('term[sh]', 'PsycInfo (Ovid)')).to.equal('term.hw');
	});

	it('translate `term[sh]` -> SC `INDEXTERMS(term)`', ()=> {
		expect(polyglot.translateGeneric('term[sh]', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term)');
	});

	it('translate `term[sh]` -> WS `term`', ()=> {
		expect(polyglot.translateGeneric('term[sh]', 'Web of Science')).to.equal('term');
	});

});

describe('Translate floating subheading searches (Ovid MEDLINE -> *)', ()=> {

	it('translate `term:fs` -> PM `term[sh]`', ()=> {
		expect(polyglot.translateGeneric('term:fs', 'PubMed abbreviation')).to.equal('term[sh]');
	});

	it('translate `term:fs` -> OV `term.fs`', ()=> {
		expect(polyglot.translateGeneric('term:fs', 'Ovid MEDLINE')).to.equal('term.fs.');
	});

	it('translate `term:fs` -> CO `[mh /term]`', ()=> {
		expect(polyglot.translateGeneric('term:fs', 'Cochrane Library')).to.equal('[mh /term]');
	});

	it('translate `term:fs` -> EM `term:lnk`', ()=> {
		expect(polyglot.translateGeneric('term:fs', 'Embase (Elsevier)')).to.equal('term:lnk');
	});

	it('translate `term:fs` -> CI `MW term`', ()=> {
		expect(polyglot.translateGeneric('term:fs', 'CINAHL (Ebsco)')).to.equal('MW term');
	});

	it('translate `term:fs` -> PY `AB term.hw`', ()=> {
		expect(polyglot.translateGeneric('term:fs', 'PsycInfo (Ovid)')).to.equal('term.hw');
	});

	it('translate `term:fs` -> SC `INDEXTERMS(term)`', ()=> {
		expect(polyglot.translateGeneric('term:fs', 'Scopus (advanced search)')).to.equal('INDEXTERMS(term)');
	});

	it('translate `term:fs` -> WS `term`', ()=> {
		expect(polyglot.translateGeneric('term:fs', 'Web of Science')).to.equal('term');
	});

});
