import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Message, Form } from 'semantic-ui-react'

import apiClient from "../../http-client";
import schema from './schema'

const CreateCastMember = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const createCastMembers = async (data) => {
    setLoading(true);
    try {
      await apiClient.post("/v1/castmembers/", data)
      setSuccess(true)
    } catch (error) {
      setError(true)
    }
    setLoading(false);
  }
  const onSubmit = data => createCastMembers(data)

  return (
    <div>
      <h2>Criar CreateCastMember</h2>

      <Form onSubmit={handleSubmit(onSubmit)} loading={loading} error={error} warning={true} success={success}>
        <Form.Field>
          <label>Name</label>
          <input {...register("name")} />
          <Message warning content={errors.name?.message} />
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
    </div>
  )
}

export default CreateCastMember
