import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const btncss = {
  color: '#fff',
    border: 'none',
    height: '36px',
    display: 'inline-flex',
    fontSize: '14px',
    alignItems: 'center',
    fontFamily: 'OpenSans',
    fontWeight: '600',
    lineHeight:' 1.86',
    borderRadius: '8px',
    justifyContent: 'center',
    backgroundColor:' #7d44f0',
  }
  const invertbtncss = {
     color: '#7d44f0',
      border: '1px solid #7d44f0',
      height: '36px',
      display: 'inline-flex',
      fontSize: '14px',
      alignItems: 'center',
      fontFamily: 'OpenSans',
      fontWeight: '600',
      lineHeight:' 1.86',
      borderRadius: '8px',
      justifyContent: 'center',
      backgroundColor:' #ffff',
    }
  

export default class Checksum extends Component{
  createTextField = (field, value) => {
    const {onTextChange} = this.props;
    return(
      <Grid container spacing={2}>
      <Grid item xs={12}>
      <TextField
        variant="outlined"
        name={field.name}
        id={field.id}
        label={field.label}
        type={field.type}
        fullWidth
        key={field.id}
        value={value}
        onChange={(event)=>{
          onTextChange(field.id, event);
        }}
      />
      </Grid>
      </Grid>
    );
  }

  displayRequiredFields = () => {
    const{requiredFields, formState} = this.props;
    try{
      return requiredFields.map(field => {
        return this.createTextField(field, formState[field.id]);
      });
    }catch(err){
      console.log("err in displaying fields");
      return [];
    }
  }

  displayButtons = () => {
    const{calculateChecksum, resetFrom} = this.props;
    return(
    
      <Grid container justify="canter" spacing={2}>
      <Grid item xs={6}>
      <Button
       fullWidth
       variant="contained"
       color="primary"
        type="submit"
        color="primary"
        onClick={calculateChecksum}
        style={btncss}
      >
        Generate Signature
      </Button>
      </Grid>
      <Grid item xs={6}>
      <Button
       fullWidth
       color="primary"
       variant="outlined"
      type="submit"
      color="primary" 
      onClick={resetFrom}
      style={invertbtncss}
      >
        Reset
      </Button>
      </Grid>
      </Grid>
    );
  }
  
  render(){
    return (
      <div>
         <form>
          {this.displayRequiredFields()}
          {this.displayButtons()}
        </form>

      </div> 
    );
  }

}