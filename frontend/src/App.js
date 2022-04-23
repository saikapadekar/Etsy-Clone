import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route,Routes,Switch} from 'react-router-dom'
import NavigationBar from './components/NavigationBar';

import Userprofile from './pages/Userprofile';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import store from './redux/store'
import {Provider} from 'react-redux'
import Shopname from './pages/Shopname'
import Shop from './pages/Shop'
import AddItem from './components/AddItem'
import Productview from './pages/Productview';
import Favorite from './pages/Favorite';
import Cart from './pages/Cart';

// Things to do
// 1. Add item page
// 2. Product view page
// 3. Handling images throughout entire project

function App(props) {
  return (
    <Provider store={store}>
    <div>
      
      <Router>
      {<NavigationBar/>}
      <Routes>
      <Route exact path="/" element={<Home/>} />

      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/signup" element={<Signup/>} />
      <Route exact path="/userprofile" element={<Userprofile/>} />
      <Route exact path="/shopname" element={<Shopname/>} />

      <Route exact path="/shop/:shopname" element={<Shop/>} >
        <Route exact path="additem" element={<AddItem />} />
      </Route>
      <Route exact path="/productview/:product_id" element={<Productview/>} />
      <Route exact path="/favorite" element={<Favorite/>} />
      <Route exact path="/cart" element={<Cart/>} />







      </Routes>
      </Router>
    </div>
    </Provider>
  );
}

export default App;