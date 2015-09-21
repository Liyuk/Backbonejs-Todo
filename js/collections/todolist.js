define([
	'underscore',
	'backbone',
	'backboneLocalstorage',
	'models/todo'
], function(
	_,
	Backbone,
	Storage,
	Todo
) {
	var Todolist =  Backbone.Collection.extend({
		model: Todo,
		url: '',
		localStorage: new Backbone.LocalStorage("Storage"),

		done: function() {
			return this.where({
				done: true
			});

		},

		remain: function() {
			return this.where({
				done: false
			});

		},

	    nextOrder: function() {
			if (!this.length) 
				return 1;
      		return this.last().get('order') + 1;
    	},

    	comparator: 'order'

	});
	return Todolist;

});