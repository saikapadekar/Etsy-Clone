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
import shopname from './pages/shopname'
import shop from './pages/shop'
import AddItem from './components/AddItem';
import productview from './pages/productview'
import cart from './pages/cart'
import favorite from './pages/favorite';

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
          <Route exact path="/shopname"  component={shopname} />
          <Route exact path="/shop"  component={shop} />
          <Route exact path="/additem"  component={AddItem} />
          <Route exact path="/productview"  component={productview} />
          <Route exact path="/cart"  component={cart} />
          <Route exact path="/favorite"  component={favorite} />








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