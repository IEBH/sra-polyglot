var expect = require('chai').expect;
const polyglot = require('../lib').default;

describe('Translate adj3 to WOS (Ovid -> *)', ()=> {

	it('translate `(muscle$ adj3 resist$).ti,ab.` -> WoS `TS=(muscle* NEAR/3 resist*)`', ()=> {
		expect(polyglot.translate('(muscle$ adj3 resist$).ti,ab.', 'WoS Advanced')).to.equal('(TS=(muscle* NEAR/3 resist*))');
	});

	it('translate `((muscle or muscles) adj3 (resist or resists)).ti,ab.` -> WoS `TS=((muscle OR muscles) NEAR/3 (resist OR resists))`', ()=> {
		expect(polyglot.translate('((muscle or muscles) adj3 (resist or resists)).ti,ab.', 'WoS Advanced')).to.equal('(TS=((muscle OR muscles) NEAR/3 (resist OR resists)))');
	});

});
