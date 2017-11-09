goog.provide('todo.app');

goog.require('incrementaldom');
goog.require('todo.models.TaskList');
goog.require('todo.TodoListViewModel');
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
    /** @constructor */
    constructor() {
        /** @const {todo.models.TaskList} */
        this.taskList = new todo.models.TaskList(
            this.updatePage.bind(this)
        );
    }

    updatePage() {
        console.time('update page');
        incrementaldom.patch(
            document.getElementById('root'),
            todo.views.TodoList,
            new todo.TodoListViewModel(this.taskList)
        );
        console.timeEnd('update page');
    }
};
