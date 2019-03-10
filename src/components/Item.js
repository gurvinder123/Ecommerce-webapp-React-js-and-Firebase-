//Spinner Docs: http://indigojs.github.io/bootstrap-spinner/
import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class Item extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      isAdded: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  addToCart() {
    this.setState({ isAdded: true}, function() {
      setTimeout(() => {
          this.setState({ isAdded: false });
      }, 1200);
    });
  }

  render() {
    return (
      <div className="card">
        <img className="card-img-top" src={this.props.a.image} alt="" onClick={this.handleShow}/>
          <div className="card-body">
            <h5 className="card-title">{this.props.a.name}</h5>
            <p className={this.props.a.sale ? "crossoutprice": "addspace"}>Rs { this.props.a.price.toFixed(2)}/kg.</p>
            <p className={this.props.a.sale ? "colorprice": ""}>{this.props.a.sale ? "Rs "+ this.props.a.discountprice.toFixed(2)+ "/kg": ""}</p>
              <a className="btn btn-outline-success my-2 my-sm-0" style={{color: 'white'}} onClick={() => {
                this.addToCart();
                this.props.a.sale ? this.props.addToCart(this.props.a.name, this.props.a.discountprice) : this.props.addToCart(this.props.a.name, this.props.a.price)}}>
                {!this.state.isAdded ? "Add To Cart" : "✔ Added"}
              </a>
          </div>
          <div>
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header >
                <Modal.Title>{this.props.a.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img className="modal-card-image" alt="" src={this.props.a.image}/>
                <div><h4>{this.props.a.description}</h4></div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
         </div>
      </div>
    )
  }
}
