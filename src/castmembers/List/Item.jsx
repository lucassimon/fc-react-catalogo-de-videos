import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react'

import apiClient from "../../http-client";


const Item = ({ item }) => {
  let navigate = useNavigate();

  const deleteItem = async (id) => {
    await apiClient.delete(`/v1/castmembers/${id}/`)

    navigate("/");
  }

  const clickDeleteItem = async (id) => {
    await deleteItem(id)
  }

  return (
    <Table.Row>

      <Table.Cell>{item.name}</Table.Cell>
      <Table.Cell>{item.kind === 0 ? "Director" : "Ator"}</Table.Cell>
      <Table.Cell>{item.is_deleted ? "sim" : "não"}</Table.Cell>
      <Table.Cell>
        <Link to={`/castmembers/${item.id}/`}>Detalhes</Link> {' '}
        <Button color='red' onClick={() => clickDeleteItem(item.id)}>Delete</Button>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item