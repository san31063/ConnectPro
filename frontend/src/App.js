import React, { Component } from 'react';
import {BrowserRouter as Router ,Route} from 'react-router-dom';

import Navbar from './component/layout/Navbar';
import Footer from './component/layout/Footer';
import Landing from './component/layout/Landing';
import store from './store'
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import './App.css';
import { Provider } from 'react-redux';
import { setAuthToken } from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {setCurrentUser , logoutUser} from './actions/authActions';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {

  render(){
    return(
      <Provider store={store}>
          <Router>
            <div className="App">
              <Navbar />
              <Route exact path ="/" component={ Landing }/>
              <div className="container">
                <Route exact path ="/register" component={ Register} />
                <Route exact path ="/login" component={Login} />
              </div>
              <Footer /> 
            </div>
          </Router>
      </Provider>
      
    );
  }
}

export default App;
