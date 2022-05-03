import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Message } from 'semantic-ui-react'

import apiClient from "../http-client";

import ListCastMembers from "./List";



const CastMembers = () => {
  const [items, setItems] = useState([]);

  React.useEffect(() => {
    const getItems = async () => {
      const response = await apiClient.get("/v1/castmembers/")
      setItems(response.data.results);
    }

    getItems()
  }, []);

  return (
    <div>
      <h2>CastMembers</h2>
      <nav>
        <Link to="create">Criar</Link>
      </nav>
      {items.length === 0 && <Message header="Não encontramos nenhum item" data-testid="emptyList" />}
      {items.length > 0 && <ListCastMembers items={items} />}
    </div>
  )
}

export default CastMembers