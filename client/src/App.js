import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from "./utils/setAuthToken";
import {setCurrentUser} from "./actions/authActions";
import jwt_decode from 'jwt-decode';

// check for token
if (localStorage.jwtToken) {
//	set auth token header auth
	setAuthToken(localStorage.jwtToken);
//	decode token and get user info
	const decoded = jwt_decode(localStorage.jwtToken);
//	set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
}
class App extends Component {
  render() {
    return (
    	<Provider store={store}>
		    <BrowserRouter>
			    <div className="App">
				    <Navbar/>

				    <Route exact path="/" component={Landing}/>
				    <div className="contianer">
					    <Route exact path="/login" component={Login}/>
					    <Route exact path="/register" component={Register}/>
				    </div>
				    <Footer/>
			    </div>
		    </BrowserRouter>
	    </Provider>
    );
  }
}

export default App;
