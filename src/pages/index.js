import React from 'react';
import indexstyle from '../components/index.module.css';
import { Container } from '@material-ui/core';
import { Link } from "gatsby";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SimpleCard from '../components/cards'
import SEO from '../components/seo'
import MainHeader from '../components/mainheader'
import Footer from '../components/footer'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import mobile from '../images/landing/mobile.svg';
import checkout from '../images/landing/checkout.svg';
import api from '../images/landing/api.svg';
import basic from '../images/landing/basic.svg';
import pro from '../images/landing/pro.svg';
import resources from '../images/landing/resources.svg';
import upi from '../images/landing/upi.svg';
import shopify from '../images/landing/shopify.png';
import ecomm_banner from '../images/landing/ecomm_banner.svg';
import barrow from '../images/landing/barrow.svg';
import magento from '../images/landing/magento.png';
import wordpress from '../images/landing/wordpress.png';
import user1 from '../images/landing/nykaa.png';
import user2 from '../images/landing/dunzo.png';
import user3 from '../images/landing/ixigo.png';
import user4 from '../images/landing/drivezy.png';
import user5 from '../images/landing/cred.png';
import user6 from '../images/landing/xiomi.png';
import user7 from '../images/landing/club.png';


const HomePage = () => {
  return (
    <>
    <SEO title="Docs" keywords="backend, mobile, development, server, code, subscription, mandate, sdk"/>
    <MainHeader/>
    <section className={indexstyle.banner}>
    <Container maxWidth="lg" justify="center">
    <Grid container  justify="center"  alignItems="center" >
    <Grid item md={6} xs={12}>
    <Typography component="h1" variant="display1" gutterBottom className={indexstyle.home_heading}>
    Ways to Integrate Cashfree’s <b>Payment Gateway</b> for Developers
    </Typography>
    <Typography component="p" variant="display1"  gutterBottom className={indexstyle.home_text} >
    Cashfree Payment Gateway provides a wide array of integration modes, from Checkout Form to Whitelabel Payment Gateway. Feel free to contact us in case you need any help.
    </Typography>
    </Grid>
    <Grid item md={6} xs={12} >
    <iframe className={indexstyle.youtube_video} width="400px" height="300" src="https://www.youtube.com/embed/aKi6lJUymiU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </Grid>
    </Grid>
    </Container>
    </section>
    <section className={indexstyle.web_inti}>
    <Container maxWidth="lg" justify="center">
    <Grid  container justify="center" alignItems="center">
    <Grid item md={3} xs={12}>
    <Typography component="h2" variant="display1" gutterBottom className={indexstyle.sub_heading}>
      Our Web Integration
    </Typography>
    {/* <Typography component="p" variant="display1" className={indexstyle.sub_text} >
        Lorem ipsum dolor sit amet
    </Typography> */}
    </Grid>
    <Grid item md={9} xs={12}>
    <div className={indexstyle.web_card} >
    <SimpleCard header="Checkout"  media={checkout} main =" Simplest, Pre-build form " target="/cf-checkout" time="30 min"/>
    <SimpleCard header="Seamless Basic"  media={basic}  main="JS, custom UI, no PCI required" target="seamless-basic"/>
    <SimpleCard header="Seamless Pro"  media={pro}  main="Custom UI, Requires PCI" target="/seamlesspro"/>
    </div>
    </Grid>
    </Grid>
    </Container>
    </section>
    <section className={indexstyle.ecommerce_sec}>
    <Container maxWidth="lg" justify="center">
    <Grid  container justify="center" alignItems="center">
    <Grid item md={2} xs={12}>
    <Typography component="h2" variant="display1" gutterBottom className={indexstyle.ecomm_sub_heading}>
      No Code Required
    </Typography>
    <Typography component="p" variant="display1" className={indexstyle.ecomm_sub_text} >
     Easy step by step integration
    </Typography>
    </Grid>
    <Grid item md={4} xs={12}>
     <img src={ecomm_banner} />
    </Grid>
    <Grid item md={6} xs={12}>
    <Grid container justify="flex-end" >
    <List component="nav" className={indexstyle.ecomm_list}>
     <Link to="/e-commerce/shopify">
        <ListItem className={indexstyle.ecomm_li}>
        <ListItemAvatar>
        <Avatar src={shopify} />
        </ListItemAvatar>
        <ListItemText primary="Shopify"/>
        <IconButton edge="end" aria-label="comments" className={indexstyle.ecomm_list_arrow}>
        <img src={barrow} />
        </IconButton>
        </ListItem>
     </Link>
     <Link to="/e-commerce/magento">
        <ListItem className={indexstyle.ecomm_li}>
        <ListItemAvatar>
        <Avatar src={magento} />
        </ListItemAvatar>
        <ListItemText primary="Magento" />
        <IconButton edge="end" aria-label="comments" className={indexstyle.ecomm_list_arrow}>
        <img src={barrow} />
        </IconButton>
        </ListItem>
     </Link>
     <Link to="/e-commerce/woo-commerce">
        <ListItem className={indexstyle.ecomm_li}>
        <ListItemAvatar>
        <Avatar src={wordpress} />
        </ListItemAvatar>
        <ListItemText primary="Wordpress"/>
        <IconButton edge="end" aria-label="comments" className={indexstyle.ecomm_list_arrow}>
        <img src={barrow} />
        </IconButton>
       
        </ListItem>
     </Link>
      </List>
    </Grid>
    </Grid>
    </Grid>
    </Container>
    </section>
    <section>
    <Container maxWidth="lg">
     <Grid container justify="center">
        <Grid item md={3} xs={12}>
            <Card className={indexstyle.cardstyle}>
            <CardContent className={indexstyle.card_content}>
            <CardMedia
            component="img"
            image={mobile}
            className={indexstyle.cardmedia}
            />
            <Typography variant="h5" component="h2" className={indexstyle.cardtitle} >
              Mobile
            </Typography>
            <div className={indexstyle.cardlinks}>
            <Link to='/android' className={indexstyle.cardlink}>
              Android
            </Link>
            <Link to='/ios'>
              iOS
            </Link>
            <Link to='/react-native' className={indexstyle.cardlink}>
              React Native
            </Link>
           
            </div>
            </CardContent>
            </Card>
        </Grid>
        <Grid item md={3} xs={12}>
            <Card className={indexstyle.cardstyle}>
            <CardContent className={indexstyle.card_content}>
            <CardMedia
            component="img"
            image={upi}
            className={indexstyle.cardmedia}
            />
            <Typography variant="h5" component="h2" className={indexstyle.cardtitle} >
              UPI
            </Typography>
            <div className={indexstyle.cardlinks}>
            <Link to='/upi' className={indexstyle.cardlink}>
              G Pay
            </Link>
            <Link to='/upi'>
              QR Codes
            </Link>
            <Link to='/upi' className={indexstyle.cardlink}>
              Intent
            </Link>
          
            </div>
            </CardContent>
            </Card>
        </Grid>
        <Grid item md={3} xs={12}>
            <Card className={indexstyle.cardstyle}>
            <CardContent className={indexstyle.card_content}>
            <CardMedia
            component="img"
            image={api}
            className={indexstyle.cardmedia}
            />
            <Typography variant="h5" component="h2" className={indexstyle.cardtitle} >
              API
            </Typography>
            <div className={indexstyle.cardlinks}>
            <Link to='/subscription' className={indexstyle.cardlink}>
            Subscription
            </Link>
            <Link to='/restapi/refunds'>
            Refunds
            </Link>
            <Link to='/restapi/settlements' className={indexstyle.cardlink}>
            Settlement
            </Link>
            </div>
            </CardContent>
            </Card>
        </Grid>
        <Grid item md={3} xs={12}>
            <Card className={indexstyle.cardstyle}>
            <CardContent className={indexstyle.card_content}>
            <CardMedia
            component="img"
            image={resources}
            className={indexstyle.cardmedia}
            />
            <Typography variant="h5" component="h2" className={indexstyle.cardtitle} >
              Resources
            </Typography>
            <div className={indexstyle.cardlinks}>
            <Link to='/resources' className={indexstyle.cardlink}>
               Resources
            </Link>
            <Link to='/preauth' className={indexstyle.cardlink}>
               Pre-Auth
            </Link>
            <Link to='/cardvault' className={indexstyle.cardlink}>
               Card Vault
            </Link>
           
            </div>
            </CardContent>
            </Card>
        </Grid>
       

      </Grid>

     
     
    </Container>
    </section>
    <section className={indexstyle.link_section}>
    <Container maxWidth="lg" justify="center">
    <Grid  container justify="center" alignItems="center">
    <Grid item md={12} xs={12}>
    <div className={indexstyle.center_align}>
    <Typography component="h2" variant="display1" gutterBottom className={indexstyle.link_heading}>
     Want to accept online payments?
    </Typography>
    <a className={indexstyle.btn_link} href="https://www.cashfree.com/contact-sales" target="_blank">Get in touch</a>
    </div>
    </Grid>
    
    </Grid>
    </Container>
    </section>
    <section className={indexstyle.user_section}>
    <Container maxWidth="lg" justify="center">
    <Grid  container justify="center" alignItems="center">
    <Grid item md={6} xs={12}>
    <Typography component="h2" variant="display1" gutterBottom className={indexstyle.ecomm_sub_heading}>
      Merchants Who Love Us!
    </Typography>
    </Grid>
    <Grid item md={6} xs={12}>
    <Grid  container justify="center" alignItems="center" className={indexstyle.user_logo}>
    <img src={user3} />
    <img src={user2} />
    <img src={user1} />
    <img src={user4} />
    <img src={user5} />
    <img src={user6} />
    <img src={user7} />
    </Grid>
    </Grid>
    </Grid>
    </Container>
    </section>
   
    <Footer/>
  </>
  )
}
export default HomePage


// export const query = graphql`
// query Content {
//   allMarkdownRemark(
//     filter: { fileAbsolutePath: {regex : "\/index/"} },
//   ) {
//     edges {
//       node {
//          headings {
//             value
//             depth
//           }
//           htmlAst
//       }
//     }
//   }
// }
// `
