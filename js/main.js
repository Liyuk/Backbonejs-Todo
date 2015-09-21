require.config({
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Storage'
		}
	},
	paths: {
		jquery: 'lib/jquery',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone/backbone',
		backboneLocalstorage: 'lib/backbone/backbone.localStorage',
		text: 'lib/require/text',
	}
});

require([
	'views/myView' 
], function(myView) {
	new myView;
});