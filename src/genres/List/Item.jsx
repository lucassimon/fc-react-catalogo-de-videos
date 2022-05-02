import React from 'react'
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react'

const Item = ({ item }) => (
  <Table.Row>
    <Table.Cell>{item.title}</Table.Cell>
    <Table.Cell>{item.description}</Table.Cell>
    <Table.Cell>
      <Link to={`/genres/${item.id}`}>Detalhes</Link>
    </Table.Cell>
  </Table.Row>
)

export default Item