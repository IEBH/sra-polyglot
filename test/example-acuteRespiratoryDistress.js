var _ = require('lodash');
var expect = require('chai').expect;
var polyglot = require('..');

describe('Example test "Positioning for acute respiratory distress in hospitalised infants and children"', function() {
	var example = _.find(polyglot.examples, {title: 'Positioning for acute respiratory distress in hospitalised infants and children'});

	it('should compile the object tree correctly', function() {
		/*
		exp Lung Diseases/ OR exp Bronchial Diseases/ OR exp Respiratory Tract Infections/ OR exp Respiratory Insufficiency/ OR ((respir* or bronch*) adj3 (insuffic* or fail* or distress*)).tw. OR (acute lung injur* or ali).tw. OR (ards or rds).tw. OR (respiratory adj5 infect*).tw. OR (pneumon* or bronchopneumon*).tw. OR (bronchit* or bronchiolit*).tw. OR ((neonatal lung or neonatal respiratory) adj1 (diseas* or injur* or infect* or illness*)).tw. OR hyaline membrane diseas*.tw. OR bronchopulmonary dysplasia.tw. OR (croup or laryngotracheobronchit* or epiglottit* or whooping cough or legionel*).tw. OR (laryng* adj2 infect*).tw. OR (acute adj2 (episode or exacerbation*) adj3 (asthma or bronchiectasis or cystic fibrosis)).tw. OR respiratory syncytial viruses/ OR respiratory syncytial virus, human/ OR Respiratory Syncytial Virus Infections/ OR (respiratory syncytial virus* or rsv).tw.
		AND
		exp Posture/ OR (postur* or position*).tw. OR (supine or prone or semi-prone).tw. OR ((face or facing) adj5 down*).tw. OR (side adj5 (lay or laying or laid or lays or lying or lies)).tw. OR lateral.tw. OR upright.tw. OR (semi-recumbent or semirecumbent or semi-reclin* or semireclin* or reclin* or recumbent).tw. OR ((high or erect or non-erect or lean* or forward) adj5 (sit or sitting)).tw. OR (body adj3 tilt*).tw. OR (elevat* adj3 head*).tw.
		AND
		((randomized controlled trial or controlled clinical trial).pt. or randomized.ab. or randomised.ab. or placebo.ab. or drug therapy.fs. or randomly.ab. or trial.ab. or groups.ab.) not (exp animals/ not humans.sh.)
		*/
		// Tree structure {{{
		var tree = [
			// Line 1 {{{
			{
				type: 'group',
				nodes: [
					{
						type: 'mesh',
						recurse: true,
						content: 'Lung Diseases',
					},
					{type: 'joinOr'},
					{
						type: 'mesh',
						recurse: true,
						content: 'Bronchial Diseases',
					},
					{type: 'joinOr'},
					{
						type: 'mesh',
						recurse: true,
						content: 'Respiratory Tract Infections',
					},
					{type: 'joinOr'},
					{
						type: 'mesh',
						recurse: true,
						content: 'Respiratory Insufficiency',
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'title+abstract',
						nodes: [
							{
								type: 'group',
								nodes: [
									{
										type: 'phrase',
										content: 'respir*',
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'bronch*',
									},
								],
							},
							{
								type: 'joinNear',
								proximity: 3,
							},
							{
								type: 'group',
								nodes: [
									{
										type: 'phrase',
										content: 'insuffic*',
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'fail*',
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'distress*',
									},
								],
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'title+abstract',
						nodes: [
							{
								type: 'phrase',
								content: 'acute lung injur*',
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'ali',
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'title+abstract',
						nodes: [
							{
								type: 'phrase',
								content: 'ards',
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'rds',
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'title+abstract',
						nodes: [
							{
								type: 'phrase',
								content: 'respiratory',
							},
							{
								type: 'joinNear',
								proximity: 5,
							},
							{
								type: 'phrase',
								content: 'infect*',
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'title+abstract',
						nodes: [
							{
								type: 'phrase',
								content: 'pneumon*',
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'bronchopneumon*',
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'title+abstract',
						nodes: [
							{
								type: 'phrase',
								content: 'bronchit*',
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'bronchiolit*',
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'title+abstract',
						nodes: [
							{
								type: 'group',
								nodes: [
									{
										type: 'phrase',
										content: 'neonatal lung',
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'neonatal respiratory',
									},
								],
							},
							{
								type: 'joinNear',
								proximity: 1,
							},
							{
								type: 'group',
								nodes: [
									{
										type: 'phrase',
										content: 'diseas*',
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'injur*',
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'infect*',
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'illness*',
									},
								],
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						field: 'title+abstract',
						content: 'hyaline membrane diseas*',
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						field: 'title+abstract',
						content: 'bronchopulmonary dysplasia',
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'title+abstract',
						nodes: [
							{
								type: 'phrase',
								content: 'croup',
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'laryngotracheobronchit*',
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'epiglottit*',
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'whooping cough',
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'legionel*',
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'title+abstract',
						nodes: [
							{
								type: 'phrase',
								content: 'laryng*',
							},
							{
								type: 'joinNear',
								proximity: 2,
							},
							{
								type: 'phrase',
								content: 'infect*',
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'title+abstract',
						nodes: [
							{
								type: 'phrase',
								content: 'acute',
							},
							{
								type: 'joinNear',
								proximity: 2,
							},
							{
								type: 'group',
								nodes: [
									{
										type: 'phrase',
										content: 'episode',
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'exacerbation*',
									},
								],
							},
							{
								type: 'joinNear',
								proximity: 3,
							},
							{
								type: 'group',
								nodes: [
									{
										type: 'phrase',
										content: 'asthma',
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'bronchiectasis',
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'cystic fibrosis',
									},
								],
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'mesh',
						recurse: false,
						content: 'respiratory syncytial viruses',
					},
					{type: 'joinOr'},
					{
						type: 'mesh',
						recurse: false,
						content: 'respiratory syncytial virus, human',
					},
					{type: 'joinOr'},
					{
						type: 'mesh',
						recurse: false,
						content: 'Respiratory Syncytial Virus Infections',
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'title+abstract',
						nodes: [
							{
								type: 'phrase',
								content: 'respiratory syncytial virus*',
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'rsv',
							},
						],
					},
				],
			},
			// }}}
			{
				type: 'raw',
				content: '\n\n',
			},
			{type: 'joinAnd'},
			{
				type: 'raw',
				content: '\n\n',
			},
			// Line 2 {{{
			{
				type: 'group',
				nodes: [
					{
						type: 'mesh',
						recurse: true,
						content: 'Posture',
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'title+abstract',
						nodes: [
							{
								type: 'phrase',
								content: 'postur*',
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'postur*',
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'title+abstract',
						nodes: [
							{
								type: 'phrase',
								content: 'supine',
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'prone',
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'semi-prone',
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'title+abstract',
						nodes: [
							{
								type: 'group',
								nodes: [
									{
										type: 'phrase',
										content: 'face',
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'facing',
									},
								],
							},
							{
								type: 'joinNear',
								proximity: 5,
							},
							{
								type: 'phrase',
								content: 'down*',
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'title+abstract',
						nodes: [
							{
								type: 'phrase',
								content: 'side',
							},
							{
								type: 'joinNear',
								proximity: 5,
							},
							{
								type: 'group',
								nodes: [
									{
										type: 'phrase',
										content: 'lay',
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'laying',
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'laid',
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'lays',
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'lying',
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'lies',
									},
								],
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'lateral',
						field: 'title+abstract',
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'upright',
						field: 'title+abstract',
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'title+abstract',
						nodes: [
							{
								type: 'phrase',
								content: 'semi-recumbent',
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'semirecumbent',
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'semi-reclin*',
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'semireclin*',
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'reclin*',
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'recumbent',
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'title+abstract',
						nodes: [
							{
								type: 'group',
								nodes: [
									{
										type: 'phrase',
										content: 'high',
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'erect',
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'non-erect',
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'lean*',
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'forward*',
									},
								],
							},
							{
								type: 'joinNear',
								proximity: 5,
							},
							{
								type: 'group',
								nodes: [
									{
										type: 'phrase',
										content: 'sit',
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'sitting',
									},
								],
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'title+abstract',
						nodes: [
							{
								type: 'phrase',
								content: 'body',
							},
							{
								type: 'joinNear',
								proximity: 3,
							},
							{
								type: 'phrase',
								content: 'tilt*',
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'title+abstract',
						nodes: [
							{
								type: 'phrase',
								content: 'elevat*',
							},
							{
								type: 'joinNear',
								proximity: 3,
							},
							{
								type: 'phrase',
								content: 'head*',
							},
						],
					},
				],
			},
			// }}}
			{
				type: 'raw',
				content: '\n\n',
			},
			{type: 'joinAnd'},
			{
				type: 'raw',
				content: '\n\n',
			},
			// Line 3 {{{
			{
				type: 'group',
				nodes: [
					{
						type: 'group',
						nodes: [
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
						],
					},
					// FIXME: Not (Not animals Not humans)?
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
				],
			},
			// }}}
		];
		// }}}
		console.log(require('util').inspect(polyglot.parse(example.query), {depth: null, colors: true}))
		expect(polyglot.parse(example.query)).to.deep.equal(tree);
	});

});
