// File contains global variables
export default {
    /**
	* List of example search queries
	* See tests/examples.js for the outputs in each case
	* @var {array}
	*/
	examples: [
		{title: 'Failure of antibiotic prescribing for bacterial infections', query: '"Primary Health Care"[Mesh] OR Primary care OR Primary healthcare OR Family practice OR General practice\n\nAND\n\n"Treatment Failure"[Mesh] OR Treatment failure OR Treatment failures\n\nAND\n\n"Bacterial Infections"[Mesh] OR Bacteria OR Bacterial\n\nAND\n\n"Anti-Bacterial Agents"[Mesh] OR Antibacterial Agents OR Antibacterial Agent OR Antibiotics OR Antibiotic'},
		{title: 'Clinical prediction guides for whiplash', query: '"Neck"[Mesh] OR Neck OR Necks OR "Cervical Vertebrae"[Mesh] OR "Cervical Vertebrae" OR "Neck Muscles"[Mesh] OR "Neck Muscles" OR "Neck Injuries"[Mesh] OR "Whiplash Injuries"[Mesh] OR "Radiculopathy"[Mesh] OR "Neck Injuries" OR "Neck Injury" OR Whiplash OR Radiculopathies OR Radiculopathy\n\n AND\n\n "Pain"[Mesh] OR Pain OR Pains OR Aches OR Ache OR Sore\n\n AND\n\n "Decision Support Techniques"[Mesh] OR "Predictive Value of Tests"[Mesh] OR "Observer Variation"[Mesh] OR Decision Support OR Decision Aids OR Decision Aid OR Decision Analysis OR Decision Modeling OR Decision modelling OR Prediction OR Predictions OR Predictor OR Predicting OR Predicted'},
		{title: 'Prevalence of Thyroid Disease in Australia', query: '"Thyroid Diseases"[Mesh] OR "Thyroid diseases" OR "Thyroid disease" OR "Thyroid disorder" OR "Thyroid disorders" OR Goiter OR Goitre OR Hypothyroidism OR Hyperthyroidism OR Thyroiditis OR "Graves disease" OR Hyperthyroxinemia OR Thyrotoxicosis OR  "Thyroid dysgenesis" OR "Thyroid cancer" OR "Thyroid cancers" OR "Thyroid neoplasm" OR "Thyroid neoplasms" OR "Thyroid nodule" OR "Thyroid nodules" OR "Thyroid tumor" OR "Thyroid tumour" OR "Thyroid tumors" OR "Thyroid tumours" OR "Thyroid cyst" OR "Thyroid cysts" OR "Cancer of the thyroid"\n\n AND\n\n "Prevalence"[Mesh] OR "Epidemiology"[Mesh] OR "Prevalence" OR "Prevalences" OR Epidemiology OR Epidemiological\n\n AND\n\n "Australia"[Mesh] OR Australia OR Australian OR Australasian OR Australasia OR Queensland OR Victoria OR "New South Wales" OR "Northern Territory"'},
		{title: 'Prevalence of incidental thyroid cancer: A systematic review of autopsy studies', query: '(("Thyroid Neoplasms"[Mesh] OR "Adenocarcinoma, Follicular"[Mesh] OR "Adenocarcinoma, Papillary"[Mesh] OR OPTC)) OR (((Thyroid OR Follicular OR Papillary OR hurtle cell)) AND (cancer OR cancers OR carcinoma OR carcinomas OR Adenocarcinoma OR Adenocarcinomas neoplasm OR neoplasms OR nodule OR nodules OR tumor OR tumour OR Tumors OR Tumours OR cyst OR cysts))\n\nAND\n\n"Autopsy"[Mesh] OR "Autopsy" OR "Autopsies" OR Postmortem OR Post-mortem OR (Post AND mortem)\n\nAND\n\n"Prevalence"[Mesh] OR "Epidemiology"[Mesh] OR Prevalence OR Prevalences OR Epidemiology OR Epidemiological OR Frequency\n\nAND\n\n"Incidental Findings"[Mesh] OR Incidental OR Unsuspected OR Discovery OR Discoveries OR Findings OR Finding OR Occult OR Hidden'},
		{title: 'Positioning for acute respiratory distress in hospitalised infants and children', query: '# Lung diseases or other infections\nexp Lung Diseases/ OR exp Bronchial Diseases/ OR exp Respiratory Tract Infections/ OR exp Respiratory Insufficiency/ OR ((respir* or bronch*) adj3 (insuffic* or fail* or distress*)).tw. OR (acute lung injur* or ali).tw. OR (ards or rds).tw. OR (respiratory adj5 infect*).tw. OR (pneumon* or bronchopneumon*).tw. OR (bronchit* or bronchiolit*).tw. OR ((neonatal lung or neonatal respiratory) adj1 (diseas* or injur* or infect* or illness*)).tw. OR hyaline membrane diseas*.tw. OR bronchopulmonary dysplasia.tw. OR (croup or laryngotracheobronchit* or epiglottit* or whooping cough or legionel*).tw. OR (laryng* adj2 infect*).tw. OR (acute adj2 (episode or exacerbation*) adj3 (asthma or bronchiectasis or cystic fibrosis)).tw. OR respiratory syncytial viruses/ OR respiratory syncytial virus, human/ OR Respiratory Syncytial Virus Infections/ OR (respiratory syncytial virus* or rsv).tw.\n\nAND\n\n# Posture\nexp Posture/ OR (postur* or position*).tw. OR (supine or prone or semi-prone).tw. OR ((face or facing) adj5 down*).tw. OR (side adj5 (lay or laying or laid or lays or lying or lies)).tw. OR lateral.tw. OR upright.tw. OR (semi-recumbent or semirecumbent or semi-reclin* or semireclin* or reclin* or recumbent).tw. OR ((high or erect or non-erect or lean* or forward) adj5 (sit or sitting)).tw. OR (body adj3 tilt*).tw. OR (elevat* adj3 head*).tw.\n\nAND\n\n# RCTs\n<RCT Filter>'},
	],

	messages: {
		'NO_SINGLE_WILDCARD': 'There is no single character wildcard equievelent, so an unlimited matching length wildcard has been used instead',
		'NO_OPTIONAL_WILDCARD': 'There is no optional single character wildcard equievelent, so an unlimited matching length wildcard has been used instead',
	},

	variables: {
		no_field_tag: [] // Stores offsets for phrases with no field tags (for replacement)
	},

	/**
	* List of templates
	* Each key is the (case insensitive; specify in lowercase) keyword used in angular brackets
	* Each value is an object containing 'name', 'description', 'debugging' and an engines object with an additional 'default' key
	* @var {Object}
	* @example
	* {rct: {engines: {default: 'foo', ovid: 'bar'}}} // `<rct>` => 'foo' in most databases and 'bar' in Ovid MEDLINE
	*/
	// TODO: Update templates to match new engines
	templates: {
		// Meta `<engine>` template will output the current engine (useful for tests)
		'engine': {
			name: 'Engine name',
			debugging: true,
			description: 'The current output engine',
			engines: {
				default: 'unknown',
				cinahl: 'cinahl',
				cochrane: 'cochrane',
				embase: 'embase',
				mongodb: 'mongodb',
				ovid: 'ovid',
				psycinfo: 'psycinfo',
				pubmed: 'pubmed',
				scopus: 'scopus',
				wos: 'wos',
			},
		},
		'rct filter': {
			name: 'RCT Filter',
			description: 'Standard Cochrane RCT Filter',
			engines: {
				cinahl: '(MH "Clinical Trials+") OR (MH "Quantitative Studies") OR TI placebo* OR AB placebo* OR (MH "Placebos") OR (MH "Random Assignment") OR TI random* OR AB random* OR TI ((singl* or doubl* or tripl* or trebl*) W1 (blind* or mask*)) OR AB ((singl* or doubl* or tripl* or trebl*) W1 (blind* or mask*)) OR TI clinic* trial* OR AB clinic* trial* OR PT clinical trial',
				embase: "random* OR factorial OR crossover OR placebo OR blind OR blinded OR assign OR assigned OR allocate OR allocated OR 'crossover procedure'/exp OR 'double-blind procedure'/exp OR 'randomized controlled trial'/exp OR 'single-blind procedure'/exp NOT ('animal'/exp NOT ('animal'/exp AND 'human'/exp))",
				ovid: '((randomized controlled trial or controlled clinical trial).pt. or randomized.ab. or randomised.ab. or placebo.ab. or drug therapy.fs. or randomly.ab. or trial.ab. or groups.ab.) not (exp animals/ not humans.sh.)',
				psycinfo: 'SU.EXACT("Treatment Effectiveness Evaluation") OR SU.EXACT.EXPLODE("Treatment Outcomes") OR SU.EXACT("Placebo") OR SU.EXACT("Followup Studies") OR placebo* OR random* OR "comparative stud*" OR  clinical NEAR/3 trial* OR research NEAR/3 design OR evaluat* NEAR/3 stud* OR prospectiv* NEAR/3 stud* OR (singl* OR doubl* OR trebl* OR tripl*) NEAR/3 (blind* OR mask*)',
				pubmed: 'randomized controlled trial[pt] OR controlled clinical trial[pt] OR randomized[tiab] OR randomised[tiab] OR placebo[tiab] OR "drug therapy"[sh] OR randomly[tiab] OR trial[tiab] OR groups[tiab] NOT (Animals[Mesh] not (Animals[Mesh] and Humans[Mesh]))',
				wos: 'TS=(random* or placebo* or allocat* or crossover* or "cross over" or ((singl* or doubl*) NEAR/1 blind*)) OR TI=(trial)',
			},
		},
		'sr filter': {
			name: 'SR Filter',
			description: 'Standard Cochrane SR Filter',
			engines: {
				cinahl: 'TI Medline AB Medline OR TI Pubmed AB Pubmed OR (TI systematic AB systematic AND TI review AB review) OR TI meta-analysis OR AB meta-analysis',
				embase: 'Medline:ti,ab OR Pubmed:ti,ab OR (systematic:ti,ab AND review:ti,ab) OR meta-analysis:pt OR CDSR:jt',
				ovid: 'search:.tw.OR meta analysis.mp,pt.OR review.pt.OR di.xs. OR associated.tw.',
				pubmed: 'search*[Title/Abstract] OR meta analysis[Publication Type] OR meta analysis[Title/Abstract] OR meta analysis[MeSH] OR review[Publication Type] OR diagnosis[MeSH Subheading] OR associated[Title/Abstract]',
				wos: 'Medline OR Pubmed OR (systematic AND review) OR meta-analysis OR Cochrane',
			},
		},
	},
}