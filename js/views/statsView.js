define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/stats.html'
], function(
	$,
	_,
	Backbone,
	statsTemplate
) {
	var StatsView = Backbone.View.extend({
		el: 'footer',
		template: _.template(statsTemplate),
		events: {
			"click #clear-completed" : "clearCompleted"
		},

		initialize: function() {
			this.listenTo(this.collection, "all", this.render);
		},

		render: function() {
			var done = this.collection.done().length;
			var remain = this.collection.remain().length;
			this.$el.html(this.template({
				done: done,
				remain: remain
			}));
			return this;
		},

		clearCompleted: function() {
			_.invoke(this.collection.done(), 'destroy');
			return false;
		}

	});
	return StatsView;
});