import styled from 'styled-components'

export const Div = styled.div`
  box-sizing: border-box;
  clear: right;
  display: ${({ active }) => (active ? 'block' : 'none')};
  margin: 0 auto;
  margin-bottom:16px;
  overflow: auto;
  -webkit-text-size-adjust: 100%;
  padding: 1em 10px !important;
  width: 93%;
  font-family: 'openSans' !important;
`
