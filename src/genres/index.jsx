import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Message } from 'semantic-ui-react'

import apiClient from "../http-client";

import ListGenres from "./List";


const Genres = () => {
  const [items, setItems] = useState([]);

  React.useEffect(() => {
    async function getItems() {
      const response = await apiClient.get("/v1/genres/")
      setItems(response.data.results);
    }

    getItems()
  }, []);

  return (
    <div>
      <h2>Genres</h2>
      <nav>
        <Link to="create">Criar</Link>
      </nav>
      {items.length === 0 && <Message header="Não encontramos nenhum item" data-testid="emptyList" />}
      {items.length > 0 && <ListGenres items={items} /> }
    </div>
  )
}

export default Genres