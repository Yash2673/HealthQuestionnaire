import React, {Component} from 'react'
import VoiceRecord from "./VoiceRecord";
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
    Button,
    Input } from 'reactstrap';

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const VoiceDisplay = (props) => {

    const [modal, setModal] = React.useState(false); 
    const [title, setTitle] = React.useState("");

    const handleSubmit = () => {
        if(title.length>0)
        {
            props.setTitle(title);
            props.setAudio(true);
            props.setUrl(audioURL);
            audioURL="";
            setModal(false);
        }
        else
        {
            setTimeout(() => {
                toast.success("Fill in all necessary fields (marked with *)")
            }, 300)
        }
    }

    const handleDiscard = () => {
        audioURL="";
        setModal(false);
    }

    const handleStopRecording = () => {
        stopRecording();
        setModal(true);
    }

    let [audioURL, isRecording, startRecording, stopRecording] = VoiceRecord();
    // console.log(audioURL);
    return(
        <div >
            <Row className="mt-4 mb-2">
                <Col className="d-flex justify-content-center">
                    <audio src={audioURL} controls />
                </Col>
            </Row>
            <Row className="mt-2 mb-2">
                <Col className="d-flex justify-content-center">
                    <Button className="mr-2" onClick={startRecording} disabled={isRecording} color="primary">
                        Start Recording
                    </Button>
                    <Button onClick={handleStopRecording} disabled={!isRecording} color="primary">
                        Stop Recording
                    </Button>
                </Col>
            </Row>
            <Row>
            <Col md="12">
                {
                    audioURL.length > 0 && (
                    <div>
                    <Modal
                        isOpen={modal}
                        className="modal-dialog-centered"
                    >
                        <ModalHeader>Add Title</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="name">Title<span style={{color:'red',fontSize:'17px'}}>*</span></Label>
                                <Input
                                type="text"
                                id="name"
                                placeholder="Title"
                                onChange={(e)=>{setTitle(e.target.value)}}
                                />
                            </FormGroup>
                        </ModalBody>
                        {/* {this.state.error.length>0 ? <div className="d-flex justify-content-center" style={{color:'red',fontFamily:'Nuniot',fontSize:'19px'}}>{this.state.error}</div> : null} */}
                        <ModalFooter>
                            <Button color="primary" onClick={handleSubmit}>
                                Submit
                            </Button>{" "}
                            <Button color="primary" onClick={handleDiscard}>
                                Discard
                            </Button>
                        </ModalFooter>
                        </Modal>
                    </div>
                )}
            </Col>  
        </Row>
        
        <ToastContainer />
        </div>
    )
}

export default VoiceDisplay