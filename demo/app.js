import braceFix from 'braceFix';

import _ from 'lodash';
import ace from 'vue2-ace-editor';
import Vue from 'vue/dist/vue.esm.js';
import polyglot from 'polyglot';


$(()=> window.app = new Vue({
	el: '#app',
	data: {
		query: '',
		editorOptions: {
			showPrintMargin: false,
			wrap: true,
		},
		engines: polyglot.engines,
		enginesExpanded: {},
		enginesQuery: {},
		polyglotOptions: {
			groupLines: false,
			groupLinesAlways: true,
			removeNumbering: true,
			preserveNewLines: true,
			replaceWildcards: true,
			transposeLines: true,
		},
		exampleLast: '',
	},
	components: {
		editor: ace,
	},
	methods: {
		clear() {
			this.query = '';
		},
		showExample() {
			var chosenExample;
			do {
				chosenExample = _.sample(polyglot.examples);
			} while (this.exampleLast == chosenExample.title)
			this.exampleLast = chosenExample;
			this.query = chosenExample.query;
		},
		toggleExpandEngine(engine) {
			this.$set(this.enginesExpanded, engine.id, !this.enginesExpanded[engine.id]);
		},
		editorInit() { // Ace editor settings
			require('brace/mode/json');
			require('brace/theme/chrome');
		},
	},
	watch: {
		query() {
			_(polyglot.translateAll(this.query, this.polyglotOptions))
				.forEach((query, key) => this.$set(this.enginesQuery, key, query))
		},
	},
}));
