import React from 'react'
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react'

const Item = ({ item }) => (
  <Table.Row>
    <Table.Cell>{item.name}</Table.Cell>
    <Table.Cell>
      <Link to={`/castmembers/${item.id}/`}>Detalhes</Link>
    </Table.Cell>
  </Table.Row>
)

export default Item