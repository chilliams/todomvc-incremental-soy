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
                    component,
                );
                updateFn = undefined;
            };
            updater();
        }

        static create(component, args) {
            let c = new component(args);
            return () => {
                c.render_();
            };
        }

        constructor(view) {
            this.view_ = view;
        }

        render_() {
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
