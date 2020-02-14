import React, {Component} from 'react';
import Checksum from './checksum';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import crypto from 'crypto';


const sing_card ={
    padding: '15px',
    fontFamily: 'openSans',
    marginTop:'20px',

}

const formObjOriginal = {
    appId: "",
    secretKey: "",
    orderAmount:"",
    orderCurrency:"",
    orderNote:"",
    orderId: "",
    notifyUrl: "",
    customerName:"",
    customerPhone:"",
    customerEmail:"",
    returnUrl:"",
};

const secretKeyObj =  {
    id:"secretKey",
    name:"secret key",
    label:"Secret Key",
    type:"text",
};

export default class ChecksumContainer extends Component{
    constructor(props){
        super(props);

        this.state = {
            baseFields:[
                {
                    id:"appId",
                    name:"app id",
                    label:"App ID",
                    type:"text",
                },
                {
                    id:"orderId",
                    name:"order Id",
                    label:"Order Id",
                    type:"text",
                },
                {
                    id:"orderAmount",
                    name:"order Amount",
                    label:"Order Amount",
                    type:"text",
                }
            ],
            checkoutFields:[
                {
                    id:"orderCurrency",
                    name:"order Currency",
                    label:"Order Currency",
                    type:"text",
                },
                {
                    id:"orderNote",
                    name:"order Note",
                    label:"Order Note",
                    type:"text",
                },
                {
                    id:"customerName",
                    name:"Customer Name",
                    label:"Customer Name",
                    type:"text",
                },
                {
                    id:"customerPhone",
                    name:"Customer Phone",
                    label:"Customer Phone",
                    type:"number",
                },
                {
                    id:"customerEmail",
                    name:"Customer Email",
                    label:"Customer Email",
                    type:"email",
                },
                {
                    id:"returnUrl",
                    name:"Return URL",
                    label:"Return URL",
                    type:"url",
                },
                {
                    id:"notifyUrl",
                    name:"Notify URL",
                    label:"Notify URL",
                    type:"url",
                },
                
            ],
            embeddedFields:[
                {
                    id:"returnUrl",
                    name:"Return URL",
                    label:"Return URL",
                    type:"url",
                },
                {
                    id:"paymentModes",
                    name:"Payment Modes",
                    label:"Payment Modes",
                    type:"text",
                },
            ],
            seamlessFields:[
                {
                    id:"customerPhone",
                    name:"Customer Phone",
                    label:"Customer Phone",
                    type:"number",
                },
                {
                    id:"customerEmail",
                    name:"Customer Email",
                    label:"Customer Email",
                    type:"email",
                },
                {
                    id:"orderCurrency",
                    name:"order Currency",
                    label:"Order Currency",
                    type:"text",
                },

            ],
            clickedOption: 'checkout',
            formObj: JSON.parse(JSON.stringify(formObjOriginal)),
            result: null,
        }
    }

    calculateCheckoutChecksum = (event) =>
    {
        event.preventDefault();
        try{
            const {type} = this.props;
            const {formObj} = this.state;
            const requiredFieldsObj = this.getRequiredFieldsArray(type);
            let signatureData = "";
            const secretKey = formObj["secretKey"];
            requiredFieldsObj.map(fieldObj => {
                return fieldObj.id;
            }).sort().forEach((field)=>{
                if(formObj[field] !== ""){
                    signatureData+= field+formObj[field];
                }
            });

            console.log("signatureData:", signatureData);
            const hash =  crypto.createHmac('sha256', secretKey).update(signatureData).digest('base64');
            console.log("hash:");
            console.log(hash);
            this.setState({
                result: hash,
            })
            return;
        }
        catch(err){
            console.log("err in generating checkout checksum");
            console.log(err);
        }
        
    }

    calculateEmbeddedChecksum = (event) => {
        event.preventDefault();
        try{
            const {formObj:data} = this.state;
            const secretKey = data.secretKey;
            
            const signatureData = "appId=" + data["appId"] + "&orderId=" + data["orderId"] + "&orderAmount=" + data["orderAmount"]
            + "&returnUrl=" + data["returnUrl"] + "&paymentModes=" + (data["paymentModes"]?data["paymentModes"]:"");
            const hash =  crypto.createHmac('sha256',secretKey).update(signatureData).digest('base64');
            this.setState({
                result: hash,
            });
            return;
        }
        catch(err){
            console.log("err in generating embedded checksum");
        }
        
    }

    calculateSeamlessChecksum = (event) => {
        event.preventDefault();
        try{
            const {formObj:data} = this.state;
            const secretKey = data.secretKey;
            const signatureData ="appId=" + data["appId"] + "&orderId=" + data["orderId"] + "&orderAmount=" + data["orderAmount"] + "&customerEmail="
            + data["customerEmail"] + "&customerPhone=" + data["customerPhone"] + "&orderCurrency=" + data["orderCurrency"];
            const hash = crypto.createHmac('sha256',secretKey).update(signatureData).digest('base64');
            this.setState({
                result: hash,
            });
            return;
        }
        catch(err){
            console.log("err in generateing seamless basic checksum");
        }
    }

    resetFromObj = (event) => {
        event.preventDefault();
        this.setState({
            formObj: JSON.parse(JSON.stringify(formObjOriginal)),
        });
        
    }

    onTextChange = (k,event)=>{
        const value = event.target.value
        let {formObj} = this.state;
        formObj[k] = value
        this.setState({
            formObj
        });

      }

    getRequiredFieldsArray = (type) => {
        switch(type){
            case "checkout": {
                const {baseFields, checkoutFields} = this.state;
                //below might return error because of const constraint, might have to switch to let)
                return baseFields.concat(checkoutFields);
            }
            case "embedded": {
                const {baseFields, embeddedFields} = this.state;
                //below might return error because of const constraint, might have to switch to let
                return baseFields.concat(embeddedFields);
            }

            case "seamless": {
                const {baseFields, seamlessFields} = this.state;
                //below might return error because of const constraint, might have to switch to let
                return baseFields.concat(seamlessFields);
            }

            default: {
                //TODO: put error code here
            }
        }
    }

    getChecksumCalculator = (type)=>{
        switch(type){
            case "checkout": {
                return this.calculateCheckoutChecksum;
            }
            case "embedded": {
                return this.calculateEmbeddedChecksum;
            }
            case "seamless": {
                return this.calculateSeamlessChecksum;
            }
            default: {
                //TODO: put error code here
            }
        }
    }

    render(){
        const {type} = this.props;
        const {formObj, result} = this.state;
        const requiredFields = this.getRequiredFieldsArray(type);
        requiredFields.push(secretKeyObj);
        const calculateChecksum = this.getChecksumCalculator(type);



        return(
                <>
                <Checksum requiredFields={requiredFields} onTextChange={this.onTextChange} calculateChecksum={calculateChecksum} formState={formObj} resetFrom={this.resetFromObj} />
                <Paper style={sing_card}>
                <Grid container justify="canter" spacing={2}>
                    <Grid item xs={2}>
                    <Typography variant="h5" component="h3">
                    Signature:-
                    </Typography>
                    </Grid>
                    <Grid item xs={10}>
                    <Typography  variant="h6" component="h6">
                         {result}
                    </Typography>
                    </Grid>
                    </Grid>
                </Paper>
                </>
        );
    }

}