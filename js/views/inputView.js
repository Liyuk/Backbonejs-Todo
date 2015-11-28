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
    /**
     * InputView控制输入框
     */
    var InputView = Backbone.View.extend({

        tagName: 'header',

        template: _.template(inputTemplate),

        events: {
            "keypress #new-todo": "createOnEnter"
        },

        initialize: function() {},

        render: function() {
            this.$el.html(this.template());
            return this;
        },

        createOnEnter: function(e) {
            // 判断是否为回车
            if (e.keyCode != 13) {
                return;
            }
            this.input = $('#new-todo');
            var value = this.input.val();
            // 判断是否为空
            if (!value) {
                return;
            }
            this.collection.create({
                title: value
            });
            this.input.val("");
        }

    });

    return InputView;

});
