goog.provide('todo.models.ItemList');

goog.require('goog.string');
goog.require('todo.models.Item');

todo.models.ItemList = class {
    constructor(items, onChange) {
        this.items = items;
        this.onChange = onChange;
    }

    addItem(text) {
        var value = goog.string.trim(text);
        if (!goog.string.isEmptyOrWhitespace(value)) {
            this.items.push(new todo.models.Item(value, this.onChange));
            this.onChange();
        }
    }

    remove(item) {
        var index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
            this.onChange();
        }
    }

    setAllCompleted(completed) {
        this.items.forEach(function(item) {
            return item.completed = completed;
        });
        this.onChange();
    }

    clearCompleted() {
        this.items = this.items.filter(function(item) {
            return !item.completed;
        });
        this.onChange();
    }
};
