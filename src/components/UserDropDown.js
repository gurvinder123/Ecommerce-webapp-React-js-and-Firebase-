import React, { Component } from "react";
import { Dropdown,
         DropdownToggle,
         DropdownMenu,
         DropdownItem } from 'reactstrap';
import user from "../picture/user.png";

import fire from '../fire';

export default class UserDropDown extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      user: null
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  logout(){
    fire.auth()
    .signOut()
    .then(() => {
      this.props.setUser(null,null);
    }, error => {
      console.log("Error!" + error);
    });
  }

  render() {
    if (!this.props.getUser()){
      return (
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
  
          <DropdownToggle className = 'dropdown' color ={'white'}>
            <img width={45} height={45} src={user} alt={user}/>
          </DropdownToggle>
  
          <DropdownMenu>
            <DropdownItem><a href="/login">LOG IN</a></DropdownItem>
            <DropdownItem divider />
            <DropdownItem><a href="/signup">SIGN UP</a></DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }
    else{
      return (
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
  
          <DropdownToggle className = 'dropdown' color ={'white'}>
            <img width={45} height={45} src={user} alt={user}/>
          </DropdownToggle>
  
          <DropdownMenu>
            <DropdownItem><a href="/profile">PROFILE</a></DropdownItem>
            <DropdownItem divider />
            <DropdownItem><a href="/" 
              onClick={()=>this.logout()}>LOG OUT</a>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }
  }
}
