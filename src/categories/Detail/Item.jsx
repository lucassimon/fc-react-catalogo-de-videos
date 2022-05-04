import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react'

import apiClient from "../../http-client";


const Item = ({ item }) => {
  let navigate = useNavigate();

  const deleteItem = async (id) => {
    await apiClient.delete(`/v1/categories/${id}/`)

    navigate("/");
  }

  const clickDeleteItem = async (id) => {
    await deleteItem(id)
  }

  return (
    <div>
      <nav>
        <Button color='red' onClick={() => clickDeleteItem(item.id)}>Delete</Button>
      </nav>
      <h3>Title: {item.title}</h3>
      <p>Description: {item.description === "" ? "não informado": item.description}</p>
      <p>Status: {item.status === 0 ? "Inativo" : "Ativo"}</p>
      <p>Is Deleted: {item.is_deleted ? "sim" : "não"}</p>
    </div>
  )
}

export default Item