import React, {Component} from 'react';
import { Col, Row, Card, CardBody } from 'reactstrap';
import ListVideoCard from './ListVideoCard';

class ListVideos extends Component{
    state = {
        // files : [{url:'abc',title:'1',key:"1"},
        //         {url:'abc',title:'1',key:"2"},
        //         {url:'abc',title:'1',key:"3"},]
        files : [ ]
    }

    handleDelete = (key) => {
        console.log(key);
        let files_new = [];
        for(var i=0;i<this.state.files.length;i++)
        {
            if(this.state.files[i].key != key)
            {
                files_new = [...files_new,this.state.files[i]]
            }
        }

        this.setState({
            files:files_new
        })
    }
    
    componentDidUpdate = (prevProps) => {
        // console.log(this.props);
        if(this.props.file.url!=prevProps.file.url)
        { 
            this.props.file.key = this.state.files.length + 1 ;
            this.setState({
                files : [...this.state.files,this.props.file]
            })
        }
    }

    render(){
        return(
            <div>
                {this.state.files.length>0 ?  this.state.files.map((file) => {
                    return(
                        <ListVideoCard del={this.handleDelete} file={file} />
                    )
                }) : null
                }
                <Card style={{width:'100%'}} className="Documents-Card">
                    <CardBody>
                        <Row>
                            <Col md="12">
                                <h4 className="d-flex justify-content-center" style={{fontWeight:'bold',fontSize:'20px',
                                        border:'1px solid gray', borderRadius:'10px', paddingLeft:'14px',paddingRight:'14px'
                                        ,paddingTop:'8px',paddingBottom:'8px'}}>
                                    Add Questions</h4>
                            </Col>
                        </Row>
                    </CardBody>
                </Card> 
            </div>
        )
    }
}

export default ListVideos