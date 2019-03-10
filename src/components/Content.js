import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { FacebookIcon,
         FacebookShareButton,
         GooglePlusIcon,
         GooglePlusShareButton,
         TwitterIcon,
         TwitterShareButton } from 'react-share';

import order from '../picture/orderonline.png';
import visitus from '../picture/comevisitus.png';
import likeandfollow from '../picture/likeandfollow.png';
import img1 from '../picture/img1.png';
import img2 from '../picture/img2.jpg';
import img3 from '../picture/img3.jpg';

import '../App.css';

const shareUrl = '';
const title = 'ShopLift';

export default class Content extends Component{
  constructor(props) {
    super(props);

    this.state={};
  }

  render() {
    return(
      <content className='content'>
        <Container>
          <Row>
            <Col><img src={img1} width={350} height={250} alt="img1"/></Col>
            <Col><img src={img2} width={350} height={250} alt="img2"/></Col>
            <Col><img src={img3} width={350} height={250} alt="img3"/></Col>
          </Row>
          <br></br>
          <br></br>
          <Row>
            <Col xs="6" sm="4">
              <img src={likeandfollow} width={150} height={115} alt="likeandfollow" />
              <br></br>
              <p className="font-style">LIKE &</p>
              <p className="font-style">FOLLOW</p>
              <div className="Demo__container">
                <div className="Demo__some-network">
                  <FacebookShareButton url={shareUrl} quote={title} className="Demo__some-network__share-button">
                  <FacebookIcon size={32} rect />
                  </FacebookShareButton>
                </div>
                <div className="Demo__some-network">
                  <GooglePlusShareButton url={shareUrl} className="Demo__some-network__share-button">
                  <GooglePlusIcon size={32} rect/>
                  </GooglePlusShareButton>
                </div>
                <div className="Demo__some-network">
                  <TwitterShareButton url={shareUrl} title={title} className="Demo__some-network__share-button">
                  <TwitterIcon size={32} rect />
                  </TwitterShareButton>
                </div>
              </div>
            </Col>

            <Col xs="6" sm="4">
              <img src={order} width={150} height={115} alt="order" />
              <br></br>
              <a className="font-style" href="/shop">ORDER<br></br>ONLINE</a>
            </Col>

            <Col xs="12" sm="4">
              <img src={visitus} width ={150} height={115} alt="visitus" />
              <br></br>
              <a className = "font-style" href="/contact">COME<br></br>VISIT US</a>
            </Col>
          </Row>
        </Container>
       </content>
    );
  }
}
