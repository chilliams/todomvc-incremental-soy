goog.provide('todo.views');

todo.views.TodoList = function(params) {
  return (
    <div>
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input className="new-todo"
               placeholder="What needs to be done?"
               onKeyUp={params.newTodoKeyup}
               autofocus></input>
      </header>
      {params.totalCount !== 0 ?
       (
         <section className="main">
           <input id="toggle-all"
             className={params.totalCount === params.completedCount ?
                        'toggle-all checked' :
                        'toggle-all'}
             type="checkbox"
             onChange={params.toggleAll}></input>
           <label for="toggle-all">Mark all as complete</label>
           <ul className="todo-list">
             {params.tasks.map(function(task) {
                return todo.views.Task(task);
              })}
           </ul>
         </section>
       ) :
       undefined}
      {params.totalCount !== 0 ?
       (
         <footer className="footer">
           <span className="todo-count">
             <strong>{params.todoCount}</strong> item left
           </span>
           <button className="clear-completed"
             onClick={params.clearCompleted}>
             Clear completed
           </button>
         </footer>
       ) :
       undefined}
    </section>
    <footer className="info">
      <p>
        Created by <a href="http://github.com/chilliams">
          Christopher Williams
        </a>
      </p>
    </footer>
    </div>
  );
};

todo.views.Task = function(task) {
  return (
    <li key={task.key} className={task.completed ? 'completed' : ''}>
      <div className="view">
        <input className={task.completed ? 'toggle checked' : 'toggle'}
          type="checkbox"
          onClick={task.setCompleted}></input>
        <label>{task.text}</label>
        <button className="destroy" onClick={task.destroy}></button>
      </div>
    </li>
  );
};
