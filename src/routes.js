import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Homepage from './Components/Homepage/Homepage'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Profile from './Components/Profile/Profile'
import Questionnaire from './Components/Questionnaire/Questionnaire'
import ProfileSideBar from './Components/ProfileSideBar/ProfileSideBar';

export default (
  <Switch>
    <Route exact path='/' component={Homepage} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <Route exact path='/profile/:id' component={Profile} />
    <Route path='/questionnaire/:id' component={Questionnaire} />
    <Route path='/profiles' component={ProfileSideBar} />
  </Switch>
)
