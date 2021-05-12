const global = require( '../lib/modules/global.js').default;
const parse = require('../lib/modules/parse.js').parse;

var _ = require('lodash');
var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Example test "Positioning for acute respiratory distress in hospitalised infants and children"', ()=> {
	var example = _.find(global.examples, {title: 'Positioning for acute respiratory distress in hospitalised infants and children'});
	expect(example).to.be.an.instanceOf(Object);
	expect(example).to.have.property('query');

	it('should compile the object tree correctly', ()=> {
		/*
		# Lung diseases or other infections
		exp Lung Diseases/ OR exp Bronchial Diseases/ OR exp Respiratory Tract Infections/ OR exp Respiratory Insufficiency/ OR ((respir* or bronch*) adj3 (insuffic* or fail* or distress*)).tw. OR (acute lung injur* or ali).tw. OR (ards or rds).tw. OR (respiratory adj5 infect*).tw. OR (pneumon* or bronchopneumon*).tw. OR (bronchit* or bronchiolit*).tw. OR ((neonatal lung or neonatal respiratory) adj1 (diseas* or injur* or infect* or illness*)).tw. OR hyaline membrane diseas*.tw. OR bronchopulmonary dysplasia.tw. OR (croup or laryngotracheobronchit* or epiglottit* or whooping cough or legionel*).tw. OR (laryng* adj2 infect*).tw. OR (acute adj2 (episode or exacerbation*) adj3 (asthma or bronchiectasis or cystic fibrosis)).tw. OR respiratory syncytial viruses/ OR respiratory syncytial virus, human/ OR Respiratory Syncytial Virus Infections/ OR (respiratory syncytial virus* or rsv).tw.
		AND

		# Posture
		exp Posture/ OR (postur* or position*).tw. OR (supine or prone or semi-prone).tw. OR ((face or facing) adj5 down*).tw. OR (side adj5 (lay or laying or laid or lays or lying or lies)).tw. OR lateral.tw. OR upright.tw. OR (semi-recumbent or semirecumbent or semi-reclin* or semireclin* or reclin* or recumbent).tw. OR ((high or erect or non-erect or lean* or forward) adj5 (sit or sitting)).tw. OR (body adj3 tilt*).tw. OR (elevat* adj3 head*).tw.

		AND

		# RCTs
		<RCT Filter>
		*/
		// Tree structure {{{
		var tree = [
			// Line 1 {{{
			{
				type: 'line',
				number: 1,
				isNumbered: false,
				nodes: [
					{
						type: 'comment',
						content: ' Lung diseases or other infections',
					},
					{
						type: 'raw',
						content: '\n',
					},
				]
			},
			{
				type: 'line',
				number: 2,
				isNumbered: false,
				nodes: [
					{
						type: 'mesh',
						field: 'Mesh search (exploded)',
						content: 'Lung Diseases',
					},
					{type: 'joinOr'},
					{
						type: 'mesh',
						field: 'Mesh search (exploded)',
						content: 'Bronchial Diseases',
					},
					{type: 'joinOr'},
					{
						type: 'mesh',
						field: 'Mesh search (exploded)',
						content: 'Respiratory Tract Infections',
					},
					{type: 'joinOr'},
					{
						type: 'mesh',
						field: 'Mesh search (exploded)',
						content: 'Respiratory Insufficiency',
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'Title/abstract search',
						nodes: [
							{
								type: 'group',
								nodes: [
									{
										type: 'phrase',
										content: 'respir*',
										offset: 158,
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'bronch*',
										offset: 169,
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
										offset: 184,
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'fail*',
										offset: 197,
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'distress*',
										offset: 206,
									},
								],
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'Title/abstract search',
						nodes: [
							{
								type: 'phrase',
								content: 'acute lung injur*',
								offset: 226,
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'ali',
								offset: 247,
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'Title/abstract search',
						nodes: [
							{
								type: 'phrase',
								content: 'ards',
								offset: 260,
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'rds',
								offset: 268,
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'Title/abstract search',
						nodes: [
							{
								type: 'phrase',
								content: 'respiratory',
								offset: 281,
							},
							{
								type: 'joinNear',
								proximity: 5,
							},
							{
								type: 'phrase',
								content: 'infect*',
								offset: 298,
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'Title/abstract search',
						nodes: [
							{
								type: 'phrase',
								content: 'pneumon*',
								offset: 315,
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'bronchopneumon*',
								offset: 327,
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'Title/abstract search',
						nodes: [
							{
								type: 'phrase',
								content: 'bronchit*',
								offset: 352,
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'bronchiolit*',
								offset: 365,
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'Title/abstract search',
						nodes: [
							{
								type: 'group',
								nodes: [
									{
										type: 'phrase',
										content: 'neonatal lung',
										offset: 388,
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'neonatal respiratory',
										offset: 405,
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
										offset: 433,
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'injur*',
										offset: 444,
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'infect*',
										offset: 454,
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'illness*',
										offset: 465,
									},
								],
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						field: 'Title/abstract search',
						content: 'hyaline membrane diseas*',
						offset: 483,
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						field: 'Title/abstract search',
						content: 'bronchopulmonary dysplasia',
						offset: 515,
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'Title/abstract search',
						nodes: [
							{
								type: 'phrase',
								content: 'croup',
								offset: 550,
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'laryngotracheobronchit*',
								offset: 559,
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'epiglottit*',
								offset: 586,
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'whooping cough',
								offset: 601,
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'legionel*',
								offset: 619,
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'Title/abstract search',
						nodes: [
							{
								type: 'phrase',
								content: 'laryng*',
								offset: 638,
							},
							{
								type: 'joinNear',
								proximity: 2,
							},
							{
								type: 'phrase',
								content: 'infect*',
								offset: 651,
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'Title/abstract search',
						nodes: [
							{
								type: 'phrase',
								content: 'acute',
								offset: 668,
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
										offset: 680,
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'exacerbation*',
										offset: 691,
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
										offset: 712,
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'bronchiectasis',
										offset: 722,
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'cystic fibrosis',
										offset: 740,
									},
								],
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'mesh',
						field: 'Mesh search (Not exploded)',
						content: 'respiratory syncytial viruses',
						offset: 765,
					},
					{type: 'joinOr'},
					{
						type: 'mesh',
						field: 'Mesh search (Not exploded)',
						content: 'respiratory syncytial virus, human',
						offset: 799,
					},
					{type: 'joinOr'},
					{
						type: 'mesh',
						field: 'Mesh search (Not exploded)',
						content: 'Respiratory Syncytial Virus Infections',
						offset: 838,
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'Title/abstract search',
						nodes: [
							{
								type: 'phrase',
								content: 'respiratory syncytial virus*',
								offset: 882,
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'rsv',
								offset: 914,
							},
						],
					},
					{
						type: 'raw',
						content: '\n\n',
					},
				],
			},
			// }}}
			{
				type: "line",
				number: 4,
				isNumbered: false,
				nodes: [
					{type: 'joinAnd'},
					{
						type: 'raw',
						content: '\n\n',
					},
				]
			},
			// Line 2 {{{
			{
				type: "line",
				number: 6,
				isNumbered: false,
				nodes: [
					{
						type: 'comment',
						content: ' Posture',
					},
					{
						type: 'raw',
						content: '\n',
					},
				]
			},
			{
				type: 'line',
				number: 7,
				isNumbered: false,
				nodes: [
					{
						type: 'mesh',
						field: 'Mesh search (exploded)',
						content: 'Posture',
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'Title/abstract search',
						nodes: [
							{
								type: 'phrase',
								content: 'postur*',
								offset: 956,
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'position*',
								offset: 967,
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'Title/abstract search',
						nodes: [
							{
								type: 'phrase',
								content: 'supine',
								offset: 986,
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'prone',
								offset: 996,
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'semi-prone',
								offset: 1005,
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'Title/abstract search',
						nodes: [
							{
								type: 'group',
								nodes: [
									{
										type: 'phrase',
										content: 'face',
										offset: 1026,
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'facing',
										offset: 1034,
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
								offset: 1047,
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'Title/abstract search',
						nodes: [
							{
								type: 'phrase',
								content: 'side',
								offset: 1062,
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
										offset: 1073,
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'laying',
										offset: 1080,
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'laid',
										offset: 1090,
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'lays',
										offset: 1098,
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'lying',
										offset: 1106,
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'lies',
										offset: 1115,
									},
								],
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'lateral',
						offset: 1129,
						field: 'Title/abstract search',
					},
					{type: 'joinOr'},
					{
						type: 'phrase',
						content: 'upright',
						offset: 1144,
						field: 'Title/abstract search',
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'Title/abstract search',
						nodes: [
							{
								type: 'phrase',
								content: 'semi-recumbent',
								offset: 1160,
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'semirecumbent',
								offset: 1178,
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'semi-reclin*',
								offset: 1195,
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'semireclin*',
								offset: 1211,
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'reclin*',
								offset: 1226,
							},
							{type: 'joinOr'},
							{
								type: 'phrase',
								content: 'recumbent',
								offset: 1237,
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'Title/abstract search',
						nodes: [
							{
								type: 'group',
								nodes: [
									{
										type: 'phrase',
										content: 'high',
										offset: 1257,
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'erect',
										offset: 1265,
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'non-erect',
										offset: 1274,
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'lean*',
										offset: 1287,
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'forward',
										offset: 1296,
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
										offset: 1311,
									},
									{type: 'joinOr'},
									{
										type: 'phrase',
										content: 'sitting',
										offset: 1318,
									},
								],
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'Title/abstract search',
						nodes: [
							{
								type: 'phrase',
								content: 'body',
								offset: 1336,
							},
							{
								type: 'joinNear',
								proximity: 3,
							},
							{
								type: 'phrase',
								content: 'tilt*',
								offset: 1346,
							},
						],
					},
					{type: 'joinOr'},
					{
						type: 'group',
						field: 'Title/abstract search',
						nodes: [
							{
								type: 'phrase',
								content: 'elevat*',
								offset: 1361,
							},
							{
								type: 'joinNear',
								proximity: 3,
							},
							{
								type: 'phrase',
								content: 'head*',
								offset: 1374,
							},
						],
					},
					{
						type: 'raw',
						content: '\n\n',
					},
				],
			},
			// }}}
			{
				type: "line",
				number: 9,
				isNumbered: false,
				nodes: [
					{type: 'joinAnd'},
					{
						type: 'raw',
						content: '\n\n',
					},
				]
			},
			// Line 3 {{{
			{
				type: "line",
				number: 11,
				isNumbered: false,
				nodes: [
					{
						type: 'comment',
						content: ' RCTs',
					},
					{
						type: 'raw',
						content: '\n',
					},
				]
			},
			{
				type: 'line',
				number: 12,
				isNumbered: false,
				nodes: [
					{
						type: 'template',
						content: 'rct filter',
					},
				],
			},
			// }}}
		];
		// }}}
		expect(parse(example.query, {groupLines: false})).to.deep.equal(tree);
	});

});
