import Component, {StateConfig} from 'metal-jsx'
import {Todo, Filter} from './Types'
import TodoItem from './TodoItem'
import Footer from './Footer'
import Create from './Create'

const filters = [Filter.All, Filter.Active, Filter.Completed]

interface State {
  todos: Array<Todo>
  selectedFilter: Filter
}

export default class App extends Component<{}, State> {
  static STATE: StateConfig<State>

  _allDone(): boolean {
    return this.state.todos.every(todo => todo.done)
  }

  _anyDone(): boolean {
    return !!this.state.todos.find(todo => todo.done)
  }

  _countLeft(): number {
    return this.state.todos.reduce(
      (count, todo) => count + (todo.done ? 0 : 1),
      0
    )
  }

  _getFilterFn(): (todo: Todo) => boolean {
    switch(this.state.selectedFilter) {
      case(Filter.Active):
        return todo => !todo.done
      case(Filter.All):
        return () => true
      case(Filter.Completed):
        return todo => todo.done
    }
  }

  _getTodos(): Array<Todo> {
    return this.state.todos.filter(this._getFilterFn())
  }

  _handleClear = () => {
    this.state.todos = this.state.todos.filter(todo => !todo.done)
  }

  _handleCreate = (todo: Todo) => {
    this.state.todos = [todo, ...this.state.todos]
  }

  _handleDelete = (id: number) => {
    this.state.todos = this.state.todos.filter(todo => todo.id !== id)
  }

  _handleTodoChange = (newTodo: Todo) => {
    this.state.todos = this.state.todos.map(todo => {
      return todo.id === newTodo.id ? newTodo : todo
    })
  }

  _handleToggleAll = () => {
    const done = !this._allDone()

    this.state.todos = this.state.todos.map(todo => ({...todo, done}))
  }

  _handleFilterChange = (filter: Filter) => {
    this.state.selectedFilter = filter
  }

  render() {
    return (
      <section class="todoapp">
        <header class="header">
          <h1>{'todos'}</h1>

          <Create onCreate={this._handleCreate} />
        </header>

        <section class="main">
          <input
            checked={this._allDone()}
            class="toggle-all"
            id="toggleAll"
            onChange={this._handleToggleAll}
            type="checkbox"
          />
          <label for="toggleAll">{'Mark all as complete'}</label>

          <ul class="todo-list">
            {this._getTodos().map(todo =>
              <TodoItem
                key={todo.id}
                onDelete={this._handleDelete}
                onTodoChange={this._handleTodoChange}
                todo={todo}
              />
            )}
          </ul>
        </section>

        <Footer
          filters={filters}
          showClearButton={this._anyDone()}
          onClear={this._handleClear}
          onFilterChange={this._handleFilterChange}
          selectedFilter={this.state.selectedFilter}
          todoCount={this._countLeft()}
        />
      </section>
    )
  }
}

App.STATE = {
  selectedFilter: {
    value: Filter.All
  },

  todos: {
    value: [
      {
        id: 0,
        content: 'Write more Typescript.',
        done: false
      },
      {
        id: 1,
        content: 'Make a todo app.',
        done: true
      }
    ]
  }
}
