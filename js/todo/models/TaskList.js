goog.provide('todo.models.TaskList');

goog.require('goog.events.KeyCodes');
goog.require('goog.string');
goog.require('todo.models.Task');

/** View model for our todo list */
todo.models.TaskList = class {
    /** @param {Function} onChange */
    constructor(onChange) {
        /** @const {Function} */
        this.onChange = function() {
            this.updateFields();
            onChange();
        }.bind(this);
        /** @const {Array<todo.models.Task>} */
        this.tasks = [];
        this.updateFields();

        this.newTodoKeyup = this.newTodoKeyup.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
    }

    updateFields() {
        /** @type {number} */
        this.totalCount = this.tasks.length;
        /** @type {number} */
        this.completedCount = this.getCompletedTasks().length;
        /** @type {number} */
        this.todoCount = this.getTodoTasks().length;
    }

    /** @return {Array<todo.models.Task>} */
    getCompletedTasks() {
        return this.tasks.filter(function(task) {
            return task.completed;
        });
    }

    /** @return {Array<todo.models.Task>} */
    getTodoTasks() {
        return this.tasks.filter(function(task) {
            return !task.completed;
        });
    }

    /** @param {string} text */
    addTask(text) {
        var value = goog.string.trim(text);
        if (!goog.string.isEmptyOrWhitespace(value)) {
            this.tasks.push(
                new todo.models.Task(this.onChange, this, value)
            );
            this.onChange();
        }
    }

    /** @param {Object} event */
    clearCompleted(event) {
        this.tasks = this.tasks.filter(function(task) {
            return !task.completed;
        });
        this.onChange();
    }

    /** @param {Object} event */
    toggleAll(event) {
        var completed = this.totalCount !== this.completedCount;
        this.tasks.forEach(function(task) {
            return task.completed = completed;
        });
        this.onChange();
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
            this.addTask(value);
        }
    }
};
