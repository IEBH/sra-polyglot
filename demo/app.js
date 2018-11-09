import Vue from 'vue';
import editor from './editor.vue';

$(()=> window.app = new Vue({
	el: '#app',
	components: {
		editor,
	},
	template: '<editor/>',
}));
