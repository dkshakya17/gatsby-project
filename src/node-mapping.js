import { Aside } from './components/aside'
import { Copybox } from './components/copybox'
import { Button } from './components/copybutton'
import { Blockquote } from './components/blockquote'
import { Default } from './components/default'
import { Div } from './components/div'
import { Code } from './components/code'
import { Heading1, Heading2, Heading3 } from './components/heading'
import { Heading4} from './components/displayHead'
import { Link } from './components/link'
import { Paragraph } from './components/paragraph'
import { Pre } from './components/pre'
import { Span } from './components/span'
import { Strong } from './components/strong'
import { List,ListItem } from './components/list'
import ChecksumContainer from './components/ChecksumContainer'
import { Orderedlist } from './components/orderedlist'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeading,
  TableRow,
} from './components/table'

export const Nodes = {
  a: Link,
  aside: Aside,
  copybox: Copybox,
  button: Button,
  blockquote: Blockquote,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  p: Paragraph,
  code: Code,
  div: Div,
  pre: Pre,
  span: Span,
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  th: TableHeading,
  tr: TableRow,
  td: TableCell,
  default: Default,
  ul:List,
  li:ListItem,
  ol:Orderedlist,
  b:Strong,
  checksumcontainer:ChecksumContainer,
}
