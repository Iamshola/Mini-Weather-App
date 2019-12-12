import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { HashRouter, Route, Switch } from 'react-router-dom'



import Index from './components/Index'

import Search from './components/Search'



class App extends React.Component {
  constructor() {
    super()
    
  }

 

  render() {
  
    return (
     

      <HashRouter>
        <Switch>
          <Route exact path="/search/:city" component={Search} />
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
