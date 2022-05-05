import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react'

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

  const handleUpdate = () => navigate(`/castmembers/${item.id}/edit`);

  return (
    <div>
      <nav>
        <Button color='red' onClick={() => clickDeleteItem(item.id)}>Delete</Button>
        <Button color='black' onClick={handleUpdate}>Editar</Button>
      </nav>
      <h3>Name: {item.name}</h3>
      <p>Kind: {item.kind === 0 ? "Director" : "Ator"}</p>
      <p>IsDeleted: {item.is_deleted ? "sim" : "não"}</p>
    </div>
  )
}

export default Item