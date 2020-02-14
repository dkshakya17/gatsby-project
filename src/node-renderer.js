import React  from 'react';
import { Nodes } from './node-mapping'
import SimpleTabs from './components/codeTab.js'
import Image from './components/image.js'
import Iframe from './components/iframe.js'
import ChecksumContainer from './components/ChecksumContainer'

export const renderTerminalNode = (node) => {
  const tag = Nodes[node.tagName] || Nodes['default']
  const props = {
    children: renderNodesRecur(node.children),
    active: 1
    //className: node.properties.className
  }
  if(node.properties && node.properties.className){
    props["className"] = node.properties.className
  }
  if(node.tagName === 'a'){
    props["href"] = node.properties.href
  }
  if((node.tagName === 'h1') && node.children.length > 0 && node.children[0].value){
    // Make sure this method is same as in sidebar
    // TODO - move them to a common method
    props["id"] = node.children[0].value.replace(/ /g,'-').toLowerCase()
    const element = tag.render(props);
    const hyperlink = <div id={props['id']}><a href={"#" + props['id']}> {element} </a></div>
    return hyperlink;
  }
  const element = tag.render(props);
  return element;
}

export const renderNodes = (nodes) => {
  var state = 0;
  var index = 0;
  var output = [];
  var codeLang = [];
  var codeSnippet = [];
  for(var node of nodes) {
    const tag = Nodes[node.tagName] || Nodes['default']
    index += 1;
    if(node.children && node.children.length > 0 && node.children[0].value === "BEGIN_CODE") {
       state = 1;
    }
    else if(node.children && node.children.length > 0 && node.children[0].value === "END_CODE"){
      const ele = <SimpleTabs codeLang={codeLang} codeSnippet={codeSnippet}/>
      state = 0;
      output.push(ele);
      codeLang = [];
      codeSnippet = [];
    }
    else if(state === 1 && node.properties && node.properties.dataLanguage ){
      const element = tag.render({
        children: renderNodesRecur(node.children),
        className: node.properties.className,
        key: index,
        active: 1
      });
      codeLang.push(node.properties.dataLanguage);
      codeSnippet.push(element);
    }
    else{
      output.push(renderTerminalNode(node));
    }
  }
  return output;
}

export const renderNodesRecur = (nodes) => {
  if(!nodes){
    return null;
  }
  return nodes.map((node, index) => {
    if (node.type === 'element') {
      const tag = Nodes[node.tagName] || Nodes['default']
      // Render links
      if (node.tagName === 'a'){
        return renderTerminalNode(node);
      }
      var id = ''
      if(node.tagName &&  node.children[0]){
        id =
         (node.tagName === 'h1' || 'h2' || 'h2') &&
         node.children[0].value &&
         node.children[0].value.toLowerCase().replace(/ /g,'-')
      }
      if(node.tagName === "img"){
        return <Image src={node.properties.src} alt={node.properties.alt} />
      }
      if(node.tagName === "checksumcontainer"){
        return <ChecksumContainer type={node.properties.type}  />
      }
      if(node.tagName === "iframe"){
        return <Iframe src={node.properties.src} />
      }
      const element = tag.render({
        children: renderNodesRecur(node.children),
        className: node.properties.className,
        key: index,
        id,
      })
      return element
    } else if (node.type === 'text') {
      return node.value
    }
    return null
  })
}
