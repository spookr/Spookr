import React, { Component } from 'react';
import './Reset.scss';

// Components
import Navigation from './Components/Navigation/Navigation'
import Footer from './Components/Footer/Footer'
import routes from './routes'
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navigation />
        {routes}
        <Footer />
      </div>
    );
  }
}



export default App
