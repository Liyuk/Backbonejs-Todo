define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/todo.html',
	'models/todo'
], function(
	$,
	_,
	Backbone,
	todoTemplate,
	Todo
) {
	var TodoView = Backbone.View.extend({
		tagName: "li",
		template: _.template(todoTemplate),
		events: {
			"click .toggle": "toggle",
			"dblclick .view": "edit",
			"click .destroy": "destroy",
			"keypress .edit": "updateOnEnter",
			"blur .edit": "close"
		},

		initialize: function() {
			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "destroy", this.remove);
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('done', this.model.get('done'));
			this.input = this.$('.edit');
			return this;
		},

		toggle: function() {
			this.model.toggleDone();
		},

		edit: function() {
			this.$el.addClass("editing");
			this.input.focus();
		},

		destroy: function() {
			this.model.destroy();
		},

		updateOnEnter: function(e) {
			if (e.keyCode == 13) {
				this.close();
			}
		},

		close: function() {
			var value = this.input.val();
			if (!value) {
				this.destroy();
			} else {
				this.model.save({
					title: value
				});
				this.$el.removeClass("editing")
			}
		}

	});

	return TodoView;

});