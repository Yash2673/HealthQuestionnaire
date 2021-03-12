import React, {Component} from 'react';
import { Col, Row, Card, Button, Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Label,
    FormGroup,
    Input, } from 'reactstrap';
import Webcam from "react-webcam";

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


// class RecordVideo extends Component{
//     state = {
//     }

//     render(){
//         return(
//             <div>
//                 Hey
//             </div>
//         )
//     }
// }

const RecordVideo = (props) => {
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [modal, setModal] = React.useState(false); 
    const [title, setTitle] = React.useState(""); 
    const [capturing, setCapturing] = React.useState(false); 
    const [recordedChunks, setRecordedChunks] = React.useState([]);
  
    const handleStartCaptureClick = React.useCallback(() => {
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm"
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);
  
    const handleDataAvailable = React.useCallback(
      ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );
  
    const handleStopCaptureClick = React.useCallback(() => {
      mediaRecorderRef.current.stop();
      setModal(true);
      setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);
  
    const handleUrl = React.useCallback(() => {
        
            if (recordedChunks.length) {
                const blob = new Blob(recordedChunks, {
                  type: "video/webm"
                });
                const url = URL.createObjectURL(blob);
        
                // console.log(url);
                props.setUrl(url);
        
                // const a = document.createElement("a");
                // document.body.appendChild(a);
                // a.style = "display: none";
                // a.href = url;
                // a.download = "react-webcam-stream-capture.webm";
                // a.click();
                // window.URL.revokeObjectURL(url);
                setRecordedChunks([]);
        }
        
    }, [recordedChunks]);

    const handleSubmit = () => {
        if(title.length>0)
        {
            props.setTitle(title);
            handleUrl();
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
        // console.log(title);
      setModal(false);
    }
    
    // console.log(title);

    return (
      <>
        <Webcam audio={true} ref={webcamRef} />
        <Row>
            <Col md="12" className="d-flex justify-content-center mt-1">
                {capturing ? (
                    <Button color="primary" onClick={handleStopCaptureClick}>
                        Stop Record
                    </Button>
                ) : (
                    <Button  color="primary" onClick={handleStartCaptureClick}>
                        Start Record
                    </Button>
                )}
            </Col>
            <Col md="12">
                {
                    recordedChunks.length > 0 && (
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
      </>
    );
  };

export default RecordVideo