import React from 'react'

import { Table } from 'semantic-ui-react'

import Item from './Item'

const ListCastMembers = ({ items }) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
    {(items || []).map((item) => (<Item key={item.id} item={item} />))}
    </Table.Body>
    <Table.Footer>

    </Table.Footer>
  </Table>
)

export default ListCastMembers
