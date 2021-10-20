var expect = require('chai').expect;
const polyglot = require('../lib').default;

describe('Translate adj3 to WOS (Ovid -> *)', ()=> {

	it('translate `(muscle$ adj3 resist$).ti,ab.` -> WoS `TI=(muscle? NEAR/3 resist?) OR AB=(muscle? NEAR/3 resist?)`', ()=> {
		expect(polyglot.translate('(muscle$ adj3 resist$).ti,ab.', 'WoS Advanced')).to.equal('(TI=(muscle? NEAR/3 resist?) OR AB=(muscle? NEAR/3 resist?))');
	});

});
