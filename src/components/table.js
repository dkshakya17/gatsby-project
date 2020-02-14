import styled from 'styled-components'

export const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  box-sizing: border-box;
  display: inline-block;
  margin-bottom: 1rem;
  font-family: 'openSans' !important;
  overflow: auto;
  padding: 0 28px;
`
export const TableHead = styled.thead``
export const TableBody = styled.tbody`
  background: white;
  font-family: 'openSans' !important;
  border-bottom: 1px solid #E0E0EA;
`
export const TableRow = styled.tr`
border-bottom: 1px solid #E0E0EA;
`
export const TableHeading = styled.th`
  text-align: left;
  font-family: 'openSans' !important;
  padding: 12px 15px;
  color: white;
  border-right: 1px solid #ccc;
  background-color: #7d44f0;
`
export const TableCell = styled.td`
  padding: 12px 15px;
  border-left: 1px solid #E0E0EA;
  border-right: 1px solid #E0E0EA;
  font-family: 'openSans' !important;
`
