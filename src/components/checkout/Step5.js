import React, {Component} from 'react';
import {Grid, Button, Panel, Row, Col, Well} from 'react-bootstrap';
import fire from '../../fire';
//import {Redirect} from 'react-router-dom';

export default class Step5 extends Component{
  constructor(props) {
		super(props);
	  this.state = {
    cart: {},
    prices: {},
		shipping: 7.75,
		tax: 8.75,
    itemsPrice: 0,
    totalPrice: 0
	  };
	}
	
	componentWillMount(){
    this.initializePrices();
	}
	
	renderItems(){
	  if (!this.state.cart)
		return(<div>No items added yet! :(</div>);
	  else{  
	  var cartKeys = Object.keys(this.props.cart);
	  return(
			<div>{
        cartKeys.map((e)=> <Well key={e}>{this.props.cart[e]} of {e}</Well>)
      }</div>
	  );
	  }
	}

	initializePrices(){
    if (this.props.cart && this.props.prices){
      var price = this.state.itemsPrice;
      var total = this.state.totalPrice;
      var cartKeys = Object.keys(this.props.cart);
      var pricesKeys = Object.keys(this.props.prices);

      if (cartKeys && pricesKeys){
        cartKeys.forEach((v,i)=>{
          if (this.props.cart[v] && this.props.prices[v])
            price += this.props.cart[v] * this.props.prices[v];
        });

        total = (price + (this.state.tax / 100) * price) + this.state.shipping;
        this.setState({itemsPrice: price.toFixed(2)});
        this.setState({totalPrice: total.toFixed(2)});
      }
    }
  }

  handleSubmit(){
    var orderHistoryObj = this.props.getStore().orderhistory;
    if (!orderHistoryObj)
      orderHistoryObj = {};
    orderHistoryObj[Date.now()]={
      items: this.props.cart,
      prices: this.props.prices,
      tax: this.state.tax,
      shipping: this.state.shipping,
      totalPrice: this.state.totalPrice
    };
    
    if (this.props.getUser()){
      fire.database().ref('users').child(String(this.props.getUser().uid)).update({
      orderHistory: orderHistoryObj,
      firstName: this.props.getStore().firstname,
      lastName: this.props.getStore().lastname,
      address: this.props.getStore().address,
      city: this.props.getStore().city,
      state: this.props.getStore().state,
      zip: this.props.getStore().zipcode,
      cardName: this.props.getStore().cardname,
      cardNumber: this.props.getStore().cardnumber,
      cardExpDate: String(this.props.getStore().expmonth + '/' + this.props.getStore().expyear),
      cardCVV: this.props.getStore().cvv
    });
    }
    this.props.dumpCache();
  }

  render(){
    return(
    	<div className="review">
  			<h1> Review and submit your order</h1>
  			<Grid>
  				<Row className="show-grid">

          <Col md={12}>
            <Panel>
              <Panel.Body>
                {this.props.renderCart(false)}
              </Panel.Body>
            </Panel>
          </Col>
  					<Col md={6} >
              <Panel md={12}>
                <Panel.Heading >
                  <div className='float-left'>
                    Shipping Information
                  </div>
                  <div className='float-right'>
                    <a onClick={() => this.props.jumpToStep(2)}>
                      <Button bsStyle="default" bsSize="large">
                        Edit
                      </Button>
                    </a>
                  </div>
                  <br/>
                  <br/>
                </Panel.Heading>

                <Panel.Body>
                  <div className='float-left'>
                  <p>Name:</p>
                  <p>Address:</p>
                  <p>City:</p>
                  <p>State:</p>
                  <p>Zipcode:</p>
                  </div>
                  
                  <div className='float-right'>
                  <p>{this.props.getStore().firstname} {this.props.getStore().lastname}</p>
                  <p>{this.props.getStore().address}</p>
                  <p>{this.props.getStore().city}</p>
                  <p>{this.props.getStore().state}</p>
                  <p>{this.props.getStore().zipcode}</p>
                  </div>

                </Panel.Body>
              </Panel>
  					</Col>

  				<Col md={6} >
  					  <Panel>
              <Panel.Body>
                <div className='float-left'>
                <p>Item Subtotal:</p>
                <p>Shipping:</p>
                <p>Sales Tax:</p>
                <br/>
                <p>Order Total:</p>
                </div>
                <div className='float-right'>
                <p>Rs {this.state.itemsPrice}</p>
                <p>Rs {this.state.shipping}</p>
                <p>{this.state.tax}%</p>
                <br/>
                <p>Rs {this.state.totalPrice}</p>
                </div>
              </Panel.Body>
             
              <Panel.Footer>
                <a onClick={() => this.props.jumpToStep(4)}>
                  <Button onClick={()=>this.handleSubmit()}bsStyle="default" bsSize="large">
                    Submit Order
                  </Button>
                </a>
              </Panel.Footer>
            </Panel>
  				</Col>
  			</Row>

  			<Row className="show-grid">
  				<Col md={6}>
  					<Panel md={6}>
	  					<Panel.Heading>
                <div className='float-left'>
	  						  Payment Information
                </div>
                <div className='float-right'>
	  						  <a onClick={() => this.props.jumpToStep(3)}>
	              	  <Button bsStyle="default" bsSize="large">
	                  	Edit
	            	 	  </Button>
	         	 		  </a>
                </div>
                <br/>
                <br/>
		  				</Panel.Heading>

		  				<Panel.Body>
		  				  <p>Card Name:</p> 
                <p style ={{color: '#3c3c3c'}}>{this.props.getStore().cardname}</p>
		    				<p>Card Number:</p>
                <p style ={{color: '#3c3c3c'}}>{this.props.getStore().cardnumber}</p>
		   				  <p>Exp Month</p>
                <p style ={{color: '#3c3c3c'}}>{this.props.getStore().expmonth}</p>
		            <p>Exp Year:</p>
                <p style ={{color: '#3c3c3c'}}>{this.props.getStore().expyear}</p>
		    				<p>CVV:</p>
                <p style ={{color: '#3c3c3c'}}>{this.props.getStore().cvv}</p>
	  					</Panel.Body>
  					</Panel>
  				</Col>
  			</Row>
  		</Grid>
  	</div>
		);
	}
}
