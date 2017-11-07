goog.provide('todo.TaskViewModel');

goog.require('goog.dom.classlist');
goog.require('goog.events.KeyCodes');

todo.TaskViewModel = class {
    constructor(task) {
        this.key = goog.getUid(task);
        this.task = task;

        this.text = task.text;
        this.completed = task.completed;
        this.editing = task.editing;

        this.setCompleted = this.setCompleted.bind(this);
        this.startEdit = this.startEdit.bind(this);
        this.stopEdit = this.stopEdit.bind(this);
        this.editKeyup = this.editKeyup.bind(this);
        this.destroy = this.destroy.bind(this);
    }

    setCompleted(event) {
        this.task.setCompleted(
            !goog.dom.classlist.contains(event.currentTarget, "checked")
        );
    }

    startEdit(event) {
        this.task.startEdit();
        // hack for focus
        var editbox = document.getElementById('editing');
        editbox.focus();
    }

    stopEdit(event) {
        this.task.setText(event.currentTarget.value);
    }

    editKeyup(event) {
        if (event.keyCode === goog.events.KeyCodes.ESC) {
            // hack for inputbox value
            this.task.stopEdit();
            return;
        }
        if (event.keyCode === goog.events.KeyCodes.ENTER) {
            this.task.setText(event.currentTarget.value);
        }
    }

    destroy(event) {
        this.task.destroy();
    }
};
