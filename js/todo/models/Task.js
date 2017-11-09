goog.provide('todo.models.Task');

/** Models an entry in our Todo list */
todo.models.Task = class {
    /**
     * @constructor
     * @param {Function} onChange
     * @param {Array<todo.models.Task} taskList
     * @param {string} text
     */
    constructor(onChange, taskList, text) {
        /** @const {Function} */
        this.onChange = onChange;
        /** @const {todo.models.TaskList} */
        this.taskList = taskList;
        /** @const {string} */
        this.text = text;
        /** @type {boolean} */
        this.completed = false;
    }

    /** @param {bool} completed */
    setCompleted(completed) {
        this.completed = completed;
        this.onChange();
    }

    destroy() {
        var index = this.taskList.tasks.indexOf(this);
        if (index > -1) {
            this.taskList.tasks.splice(index, 1);
            this.onChange();
        }
    }
};
