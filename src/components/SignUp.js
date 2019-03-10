import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import {
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";

import fire from '../fire';

import "../App.css";

export default class Signup extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      newUser: null,
      redirectTo: null,
      checked: false
    }

    this.handleCheckedChanged = this.handleCheckedChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
  }

  handleCheckedChanged = event => {
    this.setState({ checked: true });
  }

  handleSubmit(event){
    event.preventDefault();
    this.setState({ isLoading: true });
    this.setState({ isLoading: false });
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        //let userObject = {};
        if (!fire.auth().currentUser.uid){
          fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password);
        }

        fire.database().ref('/users/').child(fire.auth().currentUser.uid).set({
            email: this.state.email,
            orderHistory:{
              items: {},
              prices: {},
              tax: '',
              shipping: '',
              totalPrice: ''
            },
            address: '',
            city: '',
            state: '',
            zip: '',
            cardName: '',
            cardNumber: '',
            cardExpDate: '',
            cardCVV: ''
          });
        this.setState({redirectTo:'/'});
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error! " + errorCode + " " + errorMessage);
        if (errorCode === 'auth/email-already-in-use')
          alert('email already in use!');
      });
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 5 &&
      this.state.password === this.state.confirmPassword &&
      this.state.checked === true
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange.bind(this)}
          />
        </FormGroup>

        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange.bind(this)}
            type="password"
          />
        </FormGroup>

        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange.bind(this)}
            type="password"
          />
        </FormGroup>

        <span className='text-left' style={{color:'grey',fontSize:'11px'}}>Note: Password length must be 6 or more characters</span>
        <br/><br/>
        <div className='row'>
          <div className='ten columns terms'>
            <span>By clicking "Accept" I agree that:</span>
              <ul className='docs-terms text-left'>
                <li>
                  I have read and accepted the <a href='/useragreement' style={{ color:'#626e60'}}>User Agreement</a>
                </li>
                <li>
                  I have read and accepted the <a href='/userprivacy' style={{ color:'#626e60'}}>Privacy Policy</a>
                </li>
                <li>
                  I am at least 18 years old
                </li>
              </ul>
            <label>
              <input
                type='checkbox'
                value={this.state.checked}
                onChange={this.handleCheckedChanged}
                autoFocus
              />
              <span> Accept </span>{' '}
            </label>
          </div>
        </div>

        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Sign Up"
          loadingText="Signing up…"
          onClick={this.handleSubmit.bind(this)}
        />
      </form>
    );
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{pathname: this.state.redirectTo}} />
    }
    else {
      return (
        <div className="signuppage">
          <h1>Sign Up </h1>
          {this.state.newUser === null ? this.renderForm(): console.log("Error")}
        </div>
      );
    }
  }
}
