import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { Button,
         FormGroup,
         FormControl,
         ControlLabel } from "react-bootstrap";

import fire from '../fire';
import "../App.css";

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirectTo: null,
      wrongPass: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  validateForm() {
    return (this.state.email.length > 0 && this.state.password.length > 0);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(()=>{
      //this.props.loggedIn(true);
      this.props.setUser(this.state.email, fire.auth().currentUser.uid);
      this.setState({email:"",password:"",redirectTo:"/"});
      if(this.state.wrongPass===true){
        this.setState({wrongPass:false})
      }
    }).catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        this.setState({wrongPass: true});
      }
      else {
        alert(errorMessage);
      }
    });
    fire.auth().setPersistence(fire.auth.Auth.Persistence.LOCAL);
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{pathname: this.state.redirectTo}} />
    }

    return (
      <div className="loginpage">
        <h1>Log In</h1>
        <h5>Not a member?<strong><a href="/signup"> Sign Up</a></strong></h5>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              placeholder="abc@example.com"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
            {this.state.wrongPass? "Invalid Password. Please Try Again." : ""}
          </FormGroup>

          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
