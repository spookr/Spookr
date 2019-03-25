import React, { Component } from 'react';
import './Reset.scss';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

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
      this.props.location.pathname === `/questionnaire/${this.props.user.id}` ?
      <Header /> : <Navigation />

    const displayFooter = this.props.location.pathname === '/register' ||
      this.props.location.pathname === '/login' ||
      this.props.location.pathname === `/questionnaire/${this.props.user.id}` ?
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

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}



export default withRouter(connect(mapStateToProps)(App))
