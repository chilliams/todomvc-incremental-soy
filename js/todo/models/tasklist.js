goog.provide('todo.models.TaskList');

goog.require('goog.string');
goog.require('todo.models.Task');

todo.models.TaskList = class {
    constructor(onChange) {
        this.tasks = [];
        this.onChange = onChange;
    }

    addTask(text) {
        var value = goog.string.trim(text);
        if (!goog.string.isEmptyOrWhitespace(value)) {
            this.tasks.push(new todo.models.Task(this.onChange, this, value));
            this.onChange();
        }
    }

    setAllCompleted(completed) {
        this.tasks.forEach(function(task) {
            return task.completed = completed;
        });
        this.onChange();
    }

    clearCompleted() {
        this.tasks = this.tasks.filter(function(task) {
            return !task.completed;
        });
        this.onChange();
    }
};
