var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate field groups (Ovid -> CINAHL)', function() {

	it('translate OV `(term1).tw.` -> CI `(TI term1 OR AB term1)`', function() {
		expect(polyglot.translate('(term1).tw.', 'cinahl')).to.equal('(TI term1 OR AB term1)');
	});

	it('translate OV `(term1 OR term2).tw.` -> CI `(TI term1 OR AB term1 OR TI term2 OR AB term2)`', function() {
		expect(polyglot.translate('(term1 OR term2).tw.', 'cinahl')).to.equal('(TI term1 OR AB term1 OR TI term2 OR AB term2)');
	});

	it('translate OV `((term1 OR term2) AND term3).tw.` -> CI `(TI term1 OR AB term1 OR TI term2 OR AB term2)`', function() {
		expect(polyglot.translate('((term1 OR term2) AND term3).tw.', 'cinahl')).to.equal('((TI term1 OR AB term1 OR TI term2 OR AB term2) AND TI term3 OR AB term3)');
	});

});
