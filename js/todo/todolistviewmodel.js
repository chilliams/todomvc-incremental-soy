goog.provide('todo.TodoListViewModel');

goog.require('goog.dom.classlist');
goog.require('goog.events.KeyCodes');
goog.require('todo.TaskViewModel');

todo.TodoListViewModel = class {
    constructor(params) {
        this.taskList = params.taskList;
        this.route = params.route;

        var totalCount = this.taskList.tasks.length;
        var completedCount = 0;
        var todoCount = 0;
        for (var i = 0; i < this.taskList.tasks.length; i++) {
            if (this.taskList.tasks[i].completed) {
                completedCount += 1;
            } else {
                todoCount += 1;
            }
        }

        this.totalCount = totalCount;
        this.todoCount = todoCount;
        this.completedCount = completedCount;

        this.tasks = this.taskList.tasks.map(function(task) {
            return new todo.TaskViewModel(task);
        });

        this.newTodoKeyup = this.newTodoKeyup.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
    }

    newTodoKeyup(event) {
        var value = goog.string.trim(
            event.currentTarget.value
        );
        if (event.keyCode === goog.events.KeyCodes.ENTER
            && !goog.string.isEmptyOrWhitespace(value)) {
            event.currentTarget.value = '';
            this.taskList.addTask(value);
        }
    }

    toggleAll(event) {
        this.taskList.setAllCompleted(
            !goog.dom.classlist.contains(event.currentTarget, "checked")
        );
    }

    clearCompleted(event) {
        this.taskList.clearCompleted();
    }
};
