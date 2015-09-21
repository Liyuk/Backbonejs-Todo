define([
	'underscore',
	'backbone'
], function(
	_,
	Backbone
) {
	var Todo = Backbone.Model.extend({
		defaults: {
			title: "",
			done: false
		},
		toggleDone: function() {
			//保存
			return this.save({
				done: !this.get('done')
			});
		}
	});
	return Todo;
});