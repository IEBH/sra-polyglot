<script>
import _ from 'lodash';
import ace from 'vue2-ace-editor';
import polyglot from 'polyglot';
import JsonTree from 'vue-json-tree'

export default {
	data: ()=> ({
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
			removeNumbering: false,
			preserveNewLines: true,
			replaceWildcards: true,
			transposeLines: true,
			highlighting: true,
		},
		exampleLast: '',
	}),
	components: {
		editor: ace,
		jsontree: JsonTree,
	},
	methods: {
		clear() {
			this.query = '';
		},
		copyQuery() {
			// Create new element
			var el = document.createElement('textarea');
			// Set value (string to be copied)
			el.value = this.query;
			// Set non-editable to avoid focus and move outside of view
			el.setAttribute('readonly', '');
			el.style = {position: 'absolute', left: '-9999px'};
			document.body.appendChild(el);
			// Select text inside element
			el.select();
			// Copy text to clipboard
			document.execCommand('copy');
			// Remove temporary element
			document.body.removeChild(el);
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
		loadTextFromFile(ev) {
			var myFile = ev.target.files[0];
			var reader = new FileReader();
			var _this = this;
			// reader.readAsText(myFile);
			/* reader.onload = function() {
				console.log(reader.result);
				this.query = reader.result
			} */
			reader.onload = (function(f) {
				return function(e) {
					_this.query = reader.result
				};
			})(myFile);
			reader.readAsText(myFile);
		}
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
			Type a PubMed or Ovid MEDLINE query in the box below to see its translations.
			<div class="text-muted">(or click here to see an example)</div>
		</div>

		<div class="row-fluid">
			<div class="card">
				<div class="card-header">
					Your query
					<div class="pull-right">
						<a v-on:click="clear()" class="btn btn-sm btn-default"><i class="fa fa-eraser"></i></a>
						<a v-on:click="copyQuery()" class="btn btn-sm btn-default"><i class="fa fa-clipboard"></i></a>
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

		<label class="text-reader">
			<span class="select-button">Import Search From .txt File</span>
			<input type="file" @change="loadTextFromFile">
  		</label>
		
		<hr/>

		<div class="accordion panel-group">
			<div v-for="engine in engines" :key="engine.id" class="card" id="customcard">
				<div class="card-header" v-on:click="toggleExpandEngine(engine)" >
					<a class="accordion-toggle collapsed">
						<i class="fa fa-fw" :class="enginesExpanded[engine.id] ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
						{{engine.title}}
					</a>
				</div>
				<div class="card-body collapse" :class="enginesExpanded[engine.id] && 'show'">
					<pre v-html="enginesQuery[engine.id]" v-if="enginesQuery[engine.id] && engine.id != 'lexicalTreeJSON' && engine.id != 'mongodb'"></pre>
					<jsontree v-if="enginesQuery[engine.id] && engine.id == 'lexicalTreeJSON'" :data="enginesQuery[engine.id]"></jsontree>
      				<hr>
					<!-- MongoDB not included at this stage -->
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.text-reader {
		margin: 20px 0px 0px 0px;
	}
	.text-reader > .select-button {
		padding: .5rem;

		color: #426E7B;
		background-color: #D3ECF1; 

		border-radius: .3rem;

		text-align: center;

		-webkit-transition-duration: 0.4s; /* Safari */
  		transition-duration: 0.4s;
	}

	.text-reader > .select-button:hover {
		background-color: #426E7B;
  		color: #D3ECF1;
	}

	.text-reader > input[type="file"] {
		display: none;
	}
</style>
