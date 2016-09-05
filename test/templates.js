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
