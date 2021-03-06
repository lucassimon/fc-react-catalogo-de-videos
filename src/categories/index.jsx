import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Message } from 'semantic-ui-react'

import apiClient from "../http-client";

import ListCategories from "./List";


const Categories = () => {
  const [items, setItems] = useState([]);
  const [pageId, setPageId] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const getItems = async (page = 1) => {
    const response = await apiClient.get(`/v1/categories/?page=${page}`)
    setTotalPages(response.data.total_pages)
    setPageId(response.data.current_page_number)
    setItems(response.data.results);
  }

  React.useEffect(() => {
    getItems()
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <nav>
        <Link to="create">Criar</Link>
      </nav>
      {items.length === 0 && <Message header="Não encontramos nenhum item" data-testid="emptyList" />}
      {items.length > 0 && <ListCategories items={items} pageId={pageId} totalPages={totalPages} getItems={getItems} />}
    </div>
  )
}

export default Categories