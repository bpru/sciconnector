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
