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
    // 集合，用于管理数据
    var Todolist = Backbone.Collection.extend({

        model: Todo,

        url: '',
        // 存储于localStorage里
        localStorage: new Backbone.LocalStorage("Storage"),
        // 状态修改
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
            if (!this.length) {
                return 1;
            }
            return this.last().get('order') + 1;
        },

        comparator: 'order'

    });

    return Todolist;

});
