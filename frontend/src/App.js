import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route,Routes,Switch} from 'react-router-dom'
import NavigationBar from './components/NavigationBar';

// import userprofile from './pages/userprofile';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
// import store from './redux/store'
// import {Provider} from 'react-redux'
// import shopname from './pages/shopname'
// import shop from './pages/shop'
// import AddItem from './components/AddItem';
// import productview from './pages/productview'
// import cart from './pages/cart'
// import favorite from './pages/favorite';

// class App extends Component {
//   render() {
    
//     return (

//       <Provider store={store}>
      
//       <Router>
//       <div>
//       <NavigationBar/>
//         <Switch>
//           <Route exact path="/" component={home} />
//           <Route exact path="/login"  component={login} />
//           <Route exact path="/signup"  component={signup} />
          
//           <Route exact path="/userprofile"  component={userprofile} />
//           <Route exact path="/shopname"  component={shopname} />
//           <Route exact path="/shop"  component={shop} />
//           <Route exact path="/additem"  component={AddItem} />
//           <Route exact path="/productview"  component={productview} />
//           <Route exact path="/cart"  component={cart} />
//           <Route exact path="/favorite"  component={favorite} />








//           {/* <Route exact path="/userprofile"  component={<Userprofile />} />
//           <Route exact path="/productcard"  component={<ProductCard />} /> */}

         
//         </Switch>
//       </div>
//       </Router>
//       </Provider>
//     );
//   }
 
// }



function App(props) {
  return (
    <div>
      
      <Router>
      {<NavigationBar/>}
      <Routes>
      <Route exact path="/" element={<Home/>} />

      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/signup" element={<Signup/>} />

      </Routes>
      </Router>
    </div>
  );
}

export default App;