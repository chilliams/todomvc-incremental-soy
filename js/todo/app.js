goog.provide('todo.app');

goog.require('goog.events.KeyCodes');
goog.require('goog.string');
goog.require('todo.components');
goog.require('todo.models.Item');
goog.require('todo.models.ItemList');

goog.scope(function() {
    var incrementalDom = goog.module.get('incrementaldom');

    todo.app.init = function() {
        var onChange = function() {
            todo.app.render();
        };

        var list = [];
        for (var i = 0; i < 1000; i++) {
            list.push(new todo.models.Item('test-' + i, onChange));
        }

        var state = new todo.models.ItemList(list, onChange);
        todo.app.render = function() {
            incrementalDom.patch(
                document.getElementById('app'),
                todo.components.todoList,
                state
            );
        };
        todo.app.render();
        todo.app.onReload = function() {
            todo.app.render();
        };
    };
});
