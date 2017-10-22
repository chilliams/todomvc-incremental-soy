goog.provide('todo.models.Item');

goog.require('goog.string');

todo.models.Item = class {
    constructor(text, onChange) {
        this.text = text;
        this.onChange = onChange;
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
};
