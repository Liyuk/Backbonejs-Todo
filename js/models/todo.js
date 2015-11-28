define([
    'underscore',
    'backbone'
], function(
    _,
    Backbone
) {
    /**
     * 单条对应model
     */
    var Todo = Backbone.Model.extend({
        // 默认参数为title
        // done标记状体
        defaults: {
            title: "",
            done: false
        },
        // 点击修改状态
        toggleDone: function() {
            return this.save({
                done: !this.get('done')
            });
        }

    });

    return Todo;

});
