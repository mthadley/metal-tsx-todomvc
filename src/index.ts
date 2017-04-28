import "./index.html"
import "todomvc-app-css/index.css"
import App from "./App"
import Component from 'metal-jsx'

Component.render(
  App,
  {
    element: document.getElementById('app')
  }
)
