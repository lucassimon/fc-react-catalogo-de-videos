import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Message } from 'semantic-ui-react'

import apiClient from "../http-client";

import ListGenres from "./List";


const Genres = () => {
  const [items, setItems] = useState([]);
  const [pageId, setPageId] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const getItems = async (page = 1) => {
    const response = await apiClient.get(`/v1/genres/?page=${page}`)
    setTotalPages(response.data.total_pages)
    setPageId(response.data.current_page_number)
    setItems(response.data.results);
  }

  React.useEffect(() => {

    getItems()
  }, []);

  return (
    <div>
      <h2>Genres</h2>
      <nav>
        <Link to="create">Criar</Link>
      </nav>
      {items.length === 0 && <Message header="Não encontramos nenhum item" data-testid="emptyList" />}
      {items.length > 0 && <ListGenres items={items} pageId={pageId} totalPages={totalPages} getItems={getItems} /> }
    </div>
  )
}

export default Genres