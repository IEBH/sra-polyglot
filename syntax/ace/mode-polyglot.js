ace.define("ace/mode/polyglot_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(require, exports) {
	var oop = require("../lib/oop");
	var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

	var PolyglotHighlightRules = function() {
		var keywordMapper = this.createKeywordMapper({
			'keyword': 'AND|OR|NOT',
			'support.type': '\*|\?|%',
		}, 'text', true);

		this.$rules = {
			start: [
				{
					token: 'comment',
					regex: /^\s*#/,
					next: 'qcomment',
				},
				{
					token: 'string',
					regex: '"(?=.)',
					next: 'qstring',
				},
				{
					token: 'constant.language',
					regex: /\[mesh\]/,
					caseInsensitive: true,
				},
				{
					token: "paren.lparen",
					regex : "[\\[({]",
				},
				{
					token: "paren.rparen",
					regex : "[\\])}]",
				},
				{
					token: 'constant.language',
					regex: /exp .+?\//,
				},
				{
					token: 'string.interpolated',
					regex: /\<.+?\>/,
				},
				{
					token: 'keyword.other',
					regex: /\*/,
				},
				{
					token: 'keyword',
					regex: /\badj[0-9]+\b/,
				},
				{
					token: 'variable.parameter',
					token: '*',
				},
				{
					token: 'variable',
					regex: /\.[a-z]{2}\./,
				},
				{
					token: keywordMapper,
					regex: "\\b\\w+\\b",
				},
			],
			qcomment: [
				{
					token: 'comment',
					regex: '$',
					next: 'start',
				},
				{
					defaultToken: 'comment',
				},
			],
			qstring: [
				{
					token: 'string',
					regex: '\\\\$',
					consumeLineEnd: true,
				},
				{
					token: 'string',
					regex: '"|$',
					next: 'start',
				},
				{
					defaultToken: 'string',
				},
			],
			qnstring: [
				{
					token: 'string',
					regex: '\\\\$',
					consumeLineEnd: true,
				},
				{
					token: 'string',
					regex: '[^a-zA-Z0-9]',
					next: 'start',
				},
				{
					defaultToken: 'string',
				},
			],
		};

		return this;
	};
	oop.inherits(PolyglotHighlightRules, TextHighlightRules);

	exports.PolyglotHighlightRules = PolyglotHighlightRules;
});

ace.define("ace/mode/polyglot", ["require", "exports", "module", "ace/lib/oop"], function(require, exports) {
	var oop = require("../lib/oop");
	var TextMode = require("../mode/text").Mode;
	var PolyglotHighlightRules = require("./polyglot_highlight_rules").PolyglotHighlightRules;

	var Mode = function() {
		this.HighlightRules = PolyglotHighlightRules;
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);

	(function() {
		this.$id = "ace/mode/polyglot";
		this.lineCommentStart = ["#"];
		this.blockComment = {start: "/*", end: "*/"};
	}).call(Mode.prototype);

	exports.Mode = Mode;
});
