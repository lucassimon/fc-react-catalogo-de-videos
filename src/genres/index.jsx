import React, { useState } from "react";

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

      {items && <ListGenres items={items} /> }
    </div>
  )
}

export default Genres