import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Message } from 'semantic-ui-react'

import apiClient from "../http-client";

import ListVideos from "./List";


const Videos = () => {
  const [items, setItems] = useState([]);
  const [pageId, setPageId] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const getItems = async (page = 1) => {
    const response = await apiClient.get(`/v1/videos/?page=${page}`)
    setTotalPages(response.data.total_pages)
    setPageId(response.data.current_page_number)
    setItems(response.data.results);
  }

  React.useEffect(() => {
    getItems()
  }, []);

  return (
    <div>
      <h2>Videos</h2>
      <nav>
        <Link to="create">Criar</Link>
      </nav>
      {items.length === 0 && <Message header="Não encontramos nenhum item" data-testid="emptyList" />}
      {items && <ListVideos items={items} pageId={pageId} totalPages={totalPages} getItems={getItems} />}
    </div>
  )
}

export default Videos