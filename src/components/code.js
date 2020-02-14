import styled from 'styled-components'
import { Blockquote } from './blockquote'
import { Paragraph } from './paragraph'
import { Aside } from './aside'

export const Code = styled.code`
  color: #7d44f0;
  font-family: openSans;
  line-height: 1.5;
  padding: 0;
  margin: 0;
  word-break: normal;
  white-space: normal;
  width:100%;
  ${Paragraph} &,  ${Aside} & {
    height: 16px;
    background-color: #e5dafc;
    border-radius: 2px;
    color: #666666;
    display: inline;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.86;
    padding: 0 4px;
    text-shadow:none;
  }
  ${Blockquote} & {
    color: white;
  }
`
