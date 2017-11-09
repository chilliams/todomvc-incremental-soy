goog.provide('todo.TodoListViewModel');

goog.require('goog.events.KeyCodes');
goog.require('todo.TaskViewModel');

/** View model for todo.views.TodoList */
todo.TodoListViewModel = class {
    /**
     * @constructor
     * @param {todo.models.TaskList} taskList
     */
    constructor(taskList) {
        /** @const {todo.models.TaskList} */
        this.taskList = taskList;
        /** @const {number} */
        this.totalCount = this.taskList.tasks.length;
        /** @const {number} */
        this.completedCount = this.taskList.getCompletedTasks().length;
        /** @const {number} */
        this.todoCount = this.taskList.getTodoTasks().length;
        /** @const {Array<todo.TaskViewModel>} */
        this.tasks = this.taskList.tasks.map(function(task) {
            return new todo.TaskViewModel(task);
        });

        this.newTodoKeyup = this.newTodoKeyup.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
    }

    /** @param {Object} event */
    toggleAll(event) {
        this.taskList.setAllCompleted(
            !(this.totalCount === this.completedCount)
        );
    }

    /** @param {Object} event */
    newTodoKeyup(event) {
        var value = goog.string.trim(
            event.currentTarget.value
        );
        if (event.keyCode === goog.events.KeyCodes.ENTER
            && !goog.string.isEmptyOrWhitespace(value))
        {
            event.currentTarget.value = '';
            this.taskList.addTask(value);
        }
    }

    /** @param {Object} event */
    clearCompleted(event) {
        this.taskList.clearCompleted();
    }
};
