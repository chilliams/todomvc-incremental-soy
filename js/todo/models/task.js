goog.provide('todo.models.Task');

goog.require('goog.string');

todo.models.Task = class {
    constructor(onChange, taskList, text) {
        this.onChange = onChange;
        this.taskList = taskList;
        this.text = text;
        this.completed = false;
        this.editing = false;
    }

    setCompleted(completed) {
        this.completed = completed;
        this.onChange();
    }

    startEdit() {
        this.editing = true;
        this.onChange();
    }

    stopEdit() {
        this.editing = false;
        this.onChange();
    }

    setText(text) {
        var value = goog.string.trim(text);
        if (!goog.string.isEmptyOrWhitespace(value)) {
            this.text = value;
        }
        this.stopEdit();
    }

    destroy() {
        var index = this.taskList.tasks.indexOf(this);
        if (index > -1) {
            this.taskList.tasks.splice(index, 1);
            this.onChange();
        }
    }
};
