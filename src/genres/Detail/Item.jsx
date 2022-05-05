import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react'

import apiClient from "../../http-client";


const Item = ({ item }) => {
  let navigate = useNavigate();

  const deleteItem = async (id) => {
    await apiClient.delete(`/v1/genres/${id}/`)

    navigate("/");
  }

  const clickDeleteItem = async (id) => {
    await deleteItem(id)
  }

  const handleUpdate = () => navigate(`/genres/${item.id}/edit`);

  return (
    <div>
      <nav>
        <Button color='red' onClick={() => clickDeleteItem(item.id)}>Delete</Button>
        <Button color='black' onClick={handleUpdate}>Editar</Button>
      </nav>
      <h3>Title: {item.title}</h3>
      <p>Description: {item.description === null ? "não informado": item.description}</p>
      <p>Categories: {item.category}</p>
      <p>Status: {item.status === 0 ? "Inativo" : "Ativo"}</p>
      <p>Is Deleted: {item.is_deleted ? "sim" : "não"}</p>
    </div>
  )
}

export default Item