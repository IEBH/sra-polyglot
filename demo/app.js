// var Vue = require('vue');
import Vue from 'vue/dist/vue.esm.js';
var app;

$(()=> app = new Vue({
	el: '#app',
	data: {
		message: 'Hello World!',
	},
}));
