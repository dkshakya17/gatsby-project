import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import indexstyle from '../components/index.module.css';
import CardContent from '@material-ui/core/CardContent';
import { Link } from "gatsby";
import barrow from '../images/landing/barrow.svg';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
  card: {
    width: '296px',
    textAlign:'center',
    height: '365px',
    borderRadius:'8px',
    position: 'relative',
    transition: '.3s',
    marginLeft:'26px',
    marginBottom:'26px',
    boxSizing:'border-box',
    boxShadow: '0 4px 12px 0 rgba(67, 67, 67, 0.12)',
    "&:hover": {
      boxShadow: '0 8px 16px 0 rgba(125, 68, 240, 0.12)',
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },

  media: {
  height: '120px',
  objectFit:'contain',
  maxWidth: '55px',
  margin:'0 auto',
  },

  title: {
    fontSize: '24px',
    fontFamily: 'OpenSans',
    fontWeight: 'normal',
    textAlign: 'center',
    color: '#434343',
  },
  card_content:{
    height: '320px',
    display: 'inline-flex',
    justifyContent: 'space-between',
    flexFlow: 'column',
    position:'relative',
  },
  card_content:{
    height: '310px',
    display: 'inline-flex',
    justifyContent: 'space-between',
    flexFlow: 'column',
  },
  link: {
    width:'100%',
    display:'inline-block',
    textAlign:'center',
    textDecoration:'none',
  },
  pos: {
    marginBottom: 12,
  },
  
  cardlink:{
  fontFamily: 'OpenSans',
  fontZize: '16px',
  fontWeight: '600',
  textAlign: 'center',
  color:'#7d44f0',
  },
  card_arrow : {
    width: '14px !important',
    verticalAlign: 'middle',
    fontWeight: '600',
  }
};

function redirect(){
  console.log("redirect");
}

function SimpleCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <Link to={props.target} className={classes.link}>
      <CardContent className={classes.card_content}>
      <CardMedia
          component="img"
          className={classes.media}
          height="140"
          image={props.media}
        />
        <Typography variant="h5" component="h2" className={classes.title} >
          {props.header}
        </Typography>
        <Typography component="p" variant="display1" className={indexstyle.cardtext}>
          {props.main}
        </Typography>
        <Typography component="p"  className={classes.cardlink}>
          View Docs  <img src={barrow} className={classes.card_arrow}/>
        </Typography>
        <Typography variant="display1" component="span" className={indexstyle.cardtime} >
          {props.time}
        </Typography>
      </CardContent>
      </Link>          
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
