goog.provide('todo.models.TaskList');

goog.require('goog.string');
goog.require('todo.models.Task');

/** Models our todo list */
todo.models.TaskList = class {
    /**
     * @constructor
     * @param {Function} onChange
     */
    constructor(onChange) {
        /** @const {Function} */
        this.onChange = onChange;
        /** @const {Array<todo.models.Task>} */
        this.tasks = [];
    }

    /** @param {boolean} completed */
    setAllCompleted(completed) {
        this.tasks.forEach(function(task) {
            return task.completed = completed;
        });
        this.onChange();
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

    clearCompleted() {
        this.tasks = this.tasks.filter(function(task) {
            return !task.completed;
        });
        this.onChange();
    }
};
