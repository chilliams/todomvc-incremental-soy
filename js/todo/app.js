goog.provide('todo.app');

goog.require('goog.History');
goog.require('incrementaldom');
goog.require('todo.models.TaskList');
goog.require('todo.TodoListViewModel');
goog.require('todo.views');

todo.app.TodoList = class {
    constructor(element) {
        this.element = element;
        this.taskList = new todo.models.TaskList(
            this.updatePage.bind(this)
        );

        this.history = new goog.History();
        this.history.setEnabled(true);
        goog.events.listen(
            this.history,
            goog.History.EventType.NAVIGATE,
            this.updatePage.bind(this)
        );
    }

    updatePage() {
        console.time('update page');
        this.render(
            todo.views.TodoList,
            new todo.TodoListViewModel({
                taskList: this.taskList,
                route: this.history.getToken()
            })
        );
        console.timeEnd('update page');
    }

    render(template, viewModel) {
        incrementaldom.patch(
            this.element,
            template,
            viewModel
        );
    }
};

todo.app.init = function() {
    var app = new todo.app.TodoList(
        document.getElementById('app')
    );
    app.updatePage();
    todo.app.onReload = function() {
        app.updatePage();
    };
};
