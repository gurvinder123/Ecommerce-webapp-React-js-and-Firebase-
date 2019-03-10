import React, { Component } from 'react';

import '../../App.css';

export default class Step4 extends Component{
  constructor(props) {
    super(props);

    this.state = {
      cardname: props.getStore().cardname,
      cardnumber: props.getStore().cardnumber,
      expmonth: props.getStore().expmonth,
      expyear: props.getStore().expyear,
      cvv: props.getStore().cvv
    };

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);
    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
  }

  isValidated() {
    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator
    let isDataValid = false;

    // if full validation passes then save to store and pass as valid
    if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
      if (this.props.getStore().cardname !== userInput.cardname ||
        this.props.getStore().cardnumber !== userInput.cardnumber ||
        this.props.getStore().expmonth !== userInput.expmonth ||
        this.props.getStore().expyear !== userInput.expyear ||
        this.props.getStore().cvv !== userInput.cvv)
        { // only update store of something changed
          this.props.updateStore({
          ...userInput,
          // use this to notify step4 that some changes took place and prompt the user to save again
          });  // Update store here (this is just an example, in reality you will do it via redux or flux)
        }

      isDataValid = true;
    } else {
        // if anything fails then update the UI validation state but NOT the UI Data State
        this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
    }

    return isDataValid;
  }

  validationCheck() {
    if (!this._validateOnDemand)
      return;

    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator

    this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
  }

   _validateData(data) {
     return  {
       cardnameVal: (data.cardname !== 0), // required: anything besides N/A
       cardnumberVal: (data.cardnumber !== 0),
       expmonthVal: (data.expmonth !== 0),
       expyearVal: (data.expyear !== 0),
       cvvVal: (data.cvv !== 0),
     }
   }

  _validationErrors(val) {
    const errMsgs = {
      cardnameValMsg: val.cardnameVal ? '' : 'A card name is required',
      cardnumberValMsg: val.cardnumberVal ? '' : 'A card number is required',
      expmonthValMsg: val.expmonthVal ? '' : 'An expiration month is required',
      expyearValMsg: val.expyearVal ? '' : 'An expiration year is required',
      cvvValMsg: val.cvvVal ? '' : 'A cvv is required',
    }

    return errMsgs;
  }

  _grabUserInput() {
    return {
      cardname: this.refs.cardname.value,
      cardnumber: this.refs.cardnumber.value,
      expmonth: this.refs.expmonth.value,
      expyear: this.refs.expyear.value,
      cvv: this.refs.cvv.value
    };
  }

  render() {
    let notValidClasses = {};

    if (typeof this.state.cardnameVal === 'undefined' || this.state.cardnameVal) {
      notValidClasses.cardnameCls = 'no-error col-md-8';
    }
    else {
      notValidClasses.cardnameCls = 'has-error col-md-8';
      notValidClasses.cardnameValGrpCls = 'val-err-tooltip';
    }

    if (typeof this.state.cardnumberVal === 'undefined' || this.state.cardnumberVal) {
      notValidClasses.cardnumberCls = 'no-error col-md-8';
    }
    else {
      notValidClasses.cardnumberCls = 'has-error col-md-8';
      notValidClasses.cardnumberValGrpCls = 'val-err-tooltip';
    }

    if (typeof this.state.expmonthVal === 'undefined' || this.state.expmonthVal) {
      notValidClasses.expmonthCls = 'no-error col-md-8';
    }
    else {
      notValidClasses.expmonthCls = 'has-error col-md-8';
      notValidClasses.expmonthValGrpCls = 'val-err-tooltip';
    }

    if (typeof this.state.expyearVal === 'undefined' || this.state.expyearVal) {
      notValidClasses.expyearCls = 'no-error col-md-8';
    }
    else {
      notValidClasses.expyearCls = 'has-error col-md-8';
      notValidClasses.expyearValGrpCls = 'val-err-tooltip';
    }

    if (typeof this.state.cvvVal === 'undefined' || this.state.cvvVal) {
      notValidClasses.cvvCls = 'no-error col-md-8';
    }
    else {
      notValidClasses.cvvCls = 'has-error col-md-8';
      notValidClasses.cvvValGrpCls = 'val-err-tooltip';
    }

    return(
      <div>
        <div className = "cart">
          <a href="/shop">
            <span className="glyphicon glyphicon-chevron-left"></span>
            Continue Shopping
          </a>
          <h1> Payment Information </h1>
        </div>

        <div className="info">
          <form>
            <div className="cardname">
             <label> CARD HOLDER NAME: </label>
              <input
              className={notValidClasses.cardnameCls}
              ref="cardname"
              type="text"
              required
              defaultValue={this.state.cardname}
              onBlur={this.validationCheck}
              placeholder="Card Name"/>
            </div>
            <div className={notValidClasses.cardnameValGrpCls}>{this.state.cardnameValMsg}</div>

            <div className="cardnumber">
             <label> CREDIT CARD NUMBER: </label>
              <input
              className={notValidClasses.cardnumberCls}
              ref="cardnumber"
              type="text"
              required
              defaultValue={this.state.cardnumber}
              onBlur={this.validationCheck}
              placeholder="Card Number"/>
            </div>
            <div className={notValidClasses.cardnumberValGrpCls}>{this.state.cardnumberValMsg}</div>

            <div className = "expmonth">
              <label> EXPIRATION MONTH: </label>
              <select
                className={notValidClasses.expmonthCls}
                ref="expmonth"
                type="text"
                required
                defaultValue={this.state.expmonth}
                onBlur={this.validationCheck}
              >
                <option value="">Please select</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>

            <div className={notValidClasses.expmonthValGrpCls}>{this.state.expmonthValMsg}</div>

            <div className = "expyear" >
              <label> EXPIRATION YEAR: </label>
              <select
                className={notValidClasses.expyearCls}
                ref="expyear"
                type="text"
                required
                defaultValue={this.state.expyear}
                onBlur={this.validationCheck}
              >
                <option value="">Please select</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>

            <div className={notValidClasses.expyearValGrpCls}>{this.state.expyearValMsg}</div>

            <div className = "cvv">
              <label> CVV: </label>
              <input
                className={notValidClasses.cvvCls}
                ref="cvv"
                type="text"
                required
                defaultValue={this.state.cvv}
                onBlur={this.validationCheck}
                placeholder="CVV"
              />
            </div>

            <div className={notValidClasses.cvvValGrpCls}>{this.state.cvvValMsg}</div>

          </form>
        </div>
      </div>
    );
  }
}
