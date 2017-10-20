goog.provide('todo.components');

goog.require('goog.array');
goog.require('goog.dom.classlist');
goog.require('goog.events.KeyCodes');
goog.require('todo.views');

todo.components.todoList = function(itemList) {
    var completedCount = 0;
    var todoCount = 0;
    for (var i = 0; i < itemList.items.length; i++) {
        if (itemList.items[i].completed) {
            completedCount += 1;
        } else {
            todoCount += 1;
        }
    }

    var data = {
        itemList: itemList,
        todoCount: todoCount,
        completedCount: completedCount,
        newTodoKeyup: function(event) {
            var value = goog.string.trim(
                event.currentTarget.value
            );
            if (event.keyCode === goog.events.KeyCodes.ENTER
                && !goog.string.isEmptyOrWhitespace(value)) {
                event.currentTarget.value = '';
                itemList.addItem(value);
            }
        },
        toggleAll: function(event) {
            itemList.setAllCompleted(
                !goog.dom.classlist.contains(event.currentTarget, "checked")
            );
        },
        clearCompleted: function(event) {
            itemList.clearCompleted();
        }
    };

    return todo.views.todo(data);
};

todo.components.listItem = function(args) {
    var itemList = args.itemList;
    var item = args.item;

    return todo.views.listItem({
        item: item,
        setCompleted: function(event) {
            item.setCompleted(
                !goog.dom.classlist.contains(event.currentTarget, "checked")
            );
        },
        startEdit: function(event) {
            item.startEdit();
            // hack for focus
            var editbox = document.getElementById('editing');
            editbox.focus();
            var val = editbox.value;
            editbox.value = '';
            editbox.value = val;
        },
        stopEdit: function(event) {
            item.setText(event.currentTarget.value);
        },
        editKeyup: function(event) {
            if (event.keyCode === goog.events.KeyCodes.ESC) {
                // hack for inputbox value
                var editbox = document.getElementById('editing');
                editbox.value = item.text;
                item.stopEdit();
                return;
            }
            if (event.keyCode === goog.events.KeyCodes.ENTER) {
                item.setText(event.currentTarget.value);
            }
        },
        destroy: function(event) {
            itemList.remove(item);
        }
    });
};
