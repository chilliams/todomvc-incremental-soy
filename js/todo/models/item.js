goog.provide('todo.models.Item');

goog.require('goog.string');

/** @constructor */
todo.models.Item = function(text, onChange) {
    this.text = text;
    this.onChange = onChange;
    this.completed = false;
    this.editing = false;
};

todo.models.Item.prototype.setCompleted = function(completed) {
    this.completed = completed;
    this.onChange();
};

todo.models.Item.prototype.startEdit = function() {
    this.editing = true;
    this.onChange();
};

todo.models.Item.prototype.stopEdit = function() {
    this.editing = false;
    this.onChange();
};

todo.models.Item.prototype.setText = function(text) {
    var value = goog.string.trim(text);
    if (!goog.string.isEmptyOrWhitespace(value)) {
        this.text = value;
    }
    this.stopEdit();
};
