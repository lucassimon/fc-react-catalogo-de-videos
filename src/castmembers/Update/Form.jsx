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

    const onSubmit = data => updateCastMembers(data)

    const updateCastMembers = async (data) => {
      setLoadingForm(true);
      try {
        await apiClient.put(`/v1/castmembers/${item.id}/`, data)
        setSuccessForm(true)
      } catch (error) {
        console.log(error)
        setErrorForm(true)
      }
      setLoadingForm(false);
    }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} loading={loadingForm} error={errorForm} warning={true} success={successForm}>
      <Form.Field>
        <label>Name</label>
        <input {...register("name")} />
        <Message warning content={errors.name?.message} />
      </Form.Field>

      <Form.Field>
        <label>is deleted?</label>
        <input type="checkbox" {...register("is_deleted")} />
      </Form.Field>

      <Form.Field>
        <select {...register("kind")}>
          <option value={0}>Diretor</option>
          <option value={1}>Ator</option>
        </select >
        <Message warning content={errors.kind?.message} />
      </Form.Field>

      <Message
        success
        header='CastEmbers saved'
      />
      <Button type='submit'>Submit</Button>
    </Form>
  )
}

export default FormUpdate