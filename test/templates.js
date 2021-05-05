var _ = require('lodash');
var expect = require('chai').expect;
const polyglot = require('../lib').default;
describe('Translate the meta template `<engine>`', ()=> {

	it('translate `<engine>` -> PM `PubMed abbreviation`', ()=> {
		expect(polyglot.translateGeneric('<engine>', 'PubMed abbreviation')).to.equal('PubMed abbreviation');
	});

	it('translate `<engine>` -> OV `Ovid MEDLINE`', ()=> {
		expect(polyglot.translateGeneric('<engine>', 'Ovid MEDLINE')).to.equal('ovid');
	});

	it('translate `<engine>` -> CO `Cochrane Library`', ()=> {
		expect(polyglot.translateGeneric('<engine>', 'Cochrane Library')).to.equal('Cochrane Library');
	});

	it('translate `<engine>` -> EM `Embase (Elsevier)`', ()=> {
		expect(polyglot.translateGeneric('<engine>', 'Embase (Elsevier)')).to.equal('Embase (Elsevier)');
	});

	it('translate `<engine>` -> CI `CINAHL (Ebsco)`', ()=> {
		expect(polyglot.translateGeneric('<engine>', 'CINAHL (Ebsco)')).to.equal('CINAHL (Ebsco)');
	});

	it('translate `<engine>` -> PY `PsycInfo (Ovid)`', ()=> {
		expect(polyglot.translateGeneric('<engine>', 'PsycInfo (Ovid)')).to.equal('PsycInfo (Ovid)');
	});

	it('translate `<engine>` -> SC `Scopus (advanced search)`', ()=> {
		expect(polyglot.translateGeneric('<engine>', 'Scopus (advanced search)')).to.equal('Scopus (advanced search)');
	});

	it('translate `<engine>` -> WS `Web of Science`', ()=> {
		expect(polyglot.translateGeneric('<engine>', 'Web of Science')).to.equal('Web of Science');
	});

});


describe('Translate the meta template `<rct filter>`', ()=> {

	it('translate `<RCT Filter>` -> PM', ()=> {
		expect(polyglot.translateGeneric('<RCT Filter>', 'PubMed abbreviation')).to.equal('randomized controlled trial[pt] OR controlled clinical trial[pt] OR randomized[tiab] OR randomised[tiab] OR placebo[tiab] OR "drug therapy"[sh] OR randomly[tiab] OR trial[tiab] OR groups[tiab] NOT (Animals[Mesh] not (Animals[Mesh] and Humans[Mesh]))');
	});

	it('translate `<RCT Filter>` -> OV', ()=> {
		expect(polyglot.translateGeneric('<RCT Filter>', 'Ovid MEDLINE')).to.equal('((randomized controlled trial or controlled clinical trial).pt. or randomized.ab. or randomised.ab. or placebo.ab. or drug therapy.fs. or randomly.ab. or trial.ab. or groups.ab.) not (exp animals/ not humans.sh.)');
	});

	it('translate `<RCT Filter>` -> CO', ()=> {
		expect(polyglot.translateGeneric('<RCT Filter>', 'Cochrane Library')).to.equal('');
	});

	it('translate `<RCT Filter>` -> EM', ()=> {
		expect(polyglot.translateGeneric('<RCT Filter>', 'Embase (Elsevier)')).to.equal("random* OR factorial OR crossover OR placebo OR blind OR blinded OR assign OR assigned OR allocate OR allocated OR 'crossover procedure'/exp OR 'double-blind procedure'/exp OR 'randomized controlled trial'/exp OR 'single-blind procedure'/exp NOT ('animal'/exp NOT ('animal'/exp AND 'human'/exp))");
	});

	it('translate `<RCT Filter>` -> CI', ()=> {
		expect(polyglot.translateGeneric('<RCT Filter>', 'CINAHL (Ebsco)')).to.equal('(MH "Clinical Trials+") OR (MH "Quantitative Studies") OR TI placebo* OR AB placebo* OR (MH "Placebos") OR (MH "Random Assignment") OR TI random* OR AB random* OR TI ((singl* or doubl* or tripl* or trebl*) W1 (blind* or mask*)) OR AB ((singl* or doubl* or tripl* or trebl*) W1 (blind* or mask*)) OR TI clinic* trial* OR AB clinic* trial* OR PT clinical trial');
	});

	it('translate `<RCT Filter>` -> PY', ()=> {
		expect(polyglot.translateGeneric('<RCT Filter>', 'PsycInfo (Ovid)')).to.equal('SU.EXACT("Treatment Effectiveness Evaluation") OR SU.EXACT.EXPLODE("Treatment Outcomes") OR SU.EXACT("Placebo") OR SU.EXACT("Followup Studies") OR placebo* OR random* OR "comparative stud*" OR  clinical NEAR/3 trial* OR research NEAR/3 design OR evaluat* NEAR/3 stud* OR prospectiv* NEAR/3 stud* OR (singl* OR doubl* OR trebl* OR tripl*) NEAR/3 (blind* OR mask*)');
	});

	it.skip('translate `<RCT Filter>` -> SC', ()=> {
		expect(polyglot.translateGeneric('<RCT Filter>', 'Scopus (advanced search)')).to.equal('FIXME');
	});

	it('translate `<RCT Filter>` -> WS', ()=> {
		expect(polyglot.translateGeneric('<RCT Filter>', 'Web of Science')).to.equal('TS=(random* or placebo* or allocat* or crossover* or "cross over" or ((singl* or doubl*) NEAR/1 blind*)) OR TI=(trial)');
	});

});


