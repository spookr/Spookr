import React, { Component } from 'react';
import './Reset.scss';
import {withRouter} from 'react-router-dom'

// Components
import Navigation from './Components/Navigation/Navigation'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import routes from './routes'

class App extends Component {

  render() {

    // console.log(this.props)

    const displayNavigation = this.props.location.pathname === '/register' ||
      this.props.location.pathname === '/login' ||
      this.props.location.pathname === '/questionnaire' ?
      <Header /> : <Navigation />

    const displayFooter = this.props.location.pathname === '/register' ||
      this.props.location.pathname === '/login' ||
      this.props.location.pathname === '/questionnaire' ?
      null : <Footer />

    return (
      <div className="App">
        {displayNavigation}
        {routes}
        {displayFooter}
      </div>
    );
  }
}



export default withRouter(App)
