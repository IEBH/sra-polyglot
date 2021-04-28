var expect = require('chai').expect;
import polyglot from '../src';
describe('Translate field groups (Ovid MEDLINE -> CINAHL)', ()=> {

	it('translate `(term1).tw.` -> CI `(TI term1 OR AB term1)`', ()=> {
		expect(polyglot.translateGeneric('(term1).tw.', 'CINAHL (Ebsco)')).to.equal('((TI term1 OR AB term1))');
	});

	it('translate `(term1 OR term2).tw.` -> CI `(TI term1 OR AB term1 OR TI term2 OR AB term2)`', ()=> {
		expect(polyglot.translateGeneric('(term1 OR term2).tw.', 'CINAHL (Ebsco)')).to.equal('((TI term1 OR AB term1) OR (TI term2 OR AB term2))');
	});

	it('translate `((term1 OR term2) AND term3).tw.` -> CI `(TI term1 OR AB term1 OR TI term2 OR AB term2)`', ()=> {
		expect(polyglot.translateGeneric('((term1 OR term2) AND term3).tw.', 'CINAHL (Ebsco)')).to.equal('(((TI term1 OR AB term1) OR (TI term2 OR AB term2)) AND (TI term3 OR AB term3))');
	});

});
