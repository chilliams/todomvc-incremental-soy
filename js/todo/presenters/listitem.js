goog.provide('todo.presenters.ListItem');

goog.require('goog.array');
goog.require('goog.dom.classlist');
goog.require('goog.events.KeyCodes');
goog.require('todo.views.ListItem');

todo.presenters.ListItem.render = function(params) {
    var itemList = params.itemList;
    var item = params.item;

    todo.views.ListItem.render({
        text: new String(item.text),
        item: item,
        key: goog.getUid(item),

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
            if (event.keyCode === goog.events.KeyCodes.ESC) {
                // hack for inputbox value
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
