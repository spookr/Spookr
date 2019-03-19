import React, { Component } from 'react'
import './Navigation.scss'
// Packages
import axios from 'axios'
import {connect} from 'react-redux'
import {logIn, logOut} from '../../redux/reducer'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'

class Navigation extends Component {
  componentDidMount() {
    axios.get('/api/user').then(res => {
      this.props.logIn(res.data)
    })
  }

  logout = () => {
    axios
      .post("/logout")
      .then(res => {
        this.props.logOut();
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };


  render() {
    const displayLogin = this.props.user ? <button onClick={this.logout}>Logout</button> : <Link to='/login'><button>Login</button></Link>
    const displayLogo = this.props.user ? <Link to='/profile' style={{ textDecoration: 'none' }}><h1>Spookr</h1></Link> :
      <Link to='/' style={{ textDecoration: 'none' }}><h1>Spookr</h1></Link>
    return (
      <nav>
        <div className="NavigationSecondary">
          {displayLogo}
          {displayLogin}
        </div>
      </nav>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = {
  logIn,
  logOut
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation))
