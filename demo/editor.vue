<script>
import _ from 'lodash';
import ace from 'vue2-ace-editor';
import polyglot from '../src';
import global from '../src/modules/global.js'
import JsonTree from 'vue-json-tree'
import VRuntimeTemplate from "v-runtime-template";
import 'brace/theme/chrome';
import { createToken, getQuery } from "./api.js";

import TemplateRender from "./components/TemplateRedner.vue"

import engineObject from "../src/data/engineObject.js"

export default {
	data: ()=> ({
		global: global,
		query: '',
		seeds: '[]',
		editorOptions: {
			showPrintMargin: false,
			wrap: true,
		},
		engines: [...Object.keys(engineObject), 'lexicalTreeJSON'],
		enginesExpanded: {},
		enginesQuery: {},
		polyglotOptions: {
			groupLines: false,
			groupLinesAlways: true,
			removeNumbering: false,
			preserveNewLines: true,
			replaceWildcards: true,
			transposeLines: false,
			highlighting: true,
		},
		exampleLast: '',
	}),
	components: {
		editor: ace,
		jsontree: JsonTree,
		VRuntimeTemplate,
		TemplateRender
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
		copyContent(id) {
			// Create new element
			var el = document.createElement('textarea');
			// Set value (string to be copied)
			el.value = polyglot.translate(this.query, id, {html: false});
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
		openLink(link) {
			window.open(link, '_blank')
		},
		async openSearchRefiner() {
			var link = "https://ielab-sysrev2.uqcloud.net/plugin/queryvis?token="
			try {
				var token = await createToken(this.query, this.seeds); // TODO use pubmed translation maybe
				link = link.concat(token);
			} catch(e) {
				console.error(e);
			}
			window.open(link, '_blank')
		},
		showExample() {
			var chosenExample;
			do {
				chosenExample = _.sample(global.examples);
			} while (this.exampleLast == chosenExample.title)
			this.exampleLast = chosenExample;
			this.query = chosenExample.query;
		},
		insertTemplate(key) {
			let editor = this.$refs.queryEditor.editor;
			editor.insert("<" + key + ">");
		},
		toggleExpandEngine(engine) {
			this.$set(this.enginesExpanded, engine, !this.enginesExpanded[engine]);
		},
		editorInit() { // Ace editor settings
			window.ace.config.set('modePath', 'syntax/ace');
		},
		loadTextFromFile(ev) {
			var myFile = ev.target.files[0];
			var reader = new FileReader();
			var _this = this;
			reader.onload = (function(f) {
				return function(e) {
					_this.query = reader.result.replace(/\r/g, '')
				};
			})(myFile);
			reader.readAsText(myFile);
		},
		translateAll: _.debounce(function() {
			localStorage.query = this.query;
			_(polyglot.translateAllGeneric(this.query, this.polyglotOptions))
				.forEach((query, key) => this.$set(this.enginesQuery, key, query))
		}, 500),
	},
	async mounted() {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const token = urlParams.get('token')
		if(token) {
			try {
				[this.query, this.seeds] = await getQuery(token)
			} catch(e) {
				console.error(e);
			}
		}
		else if (localStorage.query) {
			this.query = localStorage.query;
		}
		if (localStorage.transposeLines) {
			this.polyglotOptions.transposeLines = localStorage.transposeLines;
		}
	},
	watch: {
		query: function() {
			this.translateAll();
		},
		'polyglotOptions.transposeLines': function() {
			localStorage.transposeLines = this.polyglotOptions.transposeLines;
			this.translateAll();
		},
	},
};
</script>

<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<a class="navbar-brand" href="#">Polyglot</a>
			<div class="ml-auto">
				<button class="btn btn-success" @click="openLink('https://www.ncbi.nlm.nih.gov/pubmed/32256231')">Cite</button>
				<button class="btn btn-info ml-2" @click="openLink('http://sr-accelerator.com/#/help/polyglot')">Help</button>
			</div>
		</nav>
		<div class="container mt-3">
			<div class="row-fluid">
				<div class="card">
					<div class="card-header">
						Your query
						<div class="pull-right">
							<input type="checkbox" id="checkbox" v-model="polyglotOptions.transposeLines">
							<label for="checkbox">Replace Line References</label>
							<a v-on:click="clear()" class="btn btn-sm btn-default"><i class="fa fa-eraser" title="Clear search"></i></a>
							<a v-on:click="copyQuery()" class="btn btn-sm btn-default"><i class="fa fa-clipboard" title="Copy to clipboard"></i></a>
							<a v-on:click="showExample()" class="btn btn-sm btn-default"><i class="fa fa-random" title="Show a random example"></i></a>
							<span class="dropdown">
								<a class="btn btn-sm btn-default" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<i class="fa fa-caret-down" title="Insert Template"></i>
								</a>
								<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<a v-for="(template, key) in global.templates" :key="key" class="dropdown-item" href="#" v-on:click="insertTemplate(key)">{{template.name}}</a>
								</div>
							</span>
						</div>
					</div>
					<div class="card-body p-0">
						<editor
							ref='queryEditor'
							v-model="query"
							v-on:init="editorInit"
							lang="polyglot"
							theme="chrome"
							width="100%"
							height="380"
							v-bind:options="editorOptions"
						></editor>
					</div>
						<div v-if="!query" v-on:click="showExample()" class="card-footer text-center">
						Type a PubMed or Ovid MEDLINE query in the box above to see its translations
						<span class="text-muted">(or click here to see an example)</span>
					</div>
				</div>
			</div>

			<label class="text-reader">
				<span class="select-button" @click="openSearchRefiner">Open Query in SearchRefiner</span>
			</label>
			<label class="text-reader">
				<span class="select-button">Import Search From .txt File</span>
				<input type="file" @change="loadTextFromFile">
			</label>
			
			<hr/>

			<div class="accordion panel-group">
				<div v-for="engine in engines" :key="engine" class="card" id="customcard">
					<div class="card-header" v-on:click="toggleExpandEngine(engine)" >
						<a class="accordion-toggle collapsed">
							<i class="fa fa-fw" :class="enginesExpanded[engine] ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
							{{engine}}
						</a>
						<div class="pull-right">
							<a v-if="engine != 'lexicalTreeJSON'" v-on:click.stop="copyContent(engine)" class="btn btn-sm btn-default"><i class="fa fa-clipboard" title="Copy to clipboard"></i></a>
						</div>
					</div>
					<div class="card-body collapse" :class="enginesExpanded[engine] && 'show'">
						<TemplateRender 
							v-if="enginesQuery[engine] && engine != 'lexicalTreeJSON' && engine != 'mongodb'" 
							:template="`<div>${enginesQuery[engine]}</div>`"
							:query="query"
							@replaceFields="query = $event"
						/>
						<jsontree v-if="enginesQuery[engine] && engine == 'lexicalTreeJSON'" :data="enginesQuery[engine]"></jsontree>
						<hr>
						<!-- MongoDB not included at this stage -->
					</div>
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
