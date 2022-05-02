import React, { useState } from "react";
import { Link } from 'react-router-dom';

import apiClient from "../http-client";

import ListVideos from "./List";


const Videos = () => {
  const [items, setItems] = useState([]);

  React.useEffect(() => {
    async function getItems() {
      const response = await apiClient.get("/v1/videos/")
      setItems(response.data.results);
    }

    getItems()
  }, []);

  return (
    <div>
      <h2>Videos</h2>
      <nav>
        <Link to="create">Criar</Link>
      </nav>

      {items && <ListVideos items={items} />}

    </div>
  )
}

export default Videos