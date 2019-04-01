<script>
import _ from 'lodash';
import ace from 'vue2-ace-editor';
import polyglot from 'polyglot';

export default {
	data: ()=> ({
		query: '',
		editorOptions: {
			showPrintMargin: false,
			wrap: true,
		},
		previewOptions: {
			showPrintMargin: false,
			wrap: true,
			readOnly: true,
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
	}),
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
			import('brace/theme/chrome');
			
			window.ace.config.set('modePath', 'syntax/ace');
		},
	},
	watch: {
		query() {
			_(polyglot.translateAll(this.query, this.polyglotOptions))
				.forEach((query, key) => this.$set(this.enginesQuery, key, query))
		},
	},
};
</script>

<template>
	<div class="container">
		<div v-if="!query" v-on:click="showExample()" class="alert alert-info text-center">
			<div class="pull-left font-xl h1">
				<i class="fa fa-question-circle"></i>
			</div>
			Type a PubMed or Ovid MEDLINE query in the box above to see its translations.
			<div class="text-muted">(or click here to see an example)</div>
		</div>

		<div class="row-fluid">
			<div class="card">
				<div class="card-header">
					Your query
					<div class="pull-right">
						<a v-on:click="clear()" class="btn btn-sm btn-default"><i class="fa fa-eraser"></i></a>
						<a v-on:click="showExample()" class="btn btn-sm btn-default"><i class="fa fa-random" tooltip="Show a random example"></i></a>
					</div>
				</div>
				<div class="card-body p-0">
					<editor
						v-model="query"
						v-on:init="editorInit"
						lang="polyglot"
						theme="chrome"
						width="100%"
						height="380"
						v-bind:options="editorOptions"
					></editor>
				</div>
				
			</div>
		</div>

		<hr/>

		<div class="accordion panel-group">
			<div v-for="engine in engines" :key="engine.id" class="card">
				<div class="card-header" v-on:click="toggleExpandEngine(engine)" >
					<a class="accordion-toggle collapsed">
						<i class="fa fa-fw" :class="engine.expanded ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
						{{engine.title}}
					</a>
				</div>
				<div class="card-body collapse p-0" :class="enginesExpanded[engine.id] && 'show'">
					<editor
						v-if="enginesQuery[engine.id]"
						v-model="enginesQuery[engine.id]"
						v-on:init="editorInit"
						lang="polyglot"
						theme="chrome"
						width="100%"
						height="380"
						v-bind:options="previewOptions"
					></editor>
				</div>
			</div>
		</div>
		
	</div>
</template>
