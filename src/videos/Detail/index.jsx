import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { Icon, Message } from 'semantic-ui-react'

import apiClient from "../../http-client";

import Item from './Item'


const Video = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [item, setItem] = useState(null);

  let { videoId } = useParams();

  React.useEffect(() => {
    const getItem = async () => {
      setLoading(true)
      try {
        const response = await apiClient.get(`/v1/videos/${videoId}/`)
        setItem(response.data);
        setSuccess(true)
      } catch (error) {
        setError(true)
      }
      setLoading(false)
    }

    getItem()
  }, [videoId]);

  return (
    <div>
      <h2>Video ID: { videoId } </h2>
      {error && <Message error header="Ocorreu um erro" data-testid="errorDetail" />}
      {loading && (<Message icon>
        <Icon name='circle notched' loading />
        <Message.Content>
          <Message.Header>Just one second</Message.Header>
          We are fetching that content for you.
        </Message.Content>
      </Message>)
      }
      {item && <Item item={item} />}
    </div>
  )
}

export default Video