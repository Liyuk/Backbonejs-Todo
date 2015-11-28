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
    /**
     * 个人推荐使用语义更明确的写法:
     *   mainView = Backbone.View.extend({});
     *   return mainView;
     * 另一种写法是没有问题的，但是语义不够明确:
     *   return Backbone.View.extend()
     */

    mainView = Backbone.View.extend({
        /**
         * Backbone.View绑定dom，这里也可以传入一个jquery选择器
         *   `el: $('#todoapp')`
         * 这种方式可以作用于调用其他View时传入
         * 典型例子为js未渲染模版时，调用组件渲染当前js渲染模版的内容
         *   `el: this.$('todoapp')`
         */
        el: $('#todoapp'),
        /**
         * mainView相当于MVC模式中的controller，实现了MVC模式
         * 在Backbone中，C层并没有单独提出来写一个控制器，而是在一个单独的View中实现控制器的效果
         * Marionette也是同样，采用了layout和region，能够更多的去对View进行管理
         */
        events: {},
        /**
         * 构造函数，初始化控制器
         * mainView只负责控制，具体的事务由View内部完成
         */
        initialize: function() {
            this.footer = this.$el.find('footer');
            this.main = $('#main');
            this.todoCollection = new TodoList;
            // 输入框实例化后，将collection绑定
            var inputView = new InputView({
                collection: this.todoCollection
            });
            $('#todoapp').prepend(inputView.render().el);
            // 全选按钮实例化，同样将数据绑定
            var toggleAllView = new ToggleAllView({
                collection: this.todoCollection
            });
            this.main.prepend(toggleAllView.render().el);
            this.allCheckbox = this.$("#toggle-all")[0];
            // 监听collection的事件，绑定this 的事件
            // 实现 Model －> Controller -> View 模式
            this.listenTo(this.todoCollection, "add", this.addOne);
            this.listenTo(this.todoCollection, "reset", this.addAll);
            this.listenTo(this.todoCollection, "all", this.render);
            // 获取本地数据
            this.todoCollection.fetch();
            // 实例化底部状态栏，绑定数据
            var statsView = new StatsView({
                collection: this.todoCollection
            });
            this.footer.append(statsView.render().el);
        },
        /**
         * 渲染函数，最开始渲染是因为collection.fetch
         */
        render: function() {
            if (this.todoCollection.length) {
                this.main.show();
                this.footer.show();
            } else {
                this.main.hide();
                this.footer.hide();
            }
        },
        /**
         * @param {todo}
         * 传入参数为model
         */
        addOne: function(todo) {
            var view = new TodoView({
                model: todo
            });
            this.$("#todo-list").append(view.render().el);
        },
        /**
         * 渲染所有数据
         */
        addAll: function() {
            this.todoCollection.each(this.addOne, this);
        }

    });

    return mainView;

});
