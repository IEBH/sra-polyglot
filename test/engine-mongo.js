var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate various tree structures to MongoDB query format', function() {

	it('should translate basic search terms', function() {
		// FIXME: Is 'title' the default search term?
		expect(polyglot.translate('term1', 'mongodb')).to.deep.equal({title: 'term1'});
		expect(polyglot.translate('"term1 term2"', 'mongodb')).to.deep.equal({title: 'term1 term2'});
	});

	it('should translate simple fields', function() {
		expect(polyglot.translate('term1[ti]', 'mongodb')).to.deep.equal({title: 'term1'});
		expect(polyglot.translate('term1:ti', 'mongodb')).to.deep.equal({title: 'term1'});
		expect(polyglot.translate('term1[ab]', 'mongodb')).to.deep.equal({abstract: 'term1'});
		expect(polyglot.translate('term1:ab', 'mongodb')).to.deep.equal({abstract: 'term1'});
	});

	it('should translate compound fields', function() {
		expect(polyglot.translate('term1[tiab]', 'mongodb')).to.deep.equal({$or: [{title: 'term1'}, {abstract: 'term1'}]});
		expect(polyglot.translate('term1:ti,ab', 'mongodb')).to.deep.equal({$or: [{title: 'term1'}, {abstract: 'term1'}]});
		expect(polyglot.translate('term1.tw.', 'mongodb')).to.deep.equal({$or: [{title: 'term1'}, {abstract: 'term1'}]});
	});

	it.skip('should translate fields with wildcards', function() {
		// FIXME: Aaaagh. No idea how to do this in Mongo
		expect(polyglot.translate('term1*', 'mongodb')).to.deep.equal({title: /^term1/});
		expect(polyglot.translate('term1$', 'mongodb')).to.deep.equal({title: /^term1/});
		expect(polyglot.translate('term1?', 'mongodb')).to.deep.equal({title: /^term1.$/});
	});

	it('should translate MeSH terms', function() {
		expect(polyglot.translate('term1[Mesh]', 'mongodb')).to.deep.equal({mesh: {$in: ['term1']}});
		expect(polyglot.translate('"term1 term2"[Mesh]', 'mongodb')).to.deep.equal({mesh: {$in: ['term1 term2']}});
		expect(polyglot.translate('exp term1/', 'mongodb')).to.deep.equal({mesh: {$in: ['term1']}});
		expect(polyglot.translate('exp term1 term2/', 'mongodb')).to.deep.equal({mesh: {$in: ['term1 term2']}});
	});

	it('should translate groups', function() {
		expect(polyglot.translate('term1[ab] and term2[ab]', 'mongodb')).to.deep.equal({
			$and: [
				{abstract: 'term1'},
				{abstract: 'term2'},
			],
		});

		expect(polyglot.translate('term1[ti] or term2[ab]', 'mongodb')).to.deep.equal({
			$or: [
				{title: 'term1'},
				{abstract: 'term2'},
			],
		});

		expect(polyglot.translate('((term1 OR term2) AND term3).ti.', 'mongodb')).to.deep.equal({
			$and: [
				{title: 'term3'},
				{$or: [
					{title: 'term1'},
					{title: 'term2'},
				]},
			],
		});
	});

	it.skip('should translate proximity', function() {
		// FIXME: No idea what to do here
		expect(polyglot.translate('term1 ADJ3 term2', 'mongodb')).to.deep.equal({title: 'term1 term2'});
	});

	it.skip('should translate templates', function() {
		// FIXME: Check these when the above is all working
		expect(polyglot.translate('<SR Filter>', 'mongodb')).to.deep.equal('Medline[tiab] OR Pubmed[tiab] OR (systematic[tiab] AND review[tiab]) OR meta-analysis[ptyp] OR CDSR[so]');
		expect(polyglot.translate('<RCT Filter>', 'mongodb')).to.deep.equal('randomized controlled trial[pt] OR controlled clinical trial[pt] OR randomized[tiab] OR randomised[tiab] OR placebo[tiab] OR "drug therapy"[MeSH] OR randomly[tiab] OR trial[tiab] OR groups[tiab] NOT (Animals[Mesh] not (Animals[Mesh] and Humans[Mesh]))');
	});

});
