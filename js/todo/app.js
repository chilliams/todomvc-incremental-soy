goog.provide('todo.app');

goog.require('goog.events.KeyCodes');
goog.require('goog.History');
goog.require('goog.string');
goog.require('incrementaldom');
goog.require('todo.presenters');
goog.require('todo.models.Item');
goog.require('todo.models.ItemList');

goog.scope(function() {
    todo.app.TodoList = class {
        constructor(element) {
            this.element = element;
            this.itemList = new todo.models.ItemList(
                this.render.bind(this)
            );

            this.history = new goog.History();
            this.history.setEnabled(true);
            goog.events.listen(
                this.history,
                goog.History.EventType.NAVIGATE,
                this.render.bind(this)
            );
        }

        render() {
            incrementaldom.patch(
                this.element,
                todo.presenters.todoList,
                {
                    itemList: this.itemList,
                    route: this.history.getToken()
                }
            );
        }
    };

    todo.app.init = function() {
        var app = new todo.app.TodoList(
            document.getElementById('app')
        );
        app.render();
        todo.app.onReload = function() {
            app.render();
        };
    };
});
