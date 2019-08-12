import { parse } from '../src/modules/parse.js';

var expect = require('chai').expect;

describe('Check that comments are ignored', ()=> {

	it('should parse comments as a logical node', ()=> {
		expect(parse('term1 OR term2\n#Comment1\n\n#Comment2\n\nAND\n\nterm3 or term4 #Comment3', {groupLines: false})).to.deep.equal([
			{
				type: 'line',
				number: 1,
				isNumbered: false,
				nodes: [
					{
						type: 'phrase',
						content: 'term1',
						offset: 0,
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'term2',
						offset: 9,
					},
					{
						type: 'raw',
						content: '\n',
					},
				],
			},
			{
				type: 'line',
				number: 2,
				isNumbered: false,
				nodes: [
					{
						type: 'comment',
						content: 'Comment1',
					},
					{
						type: 'raw',
						content: '\n\n',
					},
				]
			},
			{
				type: 'line',
				number: 4,
				isNumbered: false,
				nodes: [
					{
						type: 'comment',
						content: 'Comment2',
					},
					{
						type: 'raw',
						content: '\n\n',
					},
				]
			},
			{
				type: 'line',
				number: 6,
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
				number: 8,
				isNumbered: false,
				nodes: [
					{
						type: 'phrase',
						content: 'term3',
						offset: 42,
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'term4',
						offset: 51,
					},
					{
						type: 'comment',
						content: 'Comment3',
					},
				],
			},
		]);
	});

});
