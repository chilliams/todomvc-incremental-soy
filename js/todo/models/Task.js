goog.provide('todo.models.Task');

/** View model for an entry in our Todo list */
todo.models.Task = class {
    /**
     * @param {Function} onChange
     * @param {Array<todo.models.Task>} taskList
     * @param {string} text
     */
    constructor(onChange, taskList, text) {
        /** @const {number} */
        this.key = goog.getUid(this);
        /** @const {Function} */
        this.onChange = onChange;
        /** @const {todo.models.TaskList} */
        this.taskList = taskList;
        /** @const {string} */
        this.text = text;
        /** @type {boolean} */
        this.completed = false;

        this.setCompleted = this.setCompleted.bind(this);
        this.destroy = this.destroy.bind(this);
    }

    /** @param {Object} event */
    setCompleted(event) {
        this.completed = !this.completed;
        this.onChange();
    }

    /** @param {Object} event */
    destroy(event) {
        var index = this.taskList.tasks.indexOf(this);
        if (index > -1) {
            this.taskList.tasks.splice(index, 1);
            this.onChange();
        }
    }
};
