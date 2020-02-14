import styled from 'styled-components'
import { Blockquote } from './blockquote'

export const Paragraph = styled.p`
  display: inline-block;
  box-sizing: border-box;
  font-family: OpenSans;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.86;
  letter-spacing: normal;
  color: #666666;
  padding: 0 28px;
  width: 100%;
  ${Blockquote} & {
    width: 100%;
  }
`
