import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Message, Form, } from 'semantic-ui-react'

import apiClient from "../../http-client";

import schema from './schema'


const FormUpdate = ({ item }) => {

  const [loadingForm, setLoadingForm] = useState(false);
  const [errorForm, setErrorForm] = useState(false);
  const [successForm, setSuccessForm] = useState(false);
  const [categories, setCategories] = useState(false);

  const {
    register,
    handleSubmit,
    formState:{ errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: item,
  });

  const onSubmit = data => updateGenre(data)

  const updateGenre = async (data) => {
    setLoadingForm(true);

    try {
      await apiClient.put(`/v1/genres/${item.id}/`, data)
      setSuccessForm(true)
    } catch (error) {
      console.log(error)
      setErrorForm(true)
    }
    setLoadingForm(false);
  }

  const getCategories = async () => {
    const response = await apiClient.get("/v1/categories/?status=1&is_deleted=0&no_page=1")
    setCategories(response.data);
  }

  React.useEffect(() => {
    getCategories()
  }, []);


  return (
    <Form onSubmit={handleSubmit(onSubmit)} loading={loadingForm} error={errorForm} warning={!!errors} success={successForm}>
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

      <Form.Field>
        <label>is deleted?</label>
        <input type="checkbox" {...register("is_deleted")} />
      </Form.Field>

      <Form.Field>
        <label>Status?</label>
        <select {...register("status")}>
          <option value={0}>Inativo</option>
          <option value={1}>Ativo</option>
        </select >
        <Message warning content={errors.status?.message} />
      </Form.Field>

      <Form.Field>
      {(categories || []).map((item) => (
        <label>
          <input key={item.id} type="checkbox" value={item.id}  {...register("categories")} />{' '}
          {item.title}
        </label>
      ))}
      <Message warning content={errors.categories?.message} />
      </Form.Field>

      <Message
        success
        header='Genre saved'
      />
      <Button type='submit'>Submit</Button>
    </Form>
  )
}

export default FormUpdate