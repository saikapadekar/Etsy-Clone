import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Login from './pages/login';

import store from './redux/store'
import {Provider} from 'react-redux'

class App extends Component {
  render() {
    return (

      <Provider store={store}>
      <Router>
      <div>
        <NavigationBar/>
        <Routes>
          <Route exact path="/login"  element={<Login />} />
        </Routes>
      </div>
      </Router>
      </Provider>
    );
  }
 
}

export default App;