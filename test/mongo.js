var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate searches (PubMed -> Mongo)', ()=> {

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

});
