import React from 'react';
import Form from 'react-bootstrap/Form';



export default class Selector extends React.Component{
    
    constructor(props){
        super(props);
        this.handleChange.bind(this);
    }
    async handleChange(passportId,selectorId){
        
        await this.props.loadRelations(passportId.toLowerCase());
        this.props.selectorCallBack(passportId,selectorId);
        
    }
    render(){
        
        const passportList = this.props.data;
        
        return(
            <th style={{backgroundColor: "#6c757d"}}>
            <Form.Group style={{ margin: "auto"}} controlId={this.props.controlId} >
                <Form.Control as="select" onChange={ event => this.handleChange(event.target.value,event.target.id)} >
                    <option  value = "" style={{color:"#cec2eb"}}>{this.props.title}</option>
                    {passportList.map((passport,key) =>{
                        return(
                        <option  value = {passport.countryCode}>{passport.countryName}</option>
                        )
                    })}
                </Form.Control>
            </Form.Group>
            </th>
        )
    }
}