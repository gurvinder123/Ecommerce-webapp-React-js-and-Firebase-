import React, { Component } from 'react';
import UserCard from './UserCard';

import "../App.css";

export default class UserProfile extends Component {
  render() {
    return (
      <div>
        <div className='user-profile'>
          <UserCard addToCart={this.props.addToCart} getUser={this.props.getUser}/>
        </div>
      </div>
  );}
};
