import React, { Component } from 'react';
import { Well, Button, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap';

import raccoon from '../picture/user.png';
import fire from '../fire';

export default class UserCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authed: false,
      user: {
        orderHistory: {},
        address: '',
        city: '',
        state: '',
        zip: '',
        cardName: '',
        cardNumber: '',
        cardExpDate: '',
        CVV: ''
      },
      redirectTo: null
    };
  }

  componentWillMount() {
    // get all the user stuff from firebase
    fire.database().ref('/users/').child(this.props.getUser().uid).on('value', snapshot => {
        this.setState({user:snapshot.val()});
    });
  }

  renderOrders() {
    return (
      <div>
        {Object.keys(this.state.user.orderHistory).map((v, i) => {
          v = parseInt(v, 10);
          let d = new Date(v);
          return (
            <Well key={i}>
              <h3 className='text-left'>Order on {d.toLocaleString()}</h3>
              <hr/>
              {this.renderOrder(v)}
            </Well>
          )
        })}
      </div>
    );
  }

  renderOrder(dateString) {
    if (dateString && this.state.user.orderHistory[dateString]) {
      let orderRef = this.state.user.orderHistory[dateString];

      let items = orderRef.items;
      let prices = orderRef.prices;
      let storeRef = {
        shipping: orderRef.shipping,
        tax: orderRef.tax,
        totalPrice: orderRef.totalPrice
      };

      if (items && prices) {
        return(
          <div style={{paddingBottom:'2vh'}}>
            {Object.keys(prices).map((e,i) => {
              return (
                <div key={i} className='row'>
                  <div className='col-md-6 text-left'>
                    <b>{items[e]} of {e}</b> at ${prices[e].toFixed(2)} each
                  </div>
                  <div className='col-md-6 text-right'>
                    <Button onClick={() => this.props.addToCart(e,prices[e])}>Add to Cart</Button>
                  </div>
                </div>
              );
            })}
              <hr/>
              <div className='col-md-4 text-center'>
                <p>Total Shipping: ${storeRef.shipping}</p>
              </div>
              <div className='col-md-4 text-center'>
                <p>Tax Rate: {storeRef.tax}%</p>
              </div>
              <div className='col-md-4 text-center'>
                <p>Total Price: ${storeRef.totalPrice}</p>
              </div>
            </div>
        );
      }
    }
    else {
      return(
        <div className='text-center' style={{padding:'20px', height:'30vh'}}>
          Hmmmmm, looks like you haven't bought(shoplifted) anything yet! <br/>
          <a href='/shop'>Go Buy!</a>
        </div>
      );
    }
  }

  renderAddressInfo() {
    return(
      <div className='text-center' style={{padding:'20px', height:'30vh'}}>
        <p><b>Address</b><br/> {this.state.user.address}</p>
        <p><b>City</b><br/> {this.state.user.city}</p>
        <p><b>State</b><br/> {this.state.user.state}</p>
        <p><b>Zip Code</b><br/> {this.state.user.zip}</p>
      </div>
    )
  }

  renderCardInfo() {
    return(
      <div className='text-center' style={{padding:'20px', height: '30vh'}}>
        <p><b>Card Name</b><br/> {this.state.user.cardName}</p>
        <p><b>Card Number</b><br/> {this.state.user.cardNumber}</p>
        <p><b>Expiration Date</b><br/> {this.state.user.cardExpDate}</p>
      </div>
    )
  }

  render() {
    var user = this.props.getUser();
    if (user) {
      return (
        <div className='container'>
          <div className='row'>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 offset-md-3">
              <div className="card hovercard">
                <div className="card-background">
                  <img className="card-bkimg" alt="" src="https://www.chicagomag.com/images/2015/0115/C201501-C-Gina-Rodriguez-Primetime-Players-Hannibal-Buress.jpg"/>
                </div>
                <div className="useravatar"><img alt="" src={raccoon}/></div>
                <div className="card-info"><span className="card-title">{String(user.email)}</span></div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-sm-12 col-xl-12 col-lg-12 col-md-12'>
              <Tabs className='text-center' defaultActiveKey={1} id={1}>
                <Tab eventKey={1} title='Recent Orders'>{this.renderOrders()}</Tab>
                <Tab eventKey={2} title='Address Information'>{this.renderAddressInfo()}</Tab>
                <Tab eventKey={3} title='Payment Information'>{this.renderCardInfo()}</Tab>
              </Tabs>
            </div>
          </div>

        </div>
      )
  }
  else return(<div>OOPS YOU MUST BE LOGGED IN! <br/><a href='/login'>Log in here</a></div>);
  }
}
