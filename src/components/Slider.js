import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

import Bread from '../picture/slide/bread.jpg';
import Pizza from '../picture/slide/pizza.jpg';
import Steak from '../picture/slide/steak.jpg';

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div>
        <div className='carouselWrapper container' style={{width:'950', height:'500'}}>
          <Carousel>
            <Carousel.Item>
              <img width={1200} height={500} alt="900x500" src={Bread} />
            </Carousel.Item>
            <Carousel.Item>
              <img width={1200} height={500} alt="900x500" src={Pizza} />
            </Carousel.Item>
            <Carousel.Item>
              <img width={1200} height={500} alt="900x500" src={Steak} />
            </Carousel.Item>
          </Carousel>
       </div>
     </div>
    );
  }
}
