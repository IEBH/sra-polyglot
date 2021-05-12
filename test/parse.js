const parse = require('../lib/modules/parse.js').parse;
const polyglot = require('../lib').default;

var _ = require('lodash');
var expect = require('chai').expect;

describe('Parse', ()=> {
	it('should parse the most basic phrase', ()=> {
		expect(parse('foo bar baz')).to.deep.equal([
			{
				type: "line",
				number: 1,
				isNumbered: false,
				nodes: [
					{
						type: 'phrase',
						content: 'foo bar baz',
						offset: 0,
					}
				]
			},
		]);
	});

	it('should parse a compound phrase (and)', ()=> {
		expect(parse('(foo and bar and baz)')).to.deep.equal([
			{
				type: 'line',
				number: 1,
				isNumbered: false,
				nodes: [
					{
						type: 'group',
						nodes: [
							{
								type: 'phrase',
								content: 'foo',
								offset: 1,
							},
							{type: 'joinAnd'},
							{
								type: 'phrase',
								content: 'bar',
								offset: 9,
							},
							{type: 'joinAnd'},
							{
								type: 'phrase',
								content: 'baz',
								offset: 17,
							},
						],
					},
				]
			}
		]);
	});

	it('should parse a compound phrase (and) + (and)', ()=> {
		expect(parse('(foo or bar) and (baz or quz or quuz)')).to.deep.equal([
			{
				type: 'line',
				number: 1,
				isNumbered: false,
				nodes: [
					{
						type: 'group',
						nodes: [
							{
								type: 'phrase',
								content: 'foo',
								offset: 1,
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'bar',
								offset: 8,
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
								offset: 18,
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'quz',
								offset: 25,
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'quuz',
								offset: 32,
							},
						],
					},
				]
			}
		]);
	});

	it('should parse Mesh terms (PubMed syntax)', ()=> {
		expect(parse('foo[mesh] and "bar baz"[mesh:noexp] and quz quuz[mesh]')).to.deep.equal([
			{
				type: 'line',
				number: 1,
				isNumbered: false,
				nodes: [
					{
						type: 'mesh',
						content: 'foo',
						field: 'Mesh search (exploded)',
						offset: 0,
					},
					{type: 'joinAnd'},
					{
						type: 'mesh',
						content: 'bar baz',
						field: 'Mesh search (Not exploded)',
						offset: 14,
					},
					{type: 'joinAnd'},
					{
						type: 'mesh',
						content: 'quz quuz',
						field: 'Mesh search (exploded)',
						offset: 40,
					},
				]
			}
		]);
	});

	it('should parse Mesh terms (Ovid MEDLINE syntax)', ()=> {
		expect(parse('exp foo/ and exp bar baz/ and quz/ and quz quuz/')).to.deep.equal([
			{
				type: 'line',
				number: 1,
				isNumbered: false,
				nodes: [
					{
						type: 'mesh',
						content: 'foo',
						field: 'Mesh search (exploded)',
					},
					{type: 'joinAnd'},
					{
						type: 'mesh',
						content: 'bar baz',
						field: 'Mesh search (exploded)',
					},
					{type: 'joinAnd'},
					{
						type: 'mesh',
						content: 'quz',
						field: 'Mesh search (Not exploded)',
						offset: 30,
					},
					{type: 'joinAnd'},
					{
						type: 'mesh',
						content: 'quz quuz',
						field: 'Mesh search (Not exploded)',
						offset: 39,
					},
				]
			}
		]);
	});

	it('should identify field specific phrase objects (PubMed syntax)', ()=> {
		expect(parse('foo[tiab] and bar baz[ti] and quz[ab] and (thud and waldo)[tiab]')).to.deep.equal([
			{
				type: 'line',
				number: 1,
				isNumbered: false,
				nodes: [
					{
						type: 'phrase',
						field: 'Title/abstract search',
						content: 'foo',
						offset: 0,
					},
					{type: 'joinAnd'},
					{
						type: 'phrase',
						field: 'Title search',
						content: 'bar baz',
						offset: 14,
					},
					{type: 'joinAnd'},
					{
						type: 'phrase',
						field: 'Abstract',
						content: 'quz',
						offset: 30,
					},
					{type: 'joinAnd'},
					{
						type: 'group',
						field: 'Title/abstract search',
						nodes: [
							{
								type: 'phrase',
								content: 'thud',
								offset: 43,
							},
							{type: 'joinAnd'},
							{
								type: 'phrase',
								content: 'waldo',
								offset: 52,
							},
						],
					},
				]
			}
		]);
	});

	it('should identify field specific phrase objects (Ovid MEDLINE syntax)', ()=> {
		expect(parse('foo.tw. and bar baz.pt. and quz.ab. and (thud and waldo).fs.')).to.deep.equal([
			{
				type: 'line',
				number: 1,
				isNumbered: false,
				nodes: [
					{
						type: 'phrase',
						field: 'Title/abstract search',
						content: 'foo',
						offset: 0,
					},
					{type: 'joinAnd'},
					{
						type: 'phrase',
						field: 'Type of material the article represents, e.g. clinical trial',
						content: 'bar baz',
						offset: 12,
					},
					{type: 'joinAnd'},
					{
						type: 'phrase',
						field: 'Abstract',
						content: 'quz',
						offset: 28,
					},
					{type: 'joinAnd'},
					{
						type: 'group',
						field: 'MeSH subheading search',
						nodes: [
							{
								type: 'phrase',
								content: 'thud',
								offset: 41,
							},
							{type: 'joinAnd'},
							{
								type: 'phrase',
								content: 'waldo',
								offset: 50,
							},
						],
					},
				]
			}
		]);
	});

	it('should wrap lines as groups and preserve linefeeds', ()=> {
		expect(parse('foo near3 bar\n\nand\n\nbaz not quz', {groupLines: false})).to.deep.equal([
			{
				type: 'line',
				number: 1,
				isNumbered: false,
				nodes: [
					{
						type: 'phrase',
						content: 'foo',
						offset: 0,
					},
					{
						type: 'joinNear',
						proximity: 3,
					},
					{
						type: 'phrase',
						content: 'bar',
						offset: 10,
					},
					{
						type: 'raw',
						content: '\n\n',
					},
				],
			},
			{
				type: 'line',
				number: 3,
				isNumbered: false,
				nodes: [
					{type: 'joinAnd'},
					{
						type: 'raw',
						content: '\n\n',
					},
				]
			},
			{
				type: 'line',
				number: 5,
				isNumbered: false,
				nodes: [
					{
						type: 'phrase',
						content: 'baz',
						offset: 20,
					},
					{type: 'joinNot'},
					{
						type: 'phrase',
						content: 'quz',
						offset: 28,
					},
				],
			},
		]);
	});
});
