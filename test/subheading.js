var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Translate subheadings with or without quotes (Ovid -> *)', ()=> {

	it('translate `"abnormalities".fs.` -> CH `[mh /AB]`', ()=> {
		expect(polyglot.translate('"abnormalities".fs.', 'Cochrane Library')).to.equal('[mh /AB]');
	});

	it('translate `abnormalities.fs.` -> CH `[mh /AB]`', ()=> {
		expect(polyglot.translate('abnormalities.fs.', 'Cochrane Library')).to.equal('[mh /AB]');
	});

	//International HTA Database
	it('translate `abnormalities.fs.` -> HTA `term`', ()=> {
		expect(polyglot.translate('abnormalities.fs.', 'International HTA Database')).to.equal('term');
	});
});

describe('Translate subheadings at end of mesh term (PubMed -> *)', ()=> {

	it('translate `psoriasis/dt[Majr]` -> PM `psoriasis/dt[Majr]`', ()=> {
		expect(polyglot.translate('psoriasis/dt[Majr]', 'PubMed abbreviation')).to.equal('psoriasis/dt[Majr]');
	});

	it('translate `psoriasis/dt[Majr]` -> OV `exp *psoriasis/dt`', ()=> {
		expect(polyglot.translate('psoriasis/dt[Majr]', 'Ovid MEDLINE')).to.equal('exp *psoriasis/dt');
	});

	//International HTA Database
	it('translate `psoriasis/dt[Majr]` -> HTA `term`', ()=> {
		expect(polyglot.translate('psoriasis/dt[Majr]', 'International HTA Database')).to.equal('"term"[mhe]');
	});
});

describe('Translate subheadings at end of mesh term (Ovid -> *)', ()=> {

	it('translate `exp *psoriasis/dt` -> PM `psoriasis/dt[majr]`', ()=> {
		expect(polyglot.translate('exp *psoriasis/dt', 'PubMed abbreviation')).to.equal('psoriasis/dt[Majr]');
	});

	it('translate `exp *psoriasis/dt` -> OV `exp *psoriasis/dt`', ()=> {
		expect(polyglot.translate('exp *psoriasis/dt', 'Ovid MEDLINE')).to.equal('exp *psoriasis/dt');
	});

	//International HTA Database
	it('translate `exp *psoriasis/dt` -> HTA `term`', ()=> {
		expect(polyglot.translate('exp *psoriasis/dt', 'International HTA Database')).to.equal('"term"[mhe]');
	});

});