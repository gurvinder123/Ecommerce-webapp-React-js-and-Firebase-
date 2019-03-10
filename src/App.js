import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import AboutUs from  './components/AboutUs.js';
import Cart from './components/Cart';
import CheckOut from './components/checkout/CheckOut';
import Contact from './components/Contact';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Home from './components/Home';
import LogIn from './components/LogIn';
import Shop from './components/Shop';
import SignUp from './components/SignUp';
import UserAgreement from './components/UserAgreement';
import UserPrivacy from './components/UserPrivacy';
import UserProfile from './components/UserProfile';
import product from './components/product.json';

// this is firebase, imported as fire to induce less typing
import fire from './fire';

import './App.css';
import '../node_modules/react-image-slider/lib/image-slider.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      items: {},
      prices: {},
      user:{
        email: '',
        uid: '',
      }
    };

    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);

    this.setUser = this.setUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.dumpCache = this.dumpCache.bind(this);
  }

  componentWillMount(){
    this.setState({
      products: product,
      unfilteredProducts: product,
      items: {},
      prices: {}
    });

    // if (fire.auth().currentUser !== null || fire.auth().currentUser !== undefined)
    //   this.setState({authed:true});

    var cart = localStorage.getItem('cart');
    if (cart)
      this.setState({items:JSON.parse(cart)});

    var prices = localStorage.getItem('prices');
    if (prices){
      this.setState({prices: JSON.parse(prices)});
    }

    var user = localStorage.getItem('user');
    if (user){
      this.setState({user: JSON.parse(user)});
    }

    // set up listener for authentication of user
    fire.auth().onAuthStateChanged(u => {
      if (u)
        this.setUser(u.email, u.uid);
      else
        this.setUser(null,null);
    });
  }

  // pass this into Products.js for it to add to cart
	addToCart(itemName, itemPrice){
		if (itemName && itemPrice){
      var cart = localStorage.getItem('cart');
      if (cart)
        this.setState({items:JSON.parse(cart)});
  
      var prices = localStorage.getItem('prices');
      if (prices)
        this.setState({prices: JSON.parse(prices)});

      var itemName = String(itemName);
      var itemsObj = this.state.items;
      var pricesObj = this.state.prices;
      if (!itemsObj){
        itemsObj = {};
        itemsObj[itemName] = 1;
      }

      if (!itemsObj[itemName])
        itemsObj[itemName] = 1;

      else
        itemsObj[itemName] = itemsObj[itemName] + 1;
      
      if (!pricesObj)
        pricesObj = {};
      pricesObj[itemName] = itemPrice;

      this.setState({
        items: itemsObj,
        prices: pricesObj
      });

      localStorage.setItem('cart', JSON.stringify(this.state.items));
      localStorage.setItem('prices', JSON.stringify(this.state.prices));
      return 1;
    }
    return 0;
	}

	decrementFromCart(itemName){
    itemName = String(itemName);
    var itemsObj = this.state.items;
    //var pricesObj = this.state.prices;

    if (itemName !== null && itemName !== undefined){
      if (itemsObj[itemName]){
        itemsObj[itemName] = itemsObj[itemName] - 1;

        if (itemsObj[itemName] === 0)
          this.deleteFromCart(itemName);
        else{
          this.setState({items:itemsObj});
          localStorage.setItem('cart', JSON.stringify(this.state.items));
        }

        return 1;
      }
    }
    return 0;
  }

  deleteFromCart(itemName){
    var itemName = String(itemName);

    var cart = localStorage.getItem('cart');
    if (cart)
      this.setState({items:JSON.parse(cart)});

    var prices = localStorage.getItem('prices');
    if (prices)
      this.setState({prices: JSON.parse(prices)});
    
    var itemsObj = this.state.items;
    var pricesObj = this.state.prices;

    if (itemName){
      if (itemsObj[itemName]){
        delete itemsObj[itemName];
        this.setState({items:itemsObj});
        localStorage.setItem('cart', JSON.stringify(itemsObj));
        if (pricesObj[itemName]){
          delete pricesObj[itemName];
          this.setState({prices: pricesObj});

          localStorage.setItem('prices', JSON.stringify(pricesObj));
        }
      }
    }
  }

  // set the user, can take null arguments 
  // if arguments are null, user is logged out
  setUser(e, id){
    if (e && id){
      var obj = {
        email: e,
        uid: id
      }
      this.setState({user: obj});
      localStorage.setItem('user',JSON.stringify(obj));
    }
    else{
      this.setState({user: null});
      localStorage.setItem('user', null);
      //this.dumpCache();
    }
  }

  dumpCache(){
    localStorage.setItem('cart', null);
    localStorage.setItem('prices', null);
  }

  getUser(){
    var user = localStorage.getItem('user');
    if (user)
      return JSON.parse(user);
    return null;
  }

  render() {
    return (
      <div className="App">
        <div className='App-header'>
          <Navbar
            authed={this.state.authed}
            items={this.state.items}
            prices={this.state.prices}
            setUser={this.setUser}
            getUser={this.getUser}
            deleteFromCart={this.deleteFromCart}
          />
          <h1 className="App-title">“Deals so great - It’s a steal.”</h1>
        </div>
        <div className='App-landing'>
          <BrowserRouter>
            <div id='routes'>
              <Route exact path='/' component={Home} />
              <Route exact path='/contact' component={Contact} />
              <Route exact path='/about-us' component={AboutUs} />
              <Route exact path='/shop'  render={()=><Shop addToCart={this.addToCart}/>}  />
              <Route exact path='/login' render={()=><LogIn setUser={this.setUser}/>}/>
              <Route exact path='/signup' render={()=><SignUp setUser={this.setUser}/>} />
              <Route exact path='/profile' render={()=><UserProfile addToCart={this.addToCart} getUser={this.getUser}/>} />
              <Route exact path='/cart' component={Cart} />
              <Route exact path='/check-out' render={()=><CheckOut deleteFromCart={this.deleteFromCart} dumpCache={this.dumpCache} items={this.state.items} prices={this.state.prices} getUser={this.getUser}/>}/>
              <Route exact path='/useragreement' component={UserAgreement} />
              <Route exact path='/userprivacy' component={UserPrivacy} />
            </div>
          </BrowserRouter>
        </div>
        <div className='App-footer'>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
