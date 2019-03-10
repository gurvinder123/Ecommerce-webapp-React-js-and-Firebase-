import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import { Grid, Thumbnail, Image } from 'react-bootstrap';
import juan from '../picture/team/juan.jpg';


export default class AboutUs extends Component {
  render() {
    return (
      <Container>
        <Row>
          <h1 className="aboutUsTitle">About Us</h1>
            <p className="aboutusdescription">
              ShopLift started is a small step taken by <b> Mr. Gurvinder Singh </b> with a vision of creating a better grocery shopping experience.
              He later expanded into larger markets in multiple cities and now offer a world-class
              online experience. It focus on selling products which are grown
              locally and, therefore, can guarantee the quality and freshness of each
              product.
            </p>
          <h1 className="meetTeam" >Meet The Developer/Owner</h1>
       </Row>
        <Row className="team1">
          <Grid>
            <Row>
              <Col>
                <Thumbnail >
                  <Image src={juan} circle alt="150x150"/>
                  <h1>Gurvinder Singh</h1>
                  <h4>Full Stack Web Developer</h4>
                  <p>Gurvinder Singh is a Full Stack Web Developer, he has great interest in coding.</p>
                </Thumbnail>
              </Col>
            </Row>
          </Grid>
        </Row>
      </Container>
    );
  }
}
