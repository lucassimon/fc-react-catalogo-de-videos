import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Message, Form } from 'semantic-ui-react'

import apiClient from "../../http-client";
import schema from './schema'


const CreateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const createCategory = async (data) => {
    setLoading(true);
    try {
      await apiClient.post("/v1/categories/", data)
      setSuccess(true)
    } catch (error) {
      setError(true)
    }
    setLoading(false);
  }
  const onSubmit = data => createCategory(data)

  return (
    <div>
      <h2>Criar Categoria</h2>

      <Form onSubmit={handleSubmit(onSubmit)} loading={loading} error={error} warning={true} success={success}>
        <Form.Field>
          <label>Title</label>
          <input {...register("title")} />
          <Message warning content={errors.title?.message} />
        </Form.Field>

        <Form.Field>
          <label>Description</label>
          <input {...register("description")} />
          <Message warning content={errors.description?.message} />
        </Form.Field>

        <Message success header='Category saved' />
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  )
}

export default CreateCategory