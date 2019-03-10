import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';

import '../../App.css'

export default class Step2 extends Component{
    constructor(props) {
    super(props);
    this.state = {};
    }

    render(){
        return(
        <Container>
          <Row >
          
            <Col xs="6">
                <div className = "step1">
                    <h2> WELCOME</h2>
                   
                
                        <a href="/login" > 
                            <button type="button" className="btn btn-dark ml-10"
                                style = {{marginBottom: '20px',marginTop: '20px' }}>
                                 <p>LOG IN</p>
                            </button>
                        </a>

                        <a onClick={() => this.props.jumpToStep(2)}> 
                            <button type="button" className="btn btn-dark ml-10"
                                style = {{marginBottom: '20px',marginTop: '20px' }}>
                                 <p>GUEST SHOPPING</p>
                            </button>
                        </a>
                 
                </div>
       
            </Col>

            <Col xs="6" >
            
            <div className = "step1">
            <h2> REGISTRATION </h2>
            
            
                <a href="/signup" > 
                    <button type="button" className="btn btn-dark"
                        style = {{marginBottom: '20px',marginTop: '20px' }}>
                        <p>SIGN UP</p>
                    </button>
                </a>
           
            </div>


            </Col>
        
          </Row>
        </Container>

        );    
    }
}
