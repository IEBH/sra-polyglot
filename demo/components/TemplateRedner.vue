<script>
import Vue from 'vue';
import global from '../../src/modules/global.js'

export default {
    props: ['template', 'query'],
	data() {
		return {
		    global: global,
			templateRender: null,
			// Custom properties for field replacing
			customField: '',
			replaceAll: false,
		};
	},
	render(h) {
		if (!this.templateRender) {
			return h('div', 'loading...');
		} else { // If template exists, display it
			return this.templateRender();
		}
	},
	watch: {
		// Watch template component for changes
		template:{
			immediate: true, // Fire watcher on first render
			handler() {
				var res = Vue.compile(this.template);
				this.templateRender = res.render;
				// staticRenderFns belong into $options, 
				this.$options.staticRenderFns = []
				// clean the cache of static elements
				// this is a cache with the results from the staticRenderFns
				this._staticTrees = []
				// Fill it with the new staticRenderFns
				for (var i in res.staticRenderFns) {
					//staticRenderFns.push(res.staticRenderFns[i]);
					this.$options.staticRenderFns.push(res.staticRenderFns[i])
				}
			}
		}
	},
	methods: {
		// Custom method to replace fields
		replaceFields(field, replace_all, offset) {
            let newQuery = this.query
			if (replace_all) {
				var itemsToReplace = global.variables.no_field_tag.slice(0).reverse(); // Work backwards through items
				for (var x in itemsToReplace) {
					// If original query is surrounded by quotation marks, 2 must be added to offset
					itemsToReplace[x] = (/(\W)/.test(newQuery[itemsToReplace[x]]))? itemsToReplace[x] : itemsToReplace[x]+2;
					if (/(\W)/.test(newQuery[itemsToReplace[x]]) || typeof newQuery[itemsToReplace[x]] === "undefined") {
						newQuery = newQuery.slice(0, itemsToReplace[x]) + field + newQuery.slice(itemsToReplace[x]);
					}
				}
			} else {
				// If original query is surrounded by quotation marks, 2 must be added to offset
				offset = (/(\W)/.test(newQuery[offset]))? offset : offset+2;
				if (/(\W)/.test(newQuery[offset]) || typeof newQuery[offset] === "undefined") {
					newQuery = newQuery.slice(0, offset) + field + newQuery.slice(offset);
				}
            }
            this.$emit('replaceFields', newQuery);
		},
	}  
}
</script>

<style scoped>
div {
   display: inline; 
}
</style>