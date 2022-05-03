import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react'

import apiClient from "../../http-client";

const Item = ({ item }) => {
  let navigate = useNavigate();

  const deleteItem = async (id) => {
    await apiClient.delete(`/v1/videos/${id}/`)

    navigate("/");
  }

  const clickDeleteItem = async (id) => {
    await deleteItem(id)
  }

  return (
    <Table.Row>
      <Table.Cell>{item.title}</Table.Cell>
      <Table.Cell>{item.status}</Table.Cell>
      <Table.Cell>{item.is_deleted ? "sim" : "não"}</Table.Cell>
      <Table.Cell>{item.duration}</Table.Cell>
      <Table.Cell>{item.thumb_file}</Table.Cell>
      <Table.Cell>{item.trailer_file}</Table.Cell>
      <Table.Cell>{item.video_file}</Table.Cell>
      <Table.Cell>
        <Link to={`/videos/${item.id}`}>Detalhes</Link>
        <Button color='red' onClick={() => clickDeleteItem(item.id)}>Delete</Button>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item