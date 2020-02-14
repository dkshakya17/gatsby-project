import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from "gatsby";
import IconButton from '@material-ui/core/IconButton';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../images/logo.svg';

const styles = theme => ({
    root: {
      width: '100%',
    },
    grow: {
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor:'#fafafa',
      color:'black',
      boxShadow:'none',
      borderBottom: '1px solid #cccccc2b',
    },
    toolBar:{
      padding:'0 !Important',
      width: '100%',
      margin:'0 auto',
      minHeight:'65px',
      backgroundColor:'#fafafa',
    },
    
    logoCss:{
      textDecoration: 'none',
      display: 'inline-flex',
     alignItems: 'center',
     flexFlow:'column',
     position:'relative',
    },
    logospan:{
      textDecoration:'none',
      verticalAlign:'middle',
      display:'inline-block',
      textTransform:'uppercase',
      fontFamily: 'OpenSans',
      fontSize: '12px',
      fontWeight: '600',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: '2.17',
      letterSpacing: '5px',
      color:' #666666',
      textAligh:'center',
    },
    betatext:{
      right: '-40px',
      bottom: '5px',
      position: 'absolute',
      background:' #4fb7b2',
      padding:' 0px 8px',
      borderRadius: '10px',
      fontSize: '11px',
      color: 'white',
    },
    menuButton: {
     display:'none',
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    linkholder:{
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
      marginLeft: 'auto',
      display: 'flex',
      justifyContent: 'space-between',
      width: '450px',
      alignItems:'center',
      color: '#434343',
    },
    link:{
      cursor:'pointer',
      color:'#434343',
      fontSize:'14px',
      fontWeight:'600',
      textDecoration: "none",
      "&:hover": {
        color:'#7d44f0',
        
      },
    },
    buttonlink:{
      width: '102px',
      height: '36px',
      borderRadius: '8px',
      backgroundColor: '#7d44f0',
      color:'#fff',
      fontFamily: 'OpenSans',
      fontSize: '14px',
      fontWeight: '600',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: '1.86',
      border:'none',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      border:'1px solid',
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit,
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    tabCss:{
      fontSize:'14px',
      textTransform: 'capitalize',
    },
    tabHolder:{
      display:'flex',
      alignItems:'flex-end',
  
    },
    logoImg:{
      width:'100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
  });
  class MainHeader extends React.Component {

    handleChange = (event, value) => {
        window.scrollTo(0,0)
        this.props.handleTabChange(value);
    };

    handleDrawerToggle = () => {
    };
    handleRedirect = () =>{
      window.location.href="https://merchant.cashfree.com/merchant/login"
    }
    render() {
        const { classes } = this.props;
        const location = this.props.location;
        const content = this.props.content;

        return (
            <AppBar position="fixed" className={classes.appBar}>
            <Container maxWidth="lg">
                <Toolbar className={classes.toolBar}>
                  <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={this.handleDrawerToggle}>
                      <MenuIcon />
                  </IconButton>
                  <Link to="/"  className={classes.logoCss}>
                  <img className={classes.logoImg} src={logo} alt="cashfree logo"/>
                   <span  className={classes.logospan}>Developers</span> 
                   <b className={classes.betatext}>Beta</b> 
                   
                  </Link>
                  <div className={classes.linkholder}>
                    <a href='https://docs.cashfree.com/docs/' target="_blank" className={classes.link}>Current Docs</a>
                    <a href='https://www.cashfree.com/payment-gateway-charges/' target="_blank" className={classes.link}>Pricing</a>
                    <a href="https://www.cashfree.com/"  target="_blank" className={classes.link}>Company</a>
                    <button onClick={this.handleRedirect} className={classes.buttonlink}>Get Started</button>
                  </div>
                </Toolbar>
                </Container>
            </AppBar>
                
    );
  }
}

MainHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainHeader);