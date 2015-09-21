define([
	'jquery',
	'underscore',
	'backbone',
	'collections/todolist',
	'views/todoView',
	'views/inputView',
	'views/statsView',
	'views/toggleAllView'
], function(
	$,
	_,
	Backbone,
	TodoList,
	TodoView,
	InputView,
	StatsView,
	ToggleAllView
) {
	myView = Backbone.View.extend({
		el: "#todoapp",
		events: {

		},

		initialize: function() {
			this.footer = this.$el.find('footer');
			this.main = $('#main');
			this.todoCollection = new TodoList;
			inputView = new InputView({
				collection: this.todoCollection
			});
			$("#todoapp").prepend(inputView.render().el);

			var toggleAllView = new ToggleAllView({
				collection: this.todoCollection
			});
			this.main.prepend(toggleAllView.render().el);
			this.allCheckbox = this.$("#toggle-all")[0];

			this.listenTo(this.todoCollection, "add", this.addOne);
			this.listenTo(this.todoCollection, "reset", this.addAll);
			this.listenTo(this.todoCollection, "all", this.render);

			this.todoCollection.fetch();

			statsView = new StatsView({
				collection: this.todoCollection
			});
			this.footer.append(statsView.render().el);
		},

		render: function() {
			var done = this.todoCollection.done().length;
			var remain = this.todoCollection.remain().length;
			this.allCheckbox = this.$("#toggle-all")[0];
			if (this.todoCollection.length) {
				this.main.show();
				this.footer.show();
				this.footer.html();
			}else {
        		this.main.hide();
        		this.footer.hide();
      		}
		},

		addOne: function(todo) {
			view = new TodoView({
				model: todo
			});
			this.$("#todo-list").append(view.render().el);
		},

		addAll: function() {
			this.todoCollection.each(this.addOne, this);
		}

	});

	return myView;

});