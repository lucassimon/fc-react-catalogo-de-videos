import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { Icon, Message } from 'semantic-ui-react'

import apiClient from "../../http-client";

import Item from './Item'


const Genre = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [item, setItem] = useState(null);

  let { genreId } = useParams();

  React.useEffect(() => {
    const getItem = async () => {
      setLoading(true)
      try {
        const response = await apiClient.get(`/v1/genres/${genreId}/`)
        setItem(response.data);
        setSuccess(true)
      } catch (error) {
        setError(true)
      }
      setLoading(false)
    }

    getItem()
  }, [genreId]);

  return (
    <div>
      <h2>Genre ID: { genreId } </h2>

      {error && <Message error header="Ocorreu um erro" data-testid="errorDetail" />}
      {loading && (<Message icon>
        <Icon name='circle notched' loading />
        <Message.Content>
          <Message.Header>Just one second</Message.Header>
          We are fetching that content for you.
        </Message.Content>
      </Message>)
      }
      {success && item && <Item item={item} />}
    </div>
  )
}

export default Genre