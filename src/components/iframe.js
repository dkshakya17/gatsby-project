import React from 'react'



const iframe_css ={
    width:'100%',
    minHeight:'315px',
    border:'none',
    

}
const Iframe = ({src, width, height}) => {
return (
    <iframe  src={src} style={iframe_css}/>
)
}

export default Iframe 

