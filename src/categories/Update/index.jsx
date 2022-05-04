import React, { useState } from "react";

import { useParams } from 'react-router-dom';

import { Icon, Message } from 'semantic-ui-react'

import apiClient from "../../http-client";

import FormUpdate from './Form';


const EditCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [item, setItem] = useState(null);

  const { categoryId } = useParams();

  React.useEffect(() => {
    const getItem = async () => {
      setLoading(true)
      try {
        const response = await apiClient.get(`/v1/categories/${categoryId}/`)
        setItem(response.data);
      } catch (error) {
        setError(true)
      }
      setLoading(false)
    }

    getItem()
  }, [categoryId]);

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
      <h2>Update Category</h2>
      {error && <Message header="Ocorreu um erro inesperado" data-testid="errorDetail" />}
      <FormUpdate item={item} />
    </div>
  )
}

export default EditCategory
