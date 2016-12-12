var _ = require('lodash');
var expect = require('chai').expect;
var polyglot = require('..');

/**
* Test the standard RCT Filter syntax in all search engines
* This filter is only really intended to work as a template (e.g. `<RCT Filter>`) but it also contains a good mix of weird fields which should verify some of the more uppity search engines can support it (WoS in particular)
*/
describe('Example test "RCT Filter"', function() {
	var example = '(randomized controlled trial or controlled clinical trial).pt. or randomized.ab. or randomised.ab. or placebo.ab. or drug therapy.fs. or randomly.ab. or trial.ab. or groups.ab.) not (exp animals/ not humans.sh.)';

	it('should compile the object tree correctly', function() {
		/*
		(randomized controlled trial or controlled clinical trial).pt. or randomized.ab. or randomised.ab. or placebo.ab. or drug therapy.fs. or randomly.ab. or trial.ab. or groups.ab.) not (exp animals/ not humans.sh.)
		*/
		// Tree structure {{{
		var tree = [
			{
				type: 'group',
				field: 'practiceGuideline',
				nodes: [
					{
						type: 'phrase',
						content: 'randomized controlled trial',
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'controlled clinical trial',
					},
				],
			},
			{type: 'joinOr'},
			{
				type: 'phrase',
				content: 'randomized',
				field: 'abstract',
			},
			{type: 'joinOr'},
			{
				type: 'phrase',
				content: 'randomised',
				field: 'abstract',
			},
			{type: 'joinOr'},
			{
				type: 'phrase',
				content: 'placebo',
				field: 'abstract',
			},
			{type: 'joinOr'},
			{
				type: 'phrase',
				content: 'drug therapy',
				field: 'floatingSubheading',
			},
			{type: 'joinOr'},
			{
				type: 'phrase',
				content: 'randomly',
				field: 'abstract',
			},
			{type: 'joinOr'},
			{
				type: 'phrase',
				content: 'trial',
				field: 'abstract',
			},
			{type: 'joinOr'},
			{
				type: 'phrase',
				content: 'groups',
				field: 'abstract',
			},
			{type: 'joinNot'},
			{
				type: 'group',
				nodes: [
					{
						type: 'mesh',
						recurse: true,
						content: 'animals',
					},
					{type: 'joinNot'},
					{
						type: 'mesh',
						recurse: false,
						content: 'humans',
					},
				],
			},
			// }}}
		];
		// }}}
		expect(polyglot.parse(example)).to.deep.equal(tree);
	});

	it('should compile correctly in PubMed', function() {
		expect(polyglot.translate(example, 'pubmed')).to.deep.equal(
			'("randomized controlled trial" OR "controlled clinical trial") OR randomized[ab] OR randomised[ab] OR placebo[ab] OR "drug therapy" OR randomly[ab] OR trial[ab] OR groups[ab] NOT (animals[Mesh] NOT humans[Mesh:NoExp])'
		);
	});

	it('should compile correctly in Ovid Medline', function() {
		expect(polyglot.translate(example, 'ovid')).to.deep.equal(
			'(randomized controlled trial OR controlled clinical trial) OR randomized:ab OR randomised:ab OR placebo:ab OR drug therapy OR randomly:ab OR trial:ab OR groups:ab NOT (exp animals/ NOT humans/)'
		);
	});

	it('should compile correctly in Cochrane CENTRAL', function() {
		expect(polyglot.translate(example, 'cochrane')).to.deep.equal(
			'("randomized controlled trial" OR "controlled clinical trial") OR randomized:ab OR randomised:ab OR placebo:ab OR "drug therapy" OR randomly:ab OR trial:ab OR groups:ab NOT ([mh animals] NOT [mh ^humans])'
		);
	});

	it('should compile correctly in Embase', function() {
		expect(polyglot.translate(example, 'embase')).to.deep.equal(
			'("randomized controlled trial" OR "controlled clinical trial") OR randomized:ab OR randomised:ab OR placebo:ab OR "drug therapy" OR randomly:ab OR trial:ab OR groups:ab NOT (\'animals\'/exp NOT \'humans\'/de)'
		);
	});

	it('should compile correctly in Web of Science', function() {
		expect(polyglot.translate(example, 'wos')).to.deep.equal(
			'("randomized controlled trial" OR "controlled clinical trial") OR randomized OR randomised OR placebo OR "drug therapy" OR randomly OR trial OR groups NOT (animals NOT humans)'
		);
	});

	it('should compile correctly in CINAHL', function() {
		expect(polyglot.translate(example, 'cinahl')).to.deep.equal(
			'("randomized controlled trial" OR "controlled clinical trial") OR AB randomized OR AB randomised OR AB placebo OR "drug therapy" OR AB randomly OR AB trial OR AB groups NOT ((MH "animals+") NOT (MH "humans"))'
		);
	});

	it('should compile correctly in PsycInfo', function() {
		expect(polyglot.translate(example, 'psycinfo')).to.deep.equal('(randomized controlled trial OR controlled clinical trial) OR randomized.ab OR randomised.ab OR placebo.ab OR drug therapy OR randomly.ab OR trial.ab OR groups.ab NOT (animals NOT humans)');
	});

	it('should compile correctly in Scopus', function() {
		expect(polyglot.translate(example, 'scopus')).to.deep.equal('(randomized controlled trial OR controlled clinical trial) OR ABS(randomized) OR ABS(randomised) OR ABS(placebo) OR drug therapy OR ABS(randomly) OR ABS(trial) OR ABS(groups) NOT (INDEXTERMS(animals) NOT INDEXTERMS(humans))');
	});


});
