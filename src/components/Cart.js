import React, {Component} from 'react';
import '../App.css';

export default class Cart extends Component{
  render() {
    return (
		<div>
			{this.props.renderCart(true)}
		</div>		
    );
	}
}
