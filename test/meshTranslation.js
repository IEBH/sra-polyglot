var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Translate multiple MESH terms (PubMed (short) -> *)', ()=> {

	it.only('translate `epidemiology[sh] or history[sh]`', ()=> {
		expect(polyglot.translate('epidemiology[sh] or history[sh]', 'PubMed abbreviation')).to.equal('"Epidemiology"[sh] or "History"[sh]');
		expect(polyglot.translate('epidemiology[sh] or history[sh]', 'PsycInfo (Ovid)')).to.equal('"Epidemiology".fs. or "History".fs.');
	});

});
