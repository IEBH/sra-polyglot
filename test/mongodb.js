var expect = require('chai').expect;
var polyglot = require('..');

describe.skip('Translate searches (PubMed -> Mongo)', ()=> {

	var o = {
		forceString: false,
		html: false,
		trim: false,
	};

	it('translate `term[ti]` -> MongoDB', ()=> {
		expect(polyglot.translate('term[ti]', 'mongodb', o)).to.deep.equal({title: 'term'});
	});

	it('translate `term1[ti] OR term2[ti]` -> MongoDB', ()=> {
		expect(polyglot.translate('term1[ti] OR term2[ti]', 'mongodb', o)).to.deep.equal({$or: [{title: 'term1'}, {title: 'term2'}]});
	});

	it('translate `term1[ti] OR term2[ti] OR term3[ti]` -> MongoDB', ()=> {
		expect(polyglot.translate('term1[ti] OR term2[ti] OR term3[ti]', 'mongodb', o)).to.deep.equal({$or: [{title: 'term1'}, {title: 'term2'}, {title: 'term3'}]});
	});

	it('translate `term1[ti] AND term2[ti] AND term3[ti]` -> MongoDB', ()=> {
		expect(polyglot.translate('term1[ti] AND term2[ti] AND term3[ti]', 'mongodb', o)).to.deep.equal({$and: [{title: 'term1'}, {title: 'term2'}, {title: 'term3'}]});
	});

	it('translate `(term1[ti] AND term2[ti]) OR (term3[ti] AND term4[ti])` -> MongoDB', ()=> {
		expect(polyglot.translate('(term1[ti] AND term2[ti]) OR (term3[ti] AND term4[ti])', 'mongodb', o)).to.deep.equal({
			$or: [
				[
					{title: 'term1'},
					{title: 'term2'}
				],
				[
					{title: 'term3'},
					{title: 'term4'},
				],
			],
		});
	});

	it('translate `Common Cold/ OR common cold*.tw. OR head cold*.tw. OR coryza.tw. OR upper respiratory infection*.tw.` -> MongoDB', ()=> {
		expect(polyglot.translate('Common Cold/ OR common cold*.tw. OR head cold*.tw. OR coryza.tw. OR upper respiratory infection*.tw.', 'mongodb', o)).to.deep.equal({
			$or: [
				[{title: 'Common Cold'}], // FIXME: This should be a mesh search
				[{title: 'common cold*'}],
				[{title: 'head cold*'}],
				[{title: 'coryza'}],
				[{title: 'upper respiratory infection*'}],
			],
		});
	});

	it('translate `(term1[ti] OR term2[ti]) AND (term3[ti] OR term4[ti])` -> MongoDB', ()=> {
		expect(polyglot.translate('(term1[ti] OR term2[ti]) AND (term3[ti] OR term4[ti])', 'mongodb', o)).to.deep.equal({
			$and: [
				{
					$or: [
						{title: 'term1'},
						{title: 'term2'},
					],
				},
				{
					$or: [
						{title: 'term3'},
						{title: 'term4'},
					],
				},
			],
		});
	});

});
