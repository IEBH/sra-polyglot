var expect = require('chai').expect;
const polyglot = require('../lib').default;
// FIXME: Not currently supported
describe.skip('Line numbers', ()=> {

	it('should be preserved for all engines', ()=> {
		var input =
			'1 Foo AND\n' +
			'2 Bar AND\n' +
			'3 Baz OR\n' +
			'4 Quz';

		var output = input; // Output is the same as input (i.e. no operation or mangling should happen)


		// All engines should act the same so don't bother to break them up into different tests
		expect(polyglot.translateGeneric(input, 'PubMed abbreviation')).to.equal(output);
		expect(polyglot.translateGeneric(input, 'Ovid MEDLINE')).to.equal(output);
		expect(polyglot.translateGeneric(input, 'Cochrane Library')).to.equal(output);
		expect(polyglot.translateGeneric(input, 'Embase (Elsevier)')).to.equal(output);
		expect(polyglot.translateGeneric(input, 'CINAHL (Ebsco)')).to.equal(output);
		expect(polyglot.translateGeneric(input, 'PsycInfo (Ovid)')).to.equal(output);
		expect(polyglot.translateGeneric(input, 'Scopus (advanced search)')).to.equal(output);
		expect(polyglot.translateGeneric(input, 'Web of Science')).to.equal(output);
	});

})

describe('Line expression expansion', ()=> {
	var input =
		'1 Foo AND\n' +
		'2 Bar AND\n' +
		'3 Baz OR\n' +
		'4 Quz\n' +
		'5 OR/1-4';

	it('translate line expansion format -> PM', ()=> {
		expect(polyglot.translateGeneric(input, 'PubMed abbreviation')).to.equal(
			'Foo AND<br/>' +
			'Bar AND<br/>' +
			'Baz OR<br/>' +
			'Quz<br/>' +
			'#1 OR #2 OR #3 OR #4'
		);
	});

	it('translate line expansion format -> OV', ()=> {
		expect(polyglot.translateGeneric(input, 'Ovid MEDLINE')).to.equal(
			'Foo AND<br/>' +
			'Bar AND<br/>' +
			'Baz OR<br/>' +
			'Quz<br/>' +
			'1 OR 2 OR 3 OR 4'
		);
	});

	it('translate line expansion format -> CO', ()=> {
		expect(polyglot.translateGeneric(input, 'Cochrane Library')).to.equal(
			'Foo AND<br/>' +
			'Bar AND<br/>' +
			'Baz OR<br/>' +
			'Quz<br/>' +
			'#1 OR #2 OR #3 OR #4'
		);
	});

	it('translate line expansion format -> EM', ()=> {
		expect(polyglot.translateGeneric(input, 'Embase (Elsevier)')).to.equal(
			'Foo AND<br/>' +
			'Bar AND<br/>' +
			'Baz OR<br/>' +
			'Quz<br/>' +
			'#1 OR #2 OR #3 OR #4'
		);
	});

	it('translate line expansion format -> CI', ()=> {
		expect(polyglot.translateGeneric(input, 'CINAHL (Ebsco)')).to.equal(
			'Foo AND<br/>' +
			'Bar AND<br/>' +
			'Baz OR<br/>' +
			'Quz<br/>' +
			'S1 OR S2 OR S3 OR S4'
		);
	});

	it('translate line expansion format -> PY', ()=> {
		expect(polyglot.translateGeneric(input, 'PsycInfo (Ovid)')).to.equal(
			'Foo AND<br/>' +
			'Bar AND<br/>' +
			'Baz OR<br/>' +
			'Quz<br/>' +
			'#1 OR #2 OR #3 OR #4'
		);
	});

	it('translate line expansion format -> SC', ()=> {
		expect(polyglot.translateGeneric(input, 'Scopus (advanced search)')).to.equal(
			'"Foo" AND<br/>' +
			'"Bar" AND<br/>' +
			'"Baz" OR<br/>' +
			'"Quz"<br/>' +
			'#1 OR #2 OR #3 OR #4'
		);
	});

	it('translate line expansion format -> WS', ()=> {
		expect(polyglot.translateGeneric(input, 'Web of Science')).to.equal(
			'Foo AND<br/>' +
			'Bar AND<br/>' +
			'Baz OR<br/>' +
			'Quz<br/>' +
			'#1 OR #2 OR #3 OR #4'
		);
	});

});
