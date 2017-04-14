import Component, {StateConfig} from 'metal-jsx'
import {Filter} from './Types'

interface Props {
  filters: Array<Filter>
  onClear: () => void
  onFilterChange: (filter: Filter) => void
  selectedFilter: Filter
  showClearButton?: boolean
  todoCount: number
}

function getFilterLabel(filter: Filter): string {
  switch(filter) {
    case(Filter.All):
      return "All"
    case(Filter.Active):
      return "Active"
    case(Filter.Completed):
      return "Completed"
  }
}

export default class Footer extends Component<Props, {}> {
  static PROPS: StateConfig<Props>

  render() {
    return (
      <footer class="footer">
        <span class="todo-count">
          <strong>{this.props.todoCount}</strong>
          {' items left'}
        </span>

        <ul class="filters">
          {this.props.filters.map(filter => {
            const label = getFilterLabel(filter)
            return (
              <li>
                <a
                  class={filter === this.props.selectedFilter ? 'selected' : ''}
                  href={`#${label}`}
                  key={label}
                  onClick={() => this.props.onFilterChange(filter)}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>

        {this.props.showClearButton &&
          <button
            onClick={this.props.onClear}
            class="clear-completed"
          >
            {'Clear Completed'}
          </button>
        }
      </footer>
    )
  }
}

Footer.PROPS = {
  filters: {},
  onClear: {},
  onFilterChange: {},
  selectedFilter: {},
  showClearButton: {},
  todoCount: {}
}
