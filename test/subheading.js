var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Translate subheadings with or without quotes (Ovid -> *)', ()=> {

	it('translate `"abnormalities".fs.` -> CH `[mh /AB]`', ()=> {
		expect(polyglot.translate('"abnormalities".fs.', 'Cochrane Library')).to.equal('[mh /AB]');
	});

	it('translate `abnormalities.fs.` -> CH `[mh /AB]`', ()=> {
		expect(polyglot.translate('abnormalities.fs.', 'Cochrane Library')).to.equal('[mh /AB]');
	});

});

describe('Translate subheadings at end of mesh term (PubMed -> *)', ()=> {

	it('translate `exp *psoriasis/dt` -> PM `psoriasis/dt[majr]`', ()=> {
		expect(polyglot.translate('exp *psoriasis/dt', 'PubMed abbreviation')).to.equal('psoriasis/dt[majr]');
	});

});