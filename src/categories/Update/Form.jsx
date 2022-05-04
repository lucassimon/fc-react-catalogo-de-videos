import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Message, Form } from 'semantic-ui-react'

import apiClient from "../../http-client";

import schema from './schema'


const FormUpdate = ({ item }) => {

  const [loadingForm, setLoadingForm] = useState(false);
  const [errorForm, setErrorForm] = useState(false);
  const [successForm, setSuccessForm] = useState(false);

  const {
      register,
      handleSubmit,
      formState:{ errors },
    } = useForm({
      resolver: yupResolver(schema),
      defaultValues: item,
    });

    const onSubmit = data => updateCategory(data)

    const updateCategory = async (data) => {
      setLoadingForm(true);
      try {
        await apiClient.put(`/v1/categories/${item.id}/`, data)
        setSuccessForm(true)
      } catch (error) {
        console.log(error)
        setErrorForm(true)
      }
      setLoadingForm(false);
    }

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
        <select {...register("status")}>
          <option value={0}>Inativo</option>
          <option value={1}>Ativo</option>
        </select >
        <Message warning content={errors.status?.message} />
      </Form.Field>

      <Message
        success
        header='Category saved'
      />
      <Button type='submit'>Submit</Button>
    </Form>
  )
}

export default FormUpdate