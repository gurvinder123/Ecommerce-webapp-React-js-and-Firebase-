
import React, { Component } from 'react';
import StepZilla from 'react-stepzilla';
import Step1 from './Step1';
//import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';

import emptycart from '../../picture/empty-cart.png';
import { Well, Glyphicon } from 'react-bootstrap';

import fire from '../../fire';

import './checkout.css';
import '../../App.css'

export default class CheckOut extends Component {
constructor(props) {
    super(props);
    this.state = {};

    this.sampleStore = {
      firstname: '',
      lastname: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      cardname: '',
      cardnum: '',
      expmonth: '',
      expyear: '',
      cvv: '',
      orderHistory: {}
    };

    this.renderCart = this.renderCart.bind(this);
  }

  componentWillMount(){
    if (this.props.getUser()) {
    fire.database().ref('/users/').child(this.props.getUser().uid).on('value', snapshot => {
      var v = snapshot.val();
      this.sampleStore = {
        firstname: v.firstName,
        lastname: v.lastName,
        address: v.address,
        city: v.city,
        state: v.state,
        zipcode: v.zip,
        orderhistory: v.orderHistory
      };
    }).bind(this);
    }
  }

  getStore() {
    return this.sampleStore;
  }

  updateStore(update) {
    this.sampleStore = {
      ...this.sampleStore,
      ...update,
    }
  }

  showButton(rowStyle,v,arg){
    if (arg === true) 
      return(<div style={rowStyle} className='col-xs-1 text-center' onClick={()=>this.props.deleteFromCart(v)}><Glyphicon glyph='trash'/></div>);
  }

  renderCart(showTrash){
    console.log(this.props.items);
		// if items exist, then render cart, else render nothing(empty cart image)
		if (this.props.items){
		  let rowStyle={
			margin: '10px'
		  }
		  return(
			<Well style={{marginLeft:'5vw',marginRight:'5vw', marginTop:'2vh'}}>
			  {Object.keys(this.props.items).map((v,i)=>{
				return(
				  <div className='row'>
					  <div style={rowStyle} className='col-xs-6 offset-xs-2 text-center'>{this.props.items[v]} of {v} <br/> Rs {this.props.prices[v].toFixed(2)} each</div>
					  <div style={rowStyle} className='col-xs-3 text-right'>Rs {(this.props.prices[v] * this.props.items[v]).toFixed(2)}</div>
            {this.showButton(rowStyle,v,showTrash)}
				  </div>
				);
			  })}
			</Well>
		  );
		}

		return (
      <div>
		    <img style={{width:'250px', height:'150px'}} src={emptycart} alt="emptycart" /><br/>
        Baggy bag is sad because you haven't put any items in cart :(<br/>
        <a href='/shop'><b>Shop for items now!</b></a>
      </div>
		);
	 }

  render() {
    const steps =
    [
      {name: 'Cart', component: <Step1 items={this.props.items} renderCart={this.renderCart} getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
      //{name: 'My Profile', component: <Step2 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
      {name: 'Shipping', component: <Step3 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
      {name: 'Payment', component: <Step4 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
      {name: 'Review', component: <Step5 getUser={this.props.getUser} dumpCache={this.props.dumpCache} renderCart={this.renderCart} cart={this.props.items} prices={this.props.prices} getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
      {name: 'Confirmation', component: <Step6 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
    ]

    return (
      <div className = 'checkout'>
        <div className='step-progress'>
          <StepZilla
          steps={steps}
            preventEnterSubmission={true}
            prevBtnOnLastStep={false}
            startAtStep= {0}
            nextButtonText={' '}
            backButtonText={' '}
            nextButtonCls={'btn btn-prev btn-outline-success my-2 my-sm-0 ml-10 glyphicon glyphicon-chevron-right'}
            backButtonCls={'btn btn-next btn-outline-success my-2 my-sm-0 ml-10 glyphicon glyphicon-chevron-left'}
            nextTextOnFinalActionStep={' '}
            hocValidationAppliedTo = {[]}
          />
        </div>
      </div>
    )
  }
}
