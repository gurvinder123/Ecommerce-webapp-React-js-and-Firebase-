import React, {Component} from 'react';
import raccoon from "../../picture/raccoon-thanku.gif";
import '../../App.css';

export default class Step6 extends Component{
 constructor(props) {
 	 super(props);

   this.state = {};
 }

render(){
	return(
		<div className = 'confirmation'>
			<h1>THANK YOU!</h1>
			<h3>We love what you steal, it's a great deal!</h3>
			<h3>
				We received your order and will let you know
				when it ship.
			</h3>
			<img
				style={{ width: "250px", height: "250px" }}
				src={raccoon}
				alt="raccoon"
			/>
		</div>
	);
	}
}
