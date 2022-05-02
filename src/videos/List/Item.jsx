import React from 'react'
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react'

const Item = ({ item }) => (
  <Table.Row>
    <Table.Cell>{item.title}</Table.Cell>
    <Table.Cell>{item.status}</Table.Cell>
    <Table.Cell>{item.duration}</Table.Cell>
    <Table.Cell>{item.thumb_file}</Table.Cell>
    <Table.Cell>{item.trailer_file}</Table.Cell>
    <Table.Cell>{item.video_file}</Table.Cell>
    <Table.Cell>
      <Link to={`/videos/${item.id}`}>Detalhes</Link>
    </Table.Cell>
  </Table.Row>
)

export default Item