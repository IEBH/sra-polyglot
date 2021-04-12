var _ = require('lodash');
var expect = require('chai').expect;
import polyglot from '../src';
describe('Translate the meta template `<engine>`', ()=> {

	it('translate `<engine>` -> PM `pubmed`', ()=> {
		expect(polyglot.translate('<engine>', 'pubmed')).to.equal('pubmed');
	});

	it('translate `<engine>` -> OV `medlineOvid`', ()=> {
		expect(polyglot.translate('<engine>', 'medlineOvid')).to.equal('ovid');
	});

	it('translate `<engine>` -> CO `cochrane`', ()=> {
		expect(polyglot.translate('<engine>', 'cochrane')).to.equal('cochrane');
	});

	it('translate `<engine>` -> EM `embase`', ()=> {
		expect(polyglot.translate('<engine>', 'embase')).to.equal('embase');
	});

	it('translate `<engine>` -> CI `cinahl`', ()=> {
		expect(polyglot.translate('<engine>', 'cinahl')).to.equal('cinahl');
	});

	it('translate `<engine>` -> PY `psycinfo`', ()=> {
		expect(polyglot.translate('<engine>', 'psycinfo')).to.equal('psycinfo');
	});

	it('translate `<engine>` -> SC `scopus`', ()=> {
		expect(polyglot.translate('<engine>', 'scopus')).to.equal('scopus');
	});

	it('translate `<engine>` -> WS `wos`', ()=> {
		expect(polyglot.translate('<engine>', 'wos')).to.equal('wos');
	});

});


describe('Translate the meta template `<rct filter>`', ()=> {

	it('translate `<RCT Filter>` -> PM', ()=> {
		expect(polyglot.translate('<RCT Filter>', 'pubmed')).to.equal('randomized controlled trial[pt] OR controlled clinical trial[pt] OR randomized[tiab] OR randomised[tiab] OR placebo[tiab] OR "drug therapy"[sh] OR randomly[tiab] OR trial[tiab] OR groups[tiab] NOT (Animals[Mesh] not (Animals[Mesh] and Humans[Mesh]))');
	});

	it('translate `<RCT Filter>` -> OV', ()=> {
		expect(polyglot.translate('<RCT Filter>', 'medlineOvid')).to.equal('((randomized controlled trial or controlled clinical trial).pt. or randomized.ab. or randomised.ab. or placebo.ab. or drug therapy.fs. or randomly.ab. or trial.ab. or groups.ab.) not (exp animals/ not humans.sh.)');
	});

	it('translate `<RCT Filter>` -> CO', ()=> {
		expect(polyglot.translate('<RCT Filter>', 'cochrane')).to.equal('');
	});

	it('translate `<RCT Filter>` -> EM', ()=> {
		expect(polyglot.translate('<RCT Filter>', 'embase')).to.equal("random* OR factorial OR crossover OR placebo OR blind OR blinded OR assign OR assigned OR allocate OR allocated OR 'crossover procedure'/exp OR 'double-blind procedure'/exp OR 'randomized controlled trial'/exp OR 'single-blind procedure'/exp NOT ('animal'/exp NOT ('animal'/exp AND 'human'/exp))");
	});

	it('translate `<RCT Filter>` -> CI', ()=> {
		expect(polyglot.translate('<RCT Filter>', 'cinahl')).to.equal('(MH "Clinical Trials+") OR (MH "Quantitative Studies") OR TI placebo* OR AB placebo* OR (MH "Placebos") OR (MH "Random Assignment") OR TI random* OR AB random* OR TI ((singl* or doubl* or tripl* or trebl*) W1 (blind* or mask*)) OR AB ((singl* or doubl* or tripl* or trebl*) W1 (blind* or mask*)) OR TI clinic* trial* OR AB clinic* trial* OR PT clinical trial');
	});

	it('translate `<RCT Filter>` -> PY', ()=> {
		expect(polyglot.translate('<RCT Filter>', 'psycinfo')).to.equal('SU.EXACT("Treatment Effectiveness Evaluation") OR SU.EXACT.EXPLODE("Treatment Outcomes") OR SU.EXACT("Placebo") OR SU.EXACT("Followup Studies") OR placebo* OR random* OR "comparative stud*" OR  clinical NEAR/3 trial* OR research NEAR/3 design OR evaluat* NEAR/3 stud* OR prospectiv* NEAR/3 stud* OR (singl* OR doubl* OR trebl* OR tripl*) NEAR/3 (blind* OR mask*)');
	});

	it.skip('translate `<RCT Filter>` -> SC', ()=> {
		expect(polyglot.translate('<RCT Filter>', 'scopus')).to.equal('FIXME');
	});

	it('translate `<RCT Filter>` -> WS', ()=> {
		expect(polyglot.translate('<RCT Filter>', 'wos')).to.equal('TS=(random* or placebo* or allocat* or crossover* or "cross over" or ((singl* or doubl*) NEAR/1 blind*)) OR TI=(trial)');
	});

});


describe('Translate the meta template `<sr filter>`', ()=> {

	it.skip('translate `<SR Filter>` -> PM `pubmed`', ()=> {
		expect(polyglot.translate('<SR Filter>', 'pubmed')).to.equal('Medline[tiab] OR Pubmed[tiab] OR (systematic[tiab] AND review[tiab]) OR meta-analysis[ptyp] OR CDSR[so]');
	});

	it.skip('translate `<SR Filter>` -> OV', ()=> {
		expect(polyglot.translate('<SR Filter>', 'medlineOvid')).to.equal('Medline.tw. OR Pubmed.tw. OR (systematic.tw. AND review.tw.) OR meta-analysis.pt. OR CDSR.jn.');
	});

	it('translate `<SR Filter>` -> CO', ()=> {
		expect(polyglot.translate('<SR Filter>', 'cochrane')).to.equal('');
	});

	it('translate `<SR Filter>` -> EM', ()=> {
		expect(polyglot.translate('<SR Filter>', 'embase')).to.equal('Medline:ti,ab OR Pubmed:ti,ab OR (systematic:ti,ab AND review:ti,ab) OR meta-analysis:pt OR CDSR:jt');
	});

	it('translate `<SR Filter>` -> CI', ()=> {
		expect(polyglot.translate('<SR Filter>', 'cinahl')).to.equal('TI Medline AB Medline OR TI Pubmed AB Pubmed OR (TI systematic AB systematic AND TI review AB review) OR TI meta-analysis OR AB meta-analysis');
	});

	it.skip('translate `<SR Filter>` -> PY', ()=> {
		expect(polyglot.translate('<SR Filter>', 'psycinfo')).to.equal('FIXME');
	});

	it.skip('translate `<SR Filter>` -> SC', ()=> {
		expect(polyglot.translate('<SR Filter>', 'scopus')).to.equal('FIXME');
	});

	it('translate `<SR Filter>` -> WS `wos`', ()=> {
		expect(polyglot.translate('<SR Filter>', 'wos')).to.equal('Medline OR Pubmed OR (systematic AND review) OR meta-analysis OR Cochrane');
	});

});
