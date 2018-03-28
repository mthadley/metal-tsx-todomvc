import Component, {StateConfig} from 'metal-jsx'
import {Todo} from './types'

interface Props {
  onCreate: (todo: Todo) => void
}

interface State {
  content: string
}

let idCounter = 5000

export default class Create extends Component<Props, State> {
  static PROPS: StateConfig<Props>
  static STATE: StateConfig<State>

  _handleInput = (event: Metal.HtmlEvent) => {
    this.state.content = event.target.value
  }

  _handleKeyPress = (event: Metal.HtmlEvent) => {
    if (event.charCode === 13 && this.state.content.length > 0) {
      this.props.onCreate(
        {
          content: this.state.content,
          id: idCounter++,
          done: false
        }
      )

      this.state.content = ''
    }
  }

  render () {
    return <input
      autofocus
      class="new-todo"
      onInput={this._handleInput}
      onKeyPress={this._handleKeyPress}
      placeholder="What needs to be done?"
      value={this.state.content}
    />
  }
}

Create.PROPS = {
  onCreate: {}
}

Create.STATE = {
  content: {}
}
