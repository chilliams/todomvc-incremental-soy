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
        // hacks on hacks on hacks
        var oldList = app.todoList;
        app.todoList = new todo.models.TaskList(function() {
            app.updatePage();
        });
        app.todoList.tasks = oldList.tasks;
        app.todoList.tasks.forEach(function(task) {
            task.onChange = app.todoList.onChange;
            task.taskList = app.taskList;
        });
        app.todoList.onChange();
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
