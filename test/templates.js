var _ = require('lodash');
var expect = require('chai').expect;
var polyglot = require('..');

describe('Translate the meta template `<engine>`', function() {

	it('translate `<engine>` -> PM `pubmed`', function() {
		expect(polyglot.translate('<engine>', 'pubmed')).to.equal('pubmed');
	});

	it('translate PM `<engine>` -> OV `ovid`', function() {
		expect(polyglot.translate('<engine>', 'ovid')).to.equal('ovid');
	});

	it('translate PM `<engine>` -> CO `cochrane`', function() {
		expect(polyglot.translate('<engine>', 'cochrane')).to.equal('cochrane');
	});

	it('translate PM `<engine>` -> EM `embase`', function() {
		expect(polyglot.translate('<engine>', 'embase')).to.equal('embase');
	});

	it('translate PM `<engine>` -> CI `cinahl`', function() {
		expect(polyglot.translate('<engine>', 'cinahl')).to.equal('cinahl');
	});

	it('translate PM `<engine>` -> WS `wos`', function() {
		expect(polyglot.translate('<engine>', 'wos')).to.equal('wos');
	});

});


describe('Translate the meta template `<rct filter>`', function() {

	it('translate `<RCT Filter>` -> PM `pubmed`', function() {
		expect(polyglot.translate('<RCT Filter>', 'pubmed')).to.equal('randomized controlled trial[pt] OR controlled clinical trial[pt] OR randomized[tiab] OR randomised[tiab] OR placebo[tiab] OR "drug therapy"[MeSH] OR randomly[tiab] OR trial[tiab] OR groups[tiab] NOT (Animals[Mesh] not (Animals[Mesh] and Humans[Mesh]))');
	});

	it('translate PM `<RCT Filter>` -> OV `ovid`', function() {
		expect(polyglot.translate('<RCT Filter>', 'ovid')).to.equal('((randomized controlled trial or controlled clinical trial).pt. or randomized.ab. or randomised.ab. or placebo.ab. or drug therapy.fs. or randomly.ab. or trial.ab. or groups.ab.) not (exp animals/ not humans.sh.)');
	});

	it('translate PM `<RCT Filter>` -> CO `cochrane`', function() {
		expect(polyglot.translate('<RCT Filter>', 'cochrane')).to.equal('');
	});

	it('translate PM `<RCT Filter>` -> EM `embase`', function() {
		expect(polyglot.translate('<RCT Filter>', 'embase')).to.equal("random* OR factorial OR crossover OR placebo OR blind OR blinded OR assign OR assigned OR allocate OR allocated OR 'crossover procedure'/exp OR 'double-blind procedure'/exp OR 'randomized controlled trial'/exp OR 'single-blind procedure'/exp NOT ('animal'/exp NOT ('animal'/exp AND 'human'/exp))");
	});

	it('translate PM `<RCT Filter>` -> CI `cinahl`', function() {
		expect(polyglot.translate('<RCT Filter>', 'cinahl')).to.equal('(MH "Clinical Trials+") OR (MH "Quantitative Studies") OR TI placebo* OR AB placebo* OR (MH "Placebos") OR (MH "Random Assignment") OR TI random* OR AB random* OR TI ((singl* or doubl* or tripl* or trebl*) W1 (blind* or mask*)) OR AB ((singl* or doubl* or tripl* or trebl*) W1 (blind* or mask*)) OR TI clinic* trial* OR AB clinic* trial* OR PT clinical trial');
	});

	it('translate PM `<RCT Filter>` -> WS `wos`', function() {
		expect(polyglot.translate('<RCT Filter>', 'wos')).to.equal('TS=(random* or placebo* or allocat* or crossover* or "cross over" or ((singl* or doubl*) NEAR/1 blind*)) OR TI=(trial)');
	});

});
