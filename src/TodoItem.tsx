import Component, {StateConfig} from 'metal-jsx'
import {Todo} from './Types'
import cn from 'classnames'

interface Props {
  onDelete: (id: number) => void
  onTodoChange: (todo: Todo) => void
  todo: Todo
}

interface State {
  content: string
  editing: boolean
}

export default class TodoItem extends Component<Props, State> {
  static PROPS: StateConfig<Props>
  static STATE: StateConfig<State>

  _handleDelete = () => {
    this.props.onDelete(this.props.todo.id)
  }

  _handleInput = (event: Metal.HtmlEvent) => {
    this.state.content = event.target.value
  }

  _handleKeyPress = (event: Metal.HtmlEvent) => {
    if (event.charCode === 13) {
      this.state.editing = false

      this.props.onTodoChange({
        ...this.props.todo,
        content: this.state.content
      })
    }
  }

  _handleDoneChange = () => {
    const {todo} = this.props
    this.props.onTodoChange({ ...todo, done: !todo.done })
  }

  _handleEdit = () => {
    this.setState({
      content: this.props.todo.content,
      editing: true
    })
  }

  render() {
    const {todo} = this.props

    const classes = cn({
      editing: this.state.editing,
      completed: todo.done
    })

    return (
      <li class={classes}>
        <div class="view">
          <input
            class="toggle"
            checked={todo.done}
            type="checkbox"
            onChange={this._handleDoneChange}
          />

          <label onDblclick={this._handleEdit}>{todo.content}</label>

          <button class="destroy" onClick={this._handleDelete} />
        </div>

        <input
          onInput={this._handleInput}
          onKeyPress={this._handleKeyPress}
          class="edit"
          value={this.state.content}
        />
      </li>
    )
  }
}

TodoItem.PROPS = {
  todo: {},
  onDelete: {},
  onTodoChange: {}
}

TodoItem.STATE = {
  content: {},
  editing: {}
}
