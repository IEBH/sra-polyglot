var expect = require('chai').expect;
const polyglot = require('../lib').default;

describe('Dont expand ovid brackets (Ovid -> *)', ()=> {
    var translation = '(( web  OR  online  OR  "on-line"  OR  internet  OR  video  OR  virtual  OR  tele ) adj3 (intervention*  OR  conferenc*  OR  communication  OR  seminar*  OR  information* )).ti,ab.';

    it('translate `Ovid` -> `Ovid`', ()=> {
		expect(polyglot.translateGeneric(translation, 'Ovid MEDLINE')).to.equal('((web OR online OR on-line OR internet OR video OR virtual OR tele) ADJ3 (intervention* OR conferenc* OR communication OR seminar* OR information*)).tw.');
	});

	it('translate `Ovid` -> `Scopus`', ()=> {
		expect(polyglot.translateGeneric(translation, 'Scopus (advanced search)')).to.equal('TITLE-ABS((web OR online OR on-line OR internet OR video OR virtual OR tele) W/3 (intervention* OR conferenc* OR communication OR seminar* OR information*))');
	});
})