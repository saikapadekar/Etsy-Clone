import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import userprofile from './pages/userprofile';
import login from './pages/login';
import home from './pages/home';
import signup from './pages/signup';
import store from './redux/store'
import {Provider} from 'react-redux'

class App extends Component {
  render() {
    
    return (

      <Provider store={store}>
      
      <Router>
      <div>
      <NavigationBar/>
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/login"  component={login} />
          <Route exact path="/signup"  component={signup} />
          
          <Route exact path="/userprofile"  component={userprofile} />

          {/* <Route exact path="/userprofile"  component={<Userprofile />} />
          <Route exact path="/productcard"  component={<ProductCard />} /> */}

         
        </Switch>
      </div>
      </Router>
      </Provider>
    );
  }
 
}

export default App;