var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Translate multiple MESH terms (PubMed (short) -> *)', ()=> {

	it('translate `epidemiology[sh] or history[sh]`', ()=> {
		expect(polyglot.translate('epidemiology[sh] or history[sh]', 'PubMed abbreviation')).to.equal('"Epidemiology"[sh] OR "History"[sh]');
		expect(polyglot.translate('epidemiology[sh] or history[sh]', 'Ovid MEDLINE')).to.equal('"Epidemiology".fs. OR "History".fs.');
	});

});
