goog.provide('todo.presenters.TodoList');

goog.require('goog.array');
goog.require('goog.dom.classlist');
goog.require('goog.events.KeyCodes');
goog.require('todo.views.TodoList');

todo.presenters.TodoList.render = function(params) {
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

    todo.views.TodoList.render({
        route: route,
        itemList: itemList,
        items: itemList.items.filter(function(item) {
            if (route === '/active' && item.completed) {
                return false;
            }
            if (route === '/completed' && !item.completed) {
                return false;
            }
            return true;
        }),
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
