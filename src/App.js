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

    const displayHeader = this.props.location.pathname === '/register' ||
      this.props.location.pathname === '/login' ||
      this.props.location.pathname === `/questionnaire/${this.props.user.id}` ?
      <Header /> : null

    const displayNavigation = this.props.location.pathname !== '/' ? null : <Navigation />

    const displayFooter = this.props.location.pathname !== '/' ? null :  <Footer />

    return (
      <div className="App">
        {displayHeader}
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
