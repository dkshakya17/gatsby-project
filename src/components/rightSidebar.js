import React from 'react'
import styled from 'styled-components'
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
// import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';

const linkcss = {
  lineHeight:' 22px',
  display:' inline-block',
  fontFamily: 'openSans',
  whiteSpace: 'normal',
  textOverflow: 'clip',
  textDecoration: 'none',
  color: '#4b4b4b',
  fontSize:'14px',
  fontWeight:'400',
  transitionProperty: 'background',
  transitionTimingFunction: 'linear',
  transitionDuration: '130ms',
  width:'auto',
  "&:hover": {
    color: '#7d44f0',
    },
  "&:active": {
    color: '#7d44f0',
    },
  }


const RightSidebar = ( {content} ) => {
  const stopWords = {"BEGIN_CODE" : 1, "END_CODE" : 2}
  const filteredNodes = []
  for(var i = 0; i < content.length; i++){
    const node = content[i]
    if(node.depth == 1 && !(node.value in stopWords) ) {
      filteredNodes.push(node)
    }
  }
  return (
  <>
  <View>
  <List>
    {filteredNodes.map( node => (
      <ListItem>
      <Link  href={`#${node.value.split(" ").join("-").toLowerCase()}`} style={linkcss} >
          {node.value}
        </Link>
     </ListItem>
    ))}
  </List>
  </View>
    </>)
}

export default RightSidebar


const View = styled.div`
  bottom: 0;
  display: block;
  position: fixed;
  right: 0;
  overflow-y: auto;
  top: 0;
  font-family: 'openSans' !important;
  padding-top:9rem;
  width: 200px;
  border-left: 1px solid #ededed;
  z-index:100;
  padding-left:15px;
  padding-bottom:50px;
`
