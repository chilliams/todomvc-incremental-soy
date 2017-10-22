goog.provide('todo.components');

goog.require('goog.array');
goog.require('goog.dom.classlist');
goog.require('goog.events.KeyCodes');
goog.require('todo.views');

todo.components.todoList = function(params) {
    var itemList = params.itemList;
    var route = params.route;

    var totalCount = itemList.items.length;
    var completedCount = 0;
    var todoCount = 0;
    for (var i = 0; i < itemList.items.length; i++) {
        if (itemList.items[i].completed) {
            completedCount += 1;
        } else {
            todoCount += 1;
        }
    }

    return todo.views.todo({
        route: route,
        itemList: itemList,
        totalCount: totalCount,
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
    });
};

todo.components.listItem = function(params) {
    var itemList = params.itemList;
    var item = params.item;

    return todo.views.listItem({
        text: new String(item.text),
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
        },
        stopEdit: function(event) {
            item.setText(event.currentTarget.value);
        },
        editKeyup: function(event) {
            var editbox = event.currentTarget;
            if (event.keyCode === goog.events.KeyCodes.ESC) {
                // hack for inputbox value
                item.stopEdit();
                return;
            }
            if (event.keyCode === goog.events.KeyCodes.ENTER) {
                item.setText(editbox.value);
            }
        },
        destroy: function(event) {
            itemList.remove(item);
        }
    });
};
