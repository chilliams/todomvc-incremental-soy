goog.provide('todo.Component');

goog.require('incrementaldom');

goog.scope(() => {

    let updateFn = undefined;

    todo.Component = class {
        static render(element, component) {
            let updater = () => {
                updateFn = updater;
                incrementaldom.patch(
                    element,
                    () => {
                        component.render();
                    }
                );
                updateFn = undefined;
            };
            updater();
        }

        constructor(view) {
            this.view_ = view;
            this.render = this.render.bind(this);
        }

        render() {
            this.update = updateFn;
            this.view_(this.getViewModel());
        }

        update() {
            throw Error("Component must be rendered before update");
        }

        getViewModel() {
            return {};
        }
    };
});
