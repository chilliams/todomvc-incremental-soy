goog.provide('todo.app');

goog.require('incrementaldom');
goog.require('todo.models.TaskList');
goog.require('todo.views');

/** Start the app */
todo.app.main = function() {
    var app = new todo.app.TodoList();
    app.updatePage();

    /** Allow for hot swapping */
    todo.app.onReload = function() {
        app.updatePage();
    };
};

/** Top-level code for the app */
todo.app.TodoList = class {
    constructor() {
        /** @const {todo.models.TaskList} */
        this.todoList = new todo.models.TaskList(
            this.updatePage.bind(this)
        );
    }

    updatePage() {
        console.time('update page');
        incrementaldom.patch(
            document.getElementById('root'),
            todo.views.TodoList,
            this.todoList
        );
        console.timeEnd('update page');
    }
};
