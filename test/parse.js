var _ = require('lodash');
var expect = require('chai').expect;
var polyglot = require('..');

describe('Parse', ()=> {
	it('should parse the most basic phrase', ()=> {
		expect(polyglot.parse('foo bar baz')).to.deep.equal([
			{
				type: 'phrase',
				content: 'foo bar baz',
			},
		]);
	});

	it('should parse a compound phrase (and)', ()=> {
		expect(polyglot.parse('(foo and bar and baz)')).to.deep.equal([
			{
				type: 'group',
				nodes: [
					{
						type: 'phrase',
						content: 'foo',
					},
					{type: 'joinAnd'},
					{
						type: 'phrase',
						content: 'bar',
					},
					{type: 'joinAnd'},
					{
						type: 'phrase',
						content: 'baz',
					},
				],
			},
		]);
	});

	it('should parse a compound phrase (and) + (and)', ()=> {
		expect(polyglot.parse('(foo or bar) and (baz or quz or quuz)')).to.deep.equal([
			{
				type: 'group',
				nodes: [
					{
						type: 'phrase',
						content: 'foo',
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'bar',
					},
				],
			},
			{type: 'joinAnd'},
			{
				type: 'group',
				nodes: [
					{
						type: 'phrase',
						content: 'baz',
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'quz',
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'quuz',
					},
				],
			},
		]);
	});

	it('should parse Mesh terms (PubMed syntax)', ()=> {
		expect(polyglot.parse('foo[mesh] and "bar baz"[mesh:noexp] and quz quuz[mesh]')).to.deep.equal([
			{
				type: 'mesh',
				content: 'foo',
				recurse: true,
			},
			{type: 'joinAnd'},
			{
				type: 'mesh',
				content: 'bar baz',
				recurse: false,
			},
			{type: 'joinAnd'},
			{
				type: 'mesh',
				content: 'quz quuz',
				recurse: true,
			},
		]);
	});

	it('should parse Mesh terms (Ovid syntax)', ()=> {
		expect(polyglot.parse('exp foo/ and exp bar baz/ and quz/ and quz quuz/')).to.deep.equal([
			{
				type: 'mesh',
				content: 'foo',
				recurse: true,
			},
			{type: 'joinAnd'},
			{
				type: 'mesh',
				content: 'bar baz',
				recurse: true,
			},
			{type: 'joinAnd'},
			{
				type: 'mesh',
				content: 'quz',
				recurse: false,
			},
			{type: 'joinAnd'},
			{
				type: 'mesh',
				content: 'quz quuz',
				recurse: false,
			},
		]);
	});

	it('should identify field specific phrase objects (PubMed syntax)', ()=> {
		expect(polyglot.parse('foo[tiab] and bar baz[ti] and quz[ab] and (thud and waldo)[tiab]')).to.deep.equal([
			{
				type: 'phrase',
				field: 'title+abstract',
				content: 'foo',
			},
			{type: 'joinAnd'},
			{
				type: 'phrase',
				field: 'title',
				content: 'bar baz',
			},
			{type: 'joinAnd'},
			{
				type: 'phrase',
				field: 'abstract',
				content: 'quz',
			},
			{type: 'joinAnd'},
			{
				type: 'group',
				field: 'title+abstract',
				nodes: [
					{
						type: 'phrase',
						content: 'thud',
					},
					{type: 'joinAnd'},
					{
						type: 'phrase',
						content: 'waldo',
					},
				],
			},
		]);
	});

	it('should identify field specific phrase objects (Ovid syntax)', ()=> {
		expect(polyglot.parse('foo.tw. and bar baz.pt. and quz.ab. and (thud and waldo).fs.')).to.deep.equal([
			{
				type: 'phrase',
				field: 'title+abstract+tw',
				content: 'foo',
			},
			{type: 'joinAnd'},
			{
				type: 'phrase',
				field: 'publicationType',
				content: 'bar baz',
			},
			{type: 'joinAnd'},
			{
				type: 'phrase',
				field: 'abstract',
				content: 'quz',
			},
			{type: 'joinAnd'},
			{
				type: 'group',
				field: 'floatingSubheading',
				nodes: [
					{
						type: 'phrase',
						content: 'thud',
					},
					{type: 'joinAnd'},
					{
						type: 'phrase',
						content: 'waldo',
					},
				],
			},
		]);
	});

	it('should wrap lines as groups and preserve linefeeds', ()=> {
		expect(polyglot.parse('foo near3 bar\n\nand\n\nbaz not quz', {groupLines: true})).to.deep.equal([
			{
				type: 'group',
				nodes: [
					{
						type: 'phrase',
						content: 'foo',
					},
					{
						type: 'joinNear',
						proximity: 3,
					},
					{
						type: 'phrase',
						content: 'bar',
					},
				],
			},
			{
				type: 'raw',
				content: '\n\n',
			},
			{type: 'joinAnd'},
			{
				type: 'raw',
				content: '\n\n',
			},
			{
				type: 'group',
				nodes: [
					{
						type: 'phrase',
						content: 'baz',
					},
					{type: 'joinNot'},
					{
						type: 'phrase',
						content: 'quz',
					},
				],
			},
		]);
	});
});
