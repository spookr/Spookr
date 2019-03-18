import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Homepage from './Components/Homepage/Homepage'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'

export default (
  <Switch>
    <Route exact path='/' component={Homepage} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
  </Switch>
)
