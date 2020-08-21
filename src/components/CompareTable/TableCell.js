import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';   


export default class TableCell extends React.Component{

    render(){

        let {code,passportName,destinationName} = this.props;

        if(code === ""){//if this column wasn't selected
            return(
                <td>{code}</td>
            );
        }

        let codeClass = code;
        let codeMessage = "";
        if (code === "VF"){
            codeMessage = "visa free";
        } else if (code === "VOA"){
            codeMessage = "visa on arrival";
        } else if (code === "ETA"){
            codeMessage = "eTA";
        }else if (code === "VR"){
            codeMessage = "visa required";
        }else if (code >= 7 && code <=360){
            codeMessage = "visa free / " + code + " days";
            codeClass = "VF";
        }

        const renderTooltip = (props) => (
            <Tooltip className="mytooltip" id={'tooltip'} {...props}>
            For Passport Holders of {passportName} Going To {destinationName}
            </Tooltip>
        );
        
        return(
            <td class={codeClass} style={{verticalAlign: "middle", textAlign: "center", border: "black solid", borderWidth: "thin"}}>
                <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
                >
                    <div>{codeMessage}</div>
                </OverlayTrigger>
            </td>
        )
    }
}