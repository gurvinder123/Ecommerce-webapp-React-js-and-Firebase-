import React, { Component } from 'react';
import Content from './Content';
import Slider from './Slider';

export default class Home extends Component{
  constructor(props){
    super(props);
    this.state={};
  }

  render(){
    return(
      <div>
        <Slider />
        <br></br>
        <Content/>
      </div>
    );
  }
}
