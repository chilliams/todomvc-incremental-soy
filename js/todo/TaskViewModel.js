goog.provide('todo.TaskViewModel');

/** View model for todo.views.Task */
todo.TaskViewModel = class {
    /** @param {todo.models.Task} task */
    constructor(task) {
        /** @const {todo.models.Task} */
        this.task = task;
        /** @const {number} */
        this.key = goog.getUid(task);
        /** @const {string} */
        this.text = task.text;
        /** @const {boolean} */
        this.completed = task.completed;

        this.setCompleted = this.setCompleted.bind(this);
        this.destroy = this.destroy.bind(this);
    }

    /** @param {Object} event */
    setCompleted(event) {
        this.task.setCompleted(
            !this.completed
        );
    }

    /** @param {Object} event */
    destroy(event) {
        this.task.destroy();
    }
};
