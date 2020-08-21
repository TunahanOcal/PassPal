import React from 'react';

import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';
import Selector from './Selector';
import TableHeaderBox from './TableHeaderBox';
import TableCell from './TableCell';
import styles from './style.css';

export default class CompareTable extends React.Component{

    constructor(props){
        super(props);
        this.state ={ 
        boxInfo0: {score:"Mobility Score",countryName:"N/A",imageName:"image"},
        boxInfo1: {score:"Mobility Score",countryName:"N/A",imageName:"image"},
        boxInfo2: {score:"Mobility Score",countryName:"N/A",imageName:"image"},
        boxInfo3: {score:"Mobility Score",countryName:"N/A",imageName:"image"},
        visas0: [],
        visas1: [],
        visas2: [],
        visas3: []
        };
        this.selectorCallBack.bind(this);
        this.handletableFilling.bind(this);
        this.timer=null;

    };

    

    handletableFilling =(selectorVal,id) =>{
        if(selectorVal !== ""){
        let selectedPassport = this.props.data.find((passport)=>{return passport.countryCode===selectorVal});
        
        
        if(id==="Selector0"){
            let boxInfo0 = {score:null,countryName:null,imageName:null};
            boxInfo0.score=selectedPassport.visaFree+selectedPassport.eta + selectedPassport.visaOnArrival;
            boxInfo0.countryName=selectedPassport.countryName;
            boxInfo0.imageName=selectedPassport.imageName;
            this.setState({
                visas0:this.props.relationList,
                boxInfo0: boxInfo0

            })
            
    
        }
        else if(id==="Selector1" ){
            let boxInfo1 = {score:null,countryName:null,imageName:null};
            boxInfo1.score=selectedPassport.visaFree+selectedPassport.eta + selectedPassport.visaOnArrival;
            boxInfo1.countryName=selectedPassport.countryName;
            boxInfo1.imageName=selectedPassport.imageName;
            this.setState({
                visas1:this.props.relationList,
                boxInfo1:boxInfo1

            })
        }
        else if(id==="Selector2"){
            let boxInfo2= {score:null,countryName:null,imageName:null};
            boxInfo2.score=selectedPassport.visaFree+selectedPassport.eta + selectedPassport.visaOnArrival;
            boxInfo2.countryName=selectedPassport.countryName;
            boxInfo2.imageName=selectedPassport.imageName;
            this.setState({
                visas2:this.props.relationList,
                boxInfo2:boxInfo2

            })
        }else if(id==="Selector3"){
            let boxInfo3 = {score:null,countryName:null,imageName:null};
            boxInfo3.score=selectedPassport.visaFree+selectedPassport.eta + selectedPassport.visaOnArrival;
            boxInfo3.countryName=selectedPassport.countryName;
            boxInfo3.imageName=selectedPassport.imageName;
            this.setState({
                visas3:this.props.relationList,
                boxInfo3:boxInfo3
            })

        }
    }else{
        let boxInfo = {score:"Mobility Score",countryName:"N/A",imageName:"image"};
        if(id==="Selector0")
            this.setState({visas0:[],boxInfo0:boxInfo});
        else if(id==="Selector1")
            this.setState({visas1:[],boxInfo1:boxInfo});
        else if(id==="Selector2")
            this.setState({visas2:[],boxInfo2:boxInfo});
        else
            this.setState({visas3:[],boxInfo3:boxInfo});
    }
        clearInterval(this.timer);  
    }
    
    selectorCallBack =(selectorVal,id) =>{
        
        this.timer = setTimeout(() => this.handletableFilling(selectorVal,id),100)
    }

    


    render(){
        const {data} = this.props;
        let boxInfo0 = this.state.boxInfo0;
        let boxInfo1 = this.state.boxInfo1;
        let boxInfo2 = this.state.boxInfo2;
        let boxInfo3 = this.state.boxInfo3;
        
        return(
            <Table striped bordered hover responsive variant="dark" size="sm">
                <thead>
                <tr>
                    <th class="empty"></th>
                    <Selector data = {data} relations= {this.props.relationList} selectorCallBack={this.selectorCallBack} title ={"Select Passport:"} controlId = {"Selector0"} loadRelations={this.props.loadRelations} />
                    <Selector data = {data} title ={"Compare To:"} selectorCallBack={this.selectorCallBack} controlId = {"Selector1"} loadRelations={this.props.loadRelations}  />
                    <Selector data = {data} title ={"Compare To:"} selectorCallBack={this.selectorCallBack} controlId = {"Selector2"} loadRelations={this.props.loadRelations}/>
                    <Selector data = {data} title ={"Compare To:"} selectorCallBack={this.selectorCallBack} controlId = {"Selector3"} loadRelations={this.props.loadRelations}/>                      
                </tr>
                </thead>
                <thead>
                    <tr>
                        <th className={styles.headerBox}>
                        <div style={{width: "88px", height: "125px"}}></div>
                        <div></div>
                        <div></div>
                        </th>
                        <TableHeaderBox imageName={boxInfo0.imageName} countryName={boxInfo0.countryName} score={boxInfo0.score}/>
                        <TableHeaderBox imageName={boxInfo1.imageName} countryName={boxInfo1.countryName} score={boxInfo1.score}/>
                        <TableHeaderBox imageName={boxInfo2.imageName} countryName={boxInfo2.countryName} score={boxInfo2.score}/>
                        <TableHeaderBox imageName={boxInfo3.imageName} countryName={boxInfo3.countryName} score={boxInfo3.score}/>

                    </tr>
                </thead>
                <tbody>
                {data.map((passport,key) => {
                    let visa0 = "";
                    let visa1 = "";
                    let visa2 = "";
                    let visa3 = "";
                    let relation = null;
                    if(this.state.visas0.length !==0){
                        relation = this.state.visas0.find((rel) => {return rel.countryOfDestination === passport.countryCode});
                        if(relation !== undefined){
                            visa0 = relation.visaCode;                            
                        }
                    }
                    if(this.state.visas1.length !==0){
                        relation = this.state.visas1.find((rel) => {return rel.countryOfDestination === passport.countryCode});
                        if(relation !== undefined){
                            visa1 = relation.visaCode;
                        }
                    }
                    if(this.state.visas2.length !==0){
                        relation = this.state.visas2.find((rel) => {return rel.countryOfDestination === passport.countryCode});
                        if(relation !== undefined){
                            visa2 = relation.visaCode;
                        }
                    }
                    if(this.state.visas3.length !==0){
                        relation = this.state.visas3.find((rel) => {return rel.countryOfDestination === passport.countryCode});
                        if(relation !== undefined){
                            visa3 = relation.visaCode;
                        }
                    }
                    return(
                        <tr>
                            <td style={{verticalAlign: "middle"}}>
                                <img src={require('./../../../images/png_128/'+passport.countryName.toLowerCase()+'.png')} 
                                width="50px" height ="40px" alt="flag"
                                style={{float: "left", paddingRight: "5px"}}
                                ></img>
                                <div>{passport.countryName}</div>
                            </td>
                            <TableCell code={visa0} passportName={boxInfo0.countryName} destinationName={passport.countryName}/>
                            <TableCell code={visa1} passportName={boxInfo1.countryName} destinationName={passport.countryName}/>
                            <TableCell code={visa2} passportName={boxInfo2.countryName} destinationName={passport.countryName}/>
                            <TableCell code={visa3} passportName={boxInfo3.countryName} destinationName={passport.countryName}/>
                        
                        </tr>
                        
                    )})
                }

                    
                </tbody>
                </Table>
                

        )
    }
}