var expect = require('chai').expect;
const polyglot = require('../lib').default;
// FIXME: Not currently supported
describe.skip('Line numbers', () => {

	it('should be preserved for all engines', () => {
		var input =
			'1 Foo AND\n' +
			'2 Bar AND\n' +
			'3 Baz OR\n' +
			'4 Quz';

		var output = input; // Output is the same as input (i.e. no operation or mangling should happen)


		// All engines should act the same so don't bother to break them up into different tests
		expect(polyglot.translate(input, 'PubMed abbreviation')).to.equal(output);
		expect(polyglot.translate(input, 'Ovid MEDLINE')).to.equal(output);
		expect(polyglot.translate(input, 'Cochrane Library')).to.equal(output);
		expect(polyglot.translate(input, 'Embase (Elsevier)')).to.equal(output);
		expect(polyglot.translate(input, 'CINAHL (Ebsco)')).to.equal(output);
		expect(polyglot.translate(input, 'PsycInfo (Ebsco)')).to.equal(output);
		expect(polyglot.translate(input, 'PsycInfo (Ovid)')).to.equal(output);
		expect(polyglot.translate(input, 'Scopus (advanced search)')).to.equal(output);
		expect(polyglot.translate(input, 'Web of Science')).to.equal(output);
		expect(polyglot.translate(input, 'Business Source Ultimate')).to.equal(output);
	});

})

describe('Translate Line numbers (Ovid MEDLINE -> *)', () => {
	it('translate `OR/1,3` -> HTA `#1 OR #3`', () => {
		expect(polyglot.translate('OR/1,3', 'International HTA Database')).to.equal('#1 OR #3');
	});

}); 

describe('Line expression expansion', () => {
	var input =
		'1 Foo AND\n' +
		'2 Bar AND\n' +
		'3 Baz OR\n' +
		'4 Quz\n' +
		'5 OR/1-4';

	it('translate line expansion format -> PM', () => {
		expect(polyglot.translate(input, 'PubMed abbreviation')).to.equal(
			'Foo AND<br/>' +
			'Bar AND<br/>' +
			'Baz OR<br/>' +
			'Quz<br/>' +
			'#1 OR #2 OR #3 OR #4'
		);
	});

	it('translate line expansion format -> OV', () => {
		expect(polyglot.translate(input, 'Ovid MEDLINE')).to.equal(
			'Foo AND<br/>' +
			'Bar AND<br/>' +
			'Baz OR<br/>' +
			'Quz<br/>' +
			'1 OR 2 OR 3 OR 4'
		);
	});

	it('translate line expansion format -> CO', () => {
		expect(polyglot.translate(input, 'Cochrane Library')).to.equal(
			'Foo AND<br/>' +
			'Bar AND<br/>' +
			'Baz OR<br/>' +
			'Quz<br/>' +
			'#1 OR #2 OR #3 OR #4'
		);
	});

	it('translate line expansion format -> EM', () => {
		expect(polyglot.translate(input, 'Embase (Elsevier)')).to.equal(
			'Foo AND<br/>' +
			'Bar AND<br/>' +
			'Baz OR<br/>' +
			'Quz<br/>' +
			'#1 OR #2 OR #3 OR #4'
		);
	});

	it('translate line expansion format -> CI', () => {
		expect(polyglot.translate(input, 'CINAHL (Ebsco)')).to.equal(
			'Foo AND<br/>' +
			'Bar AND<br/>' +
			'Baz OR<br/>' +
			'Quz<br/>' +
			'S1 OR S2 OR S3 OR S4'
		);
	});

	it('translate line expansion format -> PY', () => {
		expect(polyglot.translate(input, 'PsycInfo (Ovid)')).to.equal(
			'Foo AND<br/>' +
			'Bar AND<br/>' +
			'Baz OR<br/>' +
			'Quz<br/>' +
			'1 OR 2 OR 3 OR 4'
		);
	});

	it('translate line expansion format -> SC', () => {
		expect(polyglot.translate(input, 'Scopus (advanced search)')).to.equal(
			'Foo AND<br/>' +
			'Bar AND<br/>' +
			'Baz OR<br/>' +
			'Quz<br/>' +
			'#1 OR #2 OR #3 OR #4'
		);
	});

	it('translate line expansion format -> WS', () => {
		expect(polyglot.translate(input, 'Web of Science')).to.equal(
			'Foo AND<br/>' +
			'Bar AND<br/>' +
			'Baz OR<br/>' +
			'Quz<br/>' +
			'#1 OR #2 OR #3 OR #4'
		);
	});

	// PsycInfo (Ebsco)
	it('translate line expansion format -> PYE', () => {
		expect(polyglot.translate(input, 'PsycInfo (Ebsco)')).to.equal(
			'Foo AND<br/>' +
			'Bar AND<br/>' +
			'Baz OR<br/>' +
			'Quz<br/>' +
			'S1 OR S2 OR S3 OR S4'
		);
	});

	// Business Source Ultimate
	it('translate line expansion format -> BU', () => {
		expect(polyglot.translate(input, 'Business Source Ultimate')).to.equal(
			'Foo AND<br/>' +
			'Bar AND<br/>' +
			'Baz OR<br/>' +
			'Quz<br/>' +
			'S1 OR S2 OR S3 OR S4'
		);
	});

});
