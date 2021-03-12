import React, {Component} from 'react';
import { 
    Card,
    CardBody,
    CardImg,
    Row,
    Col, 
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Label,
    FormGroup,
    Button } from 'reactstrap';
import "./index.css"
import * as Icon from "react-feather"

class ListVideoCard extends Component{
    state = {
        modal:false
    }

    toggleModal = () => {
        this.setState(prevState => ({
          modal: !prevState.modal
        }))
    }

    handleDelete = () => {
        this.props.del(this.props.file.key);
        this.toggleModal();
    }

    handleCancel = () => {
        this.toggleModal();
    }

    render(){
        const file = this.props.file;

        return(
            <div>
                <Card>
                    {/* <CardImg
                        top
                        className="img-fluid"
                        src={img1}
                        alt="card image cap"
                    /> */}
                    <Row>
                        <Col className="d-flex flex-row-reverse">    
                            <Icon.Edit onClick={this.toggleModal} size={15} />
                        </Col>
                    </Row>
                    <video 
                        height="200px"
                        width="250px    "
                        controls 
                        autoPlay
                        currentTime={11.3}
                        src={file.url} 
                        className="video-player"
                    />
                    
                    <CardBody className="d-flex justify-content-center">
                        <h5>{file.title}</h5>
                    </CardBody>
                    <Row>
                        <Col className="d-flex justify-content-center">    
                            <Icon.ArrowDown size={50} />
                        </Col>
                    </Row>
                </Card>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggleModal}
                    className="modal-dialog-centered"
                >
                    <ModalHeader>Confirmation</ModalHeader>
                    {/* {this.state.error.length>0 ? <div className="d-flex justify-content-center" style={{color:'red',fontFamily:'Nuniot',fontSize:'19px'}}>{this.state.error}</div> : null} */}
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleDelete}>
                            Delete
                        </Button>{" "}
                        <Button color="primary" onClick={this.handleCancel}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default ListVideoCard