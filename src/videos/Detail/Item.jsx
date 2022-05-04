import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react'

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
    <div>
      <nav>
        <Button color='red' onClick={() => clickDeleteItem(item.id)}>Delete</Button>
      </nav>
      <h3>Title: {item.title}</h3>
      <p>Description: {item.description === "" ? "não informado": item.description}</p>
      <p>Categories: {item.categories}</p>
      <p>Genres: {item.genres}</p>
      <p>Status: {item.status === 0 ? "Inativo" : "Ativo"}</p>
      <p>Is Deleted: {item.is_deleted ? "sim" : "não"}</p>
      <p>Year launched: {item.year_launched}</p>
      <p>Opened: {item.opened}</p>
      <p>Rating: {item.rating}</p>
      <p>Duration: {item.duration}</p>
      <p>Thumb: {item.thumb_file == null ? "sem arquivo" : item.thumb_file}</p>
      <p>Banner: {item.banner_file == null ? "sem arquivo" : item.banner_file}</p>
      <p>Trailler: {item.trailer_file == null ? "sem arquivo" : item.trailer_file}</p>
      <p>Video: {item.video_file == null ? "sem arquivo" : item.video_file}</p>
    </div>
  )
}

export default Item