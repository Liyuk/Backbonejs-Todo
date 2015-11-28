define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/toggleAll.html'
], function(
    $,
    _,
    Backbone,
    toggleAllTemplate
) {

    var ToggleAllView = Backbone.View.extend({

        template: _.template(toggleAllTemplate),

        events: {
            "click #toggle-all": "toggleAllComplete"
        },

        initialize: function() {},

        render: function() {
            this.$el.html(this.template());
            var done = this.collection.done().length;
            var remain = this.collection.remain().length;
            this.allCheckbox = this.$("#toggle-all")[0];
            this.allCheckbox.checked != remain;
            return this;
        },

        toggleAllComplete: function() {
            var done = this.allCheckbox.checked;
            this.collection.each(function(todo) {
                todo.save({
                    done: done
                });
            });
        }

    });

    return ToggleAllView;

});
