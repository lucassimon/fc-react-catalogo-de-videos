import React, { useState } from "react";

import { useParams } from 'react-router-dom';

import { Icon, Message } from 'semantic-ui-react'

import apiClient from "../../http-client";

import FormUpdate from './Form';


const EditVideo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [item, setItem] = useState(null);

  const { videoId } = useParams();

  React.useEffect(() => {
    const getItem = async () => {
      setLoading(true)
      try {
        const response = await apiClient.get(`/v1/videos/${videoId}/`)
        setItem(response.data);
      } catch (error) {
        setError(true)
      }
      setLoading(false)
    }

    getItem()
  }, [videoId]);

  if (loading) {
    return (
      <Message icon>
        <Icon name='circle notched' loading />
        <Message.Content>
          <Message.Header>Just one second</Message.Header>
          We are fetching that content for you.
        </Message.Content>
      </Message>
    )
  }

  return (
    <div>
      <h2>Update Video</h2>
      {error && <Message header="Ocorreu um erro inesperado" data-testid="errorDetail" />}
      {item && <FormUpdate item={item} />}
    </div>
  )
}

export default EditVideo
