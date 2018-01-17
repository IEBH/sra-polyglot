var expect = require('chai').expect;
var polyglot = require('..');

// FIXME: Not currently supported
describe.skip('Line numbers', ()=> {

	it('should be preserved for all engines', ()=> {
		var input =
			'1 Foo AND\n' +
			'2 Bar AND\n' +
			'3 Baz OR\n' +
			'4 Quz';

		var output = inputLines; // Output is the same as input (i.e. no operation or mangling should happen)


		// All engines should act the same so don't bother to break them up into different tests
		expect(polyglot.translate(input, 'pubmed')).to.equal(output);
		expect(polyglot.translate(input, 'ovid')).to.equal(output);
		expect(polyglot.translate(input, 'cochrane')).to.equal(output);
		expect(polyglot.translate(input, 'embase')).to.equal(output);
		expect(polyglot.translate(input, 'cinahl')).to.equal(output);
		expect(polyglot.translate(input, 'psycinfo')).to.equal(output);
		expect(polyglot.translate(input, 'scopus')).to.equal(output);
		expect(polyglot.translate(input, 'wos')).to.equal(output);
	});

	it('should expand collapsed conditionals', ()=> {
		var input =
			'1 Foo AND\n' +
			'2 Bar AND\n' +
			'3 Baz OR\n' +
			'4 Quz\n' +
			'5 OR /1-4';

		var output =
			'1 Foo AND\n' +
			'2 Bar AND\n' +
			'3 Baz OR\n' +
			'4 Quz\n' +
			'5 #1 OR #2 OR #3 OR #4';


		// All engines should act the same so don't bother to break them up into different tests
		expect(polyglot.translate(input, 'pubmed')).to.equal(output);
		expect(polyglot.translate(input, 'ovid')).to.equal(output);
		expect(polyglot.translate(input, 'cochrane')).to.equal(output);
		expect(polyglot.translate(input, 'embase')).to.equal(output);
		expect(polyglot.translate(input, 'cinahl')).to.equal(output);
		expect(polyglot.translate(input, 'psycinfo')).to.equal(output);
		expect(polyglot.translate(input, 'scopus')).to.equal(output);
		expect(polyglot.translate(input, 'wos')).to.equal(output);
	});

});
