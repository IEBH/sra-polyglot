var expect = require('chai').expect;
var polyglot = require('..');

describe('Check that comments are ignored', function() {

	it('should parse comments as a logical node', function() {
		expect(polyglot.parse('term1 OR term2\n#Comment1\n\n#Comment2\n\nAND\n\nterm3 or term4 #Comment3')).to.deep.equal([
			{
				type: 'group',
				nodes: [
					{
						type: 'phrase',
						content: 'term1',
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'term2',
					},
				],
			},
			{
				type: 'raw',
				content: '\n',
			},
			{
				type: 'comment',
				content: 'Comment1',
			},
			{
				type: 'raw',
				content: '\n',
			},
			{
				type: 'comment',
				content: 'Comment2',
			},
			{
				type: 'raw',
				content: '\n',
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
						content: 'term3',
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'term4',
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
