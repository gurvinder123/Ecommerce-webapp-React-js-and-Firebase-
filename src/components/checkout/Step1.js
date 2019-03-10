import React, {Component} from 'react';
import Cart from '../Cart';

export default class Step1 extends Component{
    constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

    render(){
        return(
    	<Cart items={this.props.items} renderCart={this.props.renderCart} />
        );    
    }
}
