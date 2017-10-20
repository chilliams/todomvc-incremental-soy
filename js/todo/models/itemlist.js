goog.provide('todo.models.ItemList');

goog.require('goog.string');
goog.require('todo.models.Item');

/** @constructor */
todo.models.ItemList = function(items, onChange) {
    this.items = items;
    this.onChange = onChange;
};

todo.models.ItemList.prototype.addItem = function(text) {
    var value = goog.string.trim(text);
    if (!goog.string.isEmptyOrWhitespace(value)) {
        this.items.push(new todo.models.Item(value, this.onChange));
        this.onChange();
    }
};

todo.models.ItemList.prototype.remove = function(item) {
    var index = this.items.indexOf(item);
    if (index > -1) {
        this.items.splice(index, 1);
        this.onChange();
    }
};

todo.models.ItemList.prototype.setAllCompleted = function(completed) {
    this.items.forEach(function(item) {
        return item.completed = completed;
    });
    this.onChange();
};

todo.models.ItemList.prototype.clearCompleted = function() {
    this.items = this.items.filter(function(item) {
        return !item.completed;
    });
    this.onChange();
};