describe('Translate the meta template `<sr filter>`', ()=> {

	it.skip('translate `<SR Filter>` -> PM `PubMed abbreviation`', ()=> {
		expect(polyglot.translateGeneric('<SR Filter>', 'PubMed abbreviation')).to.equal('Medline[tiab] OR Pubmed[tiab] OR (systematic[tiab] AND review[tiab]) OR meta-analysis[ptyp] OR CDSR[so]');
	});

	it.skip('translate `<SR Filter>` -> OV', ()=> {
		expect(polyglot.translateGeneric('<SR Filter>', 'Ovid MEDLINE')).to.equal('Medline.tw. OR Pubmed.tw. OR (systematic.tw. AND review.tw.) OR meta-analysis.pt. OR CDSR.jn.');
	});

	it('translate `<SR Filter>` -> CO', ()=> {
		expect(polyglot.translateGeneric('<SR Filter>', 'Cochrane Library')).to.equal('');
	});

	it('translate `<SR Filter>` -> EM', ()=> {
		expect(polyglot.translateGeneric('<SR Filter>', 'Embase (Elsevier)')).to.equal('Medline:ti,ab OR Pubmed:ti,ab OR (systematic:ti,ab AND review:ti,ab) OR meta-analysis:pt OR CDSR:jt');
	});

	it('translate `<SR Filter>` -> CI', ()=> {
		expect(polyglot.translateGeneric('<SR Filter>', 'CINAHL (Ebsco)')).to.equal('TI Medline AB Medline OR TI Pubmed AB Pubmed OR (TI systematic AB systematic AND TI review AB review) OR TI meta-analysis OR AB meta-analysis');
	});

	it.skip('translate `<SR Filter>` -> PY', ()=> {
		expect(polyglot.translateGeneric('<SR Filter>', 'PsycInfo (Ovid)')).to.equal('FIXME');
	});

	it.skip('translate `<SR Filter>` -> SC', ()=> {
		expect(polyglot.translateGeneric('<SR Filter>', 'Scopus (advanced search)')).to.equal('FIXME');
	});

	it('translate `<SR Filter>` -> WS `Web of Science`', ()=> {
		expect(polyglot.translateGeneric('<SR Filter>', 'Web of Science')).to.equal('Medline OR Pubmed OR (systematic AND review) OR meta-analysis OR Cochrane');
	});

});
