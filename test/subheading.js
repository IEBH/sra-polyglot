var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Translate substance searches (PubMed -> *)', ()=> {

	it('translate `"abnormalities".fs.` -> CH `term[nm]`', ()=> {
		expect(polyglot.translate('"abnormalities".fs.', 'Cochrane Library')).to.equal('[mh /AB]');
	});

	it('translate `abnormalities.fs.` -> CH `term.nm`', ()=> {
		expect(polyglot.translate('abnormalities.fs.', 'Cochrane Library')).to.equal('[mh /AB]');
	});

});