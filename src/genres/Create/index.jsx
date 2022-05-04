import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Message, Form } from 'semantic-ui-react'

import apiClient from "../../http-client";
import schema from './schema'


const CreateGenre = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState(false);
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const appendToArray = async (data) => {
    let categories = []
    categories.push(data["categories"])
    data["categories"] = categories

    let new_data = {
      "title": data.title,
      "categories": categories
    }

    return new_data
  }

  const createGenre = async (data) => {
    const new_data = await appendToArray(data)
    setLoading(true);
    try {
      await apiClient.post("/v1/genres/", new_data)
      setSuccess(true)
    } catch (error) {
      setError(true)
    }
    setLoading(false);
  }
  const onSubmit = data => createGenre(data)

  const getCategories = async () => {
    const response = await apiClient.get("/v1/categories/?status=1&is_deleted=0&no_page=1")
    setCategories(response.data);
  }

  React.useEffect(() => {
    getCategories()
  }, []);


  return (
    <div>
      <h2>Criar Genero</h2>

      <Form onSubmit={handleSubmit(onSubmit)} loading={loading} error={error} warning={true} success={success}>
        <Form.Field>
          <label>Title</label>
          <input {...register("title")} />
          <Message warning content={errors.title?.message} />
        </Form.Field>

        <Form.Field>
          <label>Categories</label>
          <select {...register("categories")}>
            {(categories || []).map((item) => (
              <option key={item.id} value={item.id}>{item.title}</option>
            ))}
          </select >
          <Message warning content={errors.description?.message} />
        </Form.Field>

        <Message success header='Category saved' />
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  )
}
export default CreateGenre