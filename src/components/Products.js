import React, { Component } from 'react';
import Item from './Item';
import sadraccoon from '../picture/cry-raccoon.gif'

export default class Products extends Component {
  constructor(props){
    super(props);

    this.state = {
      products: {},
      category: '',
      sortOption: ''
    };
  }

  componentWillMount() {
    this.setState(
      {products: this.props.productsList,
       category: this.props.category,
       sortOption: this.props.sortOption
      });
  }

  render() {
    if (this.props.sortOption === "low") {
      this.props.productsList.sort((a,b) => ((a.discountprice) - (b.discountprice)));
    }
    else if (this.props.sortOption === "high"){
      this.props.productsList.sort((a,b) => ((b.discountprice) - (a.discountprice)));
    }

    let productKeys = Object.keys(this.props.productsList);

    return (
      <div className="products">
        <div className="container">
          <div className="row">
            {this.props.children}
            {
              productKeys.map((element,index) => {
                if (this.props.category === 'all') {
                  return (
                    <div key={index} className="col-md-6 col-sm-6 col-lg-4 col-xs-12 col-xl-3 control-label">
                      <Item a={this.props.productsList[element]} addToCart={this.props.addToCart} />
                    </div>
                  );
                }
                else if (this.props.productsList[element].sale === true && this.props.category === "sale") {
                  return(
                    <div className="col-md-6 col-sm-6 col-lg-4 col-xs-12 col-xl-3 control-label">
                      <Item a={this.props.productsList[element]} addToCart={this.props.addToCart} />
                    </div>
                  );
                }
                else {
                  if (this.props.productsList[element].category === this.props.category) {
                    return (
                      <div className="col-md-6 col-sm-6 col-lg-4 col-xs-12 col-xl-3 control-label">
                        <Item a={this.props.productsList[element]} addToCart={this.props.addToCart} />
                      </div>
                    );
                  }
                }
                return (null);
              })
            }
          </div>

          <div style={{paddingTop: 50}}>
            {this.props.term && this.props.productsList.length === 0 ?
              <img src={sadraccoon} alt="Item not found"/> : ""}
          </div>
        </div>
        <div style={{fontSize: 45, fontFamily: "Gamja Flower", color: "#666666", paddingBottom: 200}}>
          {this.props.term && this.props.productsList.length === 0 ?<h>Sorry. No Products Matched Your Search</h> : ""}
        </div>
      </div>
    )
  }
}
