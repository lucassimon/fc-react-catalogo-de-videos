import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react'

import apiClient from "../../http-client";

const Item = ({ item }) => {
  const navigate = useNavigate();

  const deleteItem = async (id) => {
    await apiClient.delete(`/v1/videos/${id}/`)

    navigate("/");
  }

  const clickDeleteItem = async (id) => {
    await deleteItem(id)
  }

  const handleDetail = () => navigate(`/videos/${item.id}`);
  const handleUpdate = () => navigate(`/videos/${item.id}/edit`);
  const handleUpload = () => navigate(`/videos/${item.id}/upload`);

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
        <Button color='purple' onClick={handleDetail}>Detalhes</Button>
        <Button color='black' onClick={handleUpdate}>Editar</Button>
        <Button color='teal' onClick={handleUpload}>Upload</Button>
        <Button color='red' onClick={() => clickDeleteItem(item.id)}>Delete</Button>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item