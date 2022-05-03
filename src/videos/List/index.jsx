import React from 'react'

import { Table } from 'semantic-ui-react'

import Item from './Item'

const ListVideos = ({ items }) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Titulo</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Is Deleted?</Table.HeaderCell>
        <Table.HeaderCell>Duration</Table.HeaderCell>
        <Table.HeaderCell>Thumb</Table.HeaderCell>
        <Table.HeaderCell>Trailer</Table.HeaderCell>
        <Table.HeaderCell>Video</Table.HeaderCell>
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

export default ListVideos
