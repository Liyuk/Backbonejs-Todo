define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/input.html'
], function(
	$,
	_,
	Backbone,
	inputTemplate
) {
	var InputView = Backbone.View.extend({
		tagName: 'header',
		template: _.template(inputTemplate),
		events: {
			"keypress #new-todo" : "createOnEnter"
		},

		initialize: function() {

		},

		render: function() {
			this.$el.html(this.template());
			return this;
		},

		createOnEnter: function(e) {
			this.input = $('#new-todo');
			if (e.keyCode != 13) 
				return;
			value = this.input.val();
			if (!this.input.val()) 
				return;
			value = this.input.val();
			this.collection.create({
				title: this.input.val()
			});
			this.input.val("");
		}

	});

	return InputView;

});