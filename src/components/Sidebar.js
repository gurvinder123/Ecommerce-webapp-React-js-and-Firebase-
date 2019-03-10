import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class Sidebar extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentCategory: 'All'
    };
  }

  componentWillMount() {
    this.setState({currentCategory: this.props.currentCategory});
  }

  render(){
    // Beverage, Drinks, Frozen Food, Snacks, Meats, Produce
    return(
      <div>
        <h2 className = "sidebar">Shop by Aisle</h2>
        <Button bsStyle="primary large" style={{backgroundColor: '#6d8c73', borderColor: '#6d8c73', margin: '10px'}} onClick={()=>{
            this.props.setCategory("all");
        }}> All </Button>
        <Button bsStyle="primary large" style={{backgroundColor: '#6d8c73', borderColor: '#6d8c73', margin: '10px'}} onClick={()=>{
            this.props.setCategory("beverage");
        }}> Beverages </Button>
        <Button bsStyle="primary large" style={{backgroundColor: '#6d8c73', borderColor: '#6d8c73', margin: '10px'}} onClick={()=>{
            this.props.setCategory("dairy");
        }}> Dairy </Button>
        <Button bsStyle="primary large" style={{backgroundColor: '#6d8c73', borderColor: '#6d8c73', margin: '10px'}} onClick={()=>{
            this.props.setCategory("frozen");
        }}> Frozen </Button>
        <Button bsStyle="primary large" style={{backgroundColor: '#6d8c73', borderColor: '#6d8c73', margin: '10px'}} onClick={()=>{
            this.props.setCategory("meat");
        }}> Meat </Button>
        <Button bsStyle="primary large" style={{backgroundColor: '#6d8c73', borderColor: '#6d8c73', margin: '10px'}} onClick={()=>{
            this.props.setCategory("produce");
        }}> Produce </Button>
        <Button bsStyle="primary large" style={{backgroundColor: '#af473c', borderColor: '#af473c', margin: '10px'}} onClick={()=>{
            this.props.setCategory("sale");
        }}> SALE </Button>
      </div>
    );
  }
}
