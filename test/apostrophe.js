var expect = require('chai').expect;
const polyglot = require('../lib').default;

// Regression tests for the parser incorrectly treating an apostrophe used as a contraction/possessive
// (e.g. "children's", "don't") as the closing delimiter of a single-quoted phrase, which used to cut
// the phrase short and throw off the rest of the parse.
describe('Translate phrases containing an apostrophe (contraction/possessive)', () => {

	it(`translate 'children's health' -> PM "children's health" (contraction does not close the phrase early)`, () => {
		expect(polyglot.translate(`'children's health'`, 'PubMed full')).to.equal(`"children's health"`);
	});

	it(`translate 'don't stop' -> PM "don't stop"`, () => {
		expect(polyglot.translate(`'don't stop'`, 'PubMed full')).to.equal(`"don't stop"`);
	});

	it(`translate 'women's and children's health' -> PM (two contractions in one phrase)`, () => {
		expect(polyglot.translate(`'women's and children's health'`, 'PubMed full')).to.equal(`"women's and children's health"`);
	});

	it(`translate 'children's health' -> CO "children's health"`, () => {
		expect(polyglot.translate(`'children's health'`, 'Cochrane Library')).to.equal(`"children's health"`);
	});

	it(`translate 'children's health' -> WS "children's health"`, () => {
		expect(polyglot.translate(`'children's health'`, 'WoS Advanced')).to.equal(`"children's health"`);
	});

	it(`translate "children's health" -> PM (double-quoted phrase containing an apostrophe is unaffected)`, () => {
		expect(polyglot.translate(`"children's health"`, 'PubMed full')).to.equal(`"children's health"`);
	});

	it(`translate children's -> PM (bare term with apostrophe, no phrase quotes)`, () => {
		expect(polyglot.translate(`children's`, 'PubMed full')).to.equal(`children's`);
	});

	// Regression guard: a phrase with no apostrophe at all should still parse exactly as before
	it(`translate 'simple phrase' -> PM "simple phrase"`, () => {
		expect(polyglot.translate(`'simple phrase'`, 'PubMed full')).to.equal(`"simple phrase"`);
	});

});

// Embase specifically can't handle an apostrophe within a term, so a contraction/possessive apostrophe
// (one immediately followed by a letter) is replaced with a space instead.
describe('Translate phrases containing an apostrophe (Embase-specific space substitution)', () => {

	it(`translate 'children's health' -> EM 'children s health'`, () => {
		expect(polyglot.translate(`'children's health'`, 'Embase (Elsevier)')).to.equal(`'children s health'`);
	});

	it(`translate children's -> EM children s (bare term, no phrase quotes)`, () => {
		expect(polyglot.translate(`children's`, 'Embase (Elsevier)')).to.equal(`children s`);
	});

});
