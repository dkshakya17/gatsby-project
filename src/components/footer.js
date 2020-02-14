import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
      width: '100%',
    },
    copyrighttxt:{
        textAlign:'center',
        width:'100%;',
        fontFamily: 'openSans',
        fontSize:'1rem',
        color:'rgba(0, 0, 0, 0.49);',
    },
    footer:{
       position:'relative',
       bottom:0,
       width:'100%',
       display:'inline-flex',
       justifyContent:'center',
       alignItems:'center',
       height:'50px',
       zIndex:999,
    },

  });
  class Footer extends React.Component {

    render() {
        const { classes } = this.props;
        return (
        <Paper className={classes.root} elevation={2} className={classes.footer}>
        <Typography className={classes.copyrighttxt} component="p">
         © 2019 Cashfree Payments India Pvt Ltd
        </Typography>
         </Paper>
          
    );
  }
}

export default withStyles(styles)(Footer);
