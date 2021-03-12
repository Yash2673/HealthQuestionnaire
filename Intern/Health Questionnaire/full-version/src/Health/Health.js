import React, {Component} from 'react';
import { Col, Row, Card } from 'reactstrap';
import ListVideos from './ListVideos';
import RecordVideo from './RecordVideo';

class Health extends Component{
    state = {
        url : "",
        title:'1'
    }

    handleUrl = (url) => {
        this.setState({
            url:url
        })
    }

    handleTitle = (title) => {
        this.setState({
            title:title
        })
    }

    render(){
        console.log(this.state);
        return(
            <Card>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                            <div className="d-flex justify-content-center mb-4 mt-2"
                                style={{
                                    color: "#878787",
                                    fontSize: "25px",
                                }}
                                >
                                    <strong>Edit Questions</strong>
                            </div>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col md="5">
                                <Row>
                                    <Col md="3">

                                    </Col>
                                    <Col md="6" className="d-flex justify-content-center"> 
                                        <ListVideos file={this.state}/>
                                    </Col>
                                    <Col md="3">

                                    </Col>
                                </Row>
                            </Col>

                            <Col md="7" className="mb-2">
                                <RecordVideo setUrl={this.handleUrl} setTitle={this.handleTitle} />
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
                
            </Card>
        )
    }
}

export default Health