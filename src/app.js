import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'

import './style.scss'


import Index from './components/Index'
import FiveDays from './components/FiveDays'



class App extends React.Component {
  constructor() {
    super()
    
  }

 

  render() {
  
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/matched/:days" component={FiveDays} />
          <Route exact path="/" component={Index} />
        </Switch>
      </HashRouter>
    )
  }

}





ReactDOM.render(
  <App />,
  document.getElementById('root')
)
