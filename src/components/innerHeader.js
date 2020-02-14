import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { Link } from "gatsby";
import { graphql } from "gatsby";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DrawerSidebar from './drawerSidebar'
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../images/logo.svg';
import { makeStyles, useTheme } from '@material-ui/core/styles';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },

  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // appBar: {
  //   marginLeft: drawerWidth,
  //   [theme.breakpoints.up('sm')]: {
  //     width: `calc(100% - ${drawerWidth}px)`,
  //   },
  // },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor:'#fafafa',
    color:'black',
    boxShadow:'none',
    borderBottom: '1px solid #cccccc2b',
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
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  logoImg:{
    width:'100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolBar:{
    width: '95%',
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
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function InnerHeader (props) {
  const { container } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                  <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}  className={classes.menuButton}>
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
                    <a href="https://merchant.cashfree.com/merchant/login"className={classes.buttonlink}>Get Started</a>
                  </div>
                </Toolbar>
            </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
           <DrawerSidebar/>
          </Drawer>
        </Hidden>



        {/* <Hidden xlDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden> */}
      </nav>

    </div>
  );
}

InnerHeader.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default InnerHeader;
