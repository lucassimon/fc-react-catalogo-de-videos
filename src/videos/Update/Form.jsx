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
  const [categories, setCategories] = useState(false);
  const [genres, setGenres] = useState(false);

  const {
    register,
    handleSubmit,
    formState:{ errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {...item, video_file:null, trailer_file:null},
  });

  const onSubmit = data => updateVideo(data)

  const updateVideo = async (data) => {
    setLoadingForm(true);
    console.log(data)
    try {
      await apiClient.put(`/v1/videos/${item.id}/`, data)
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

  const getGenres = async () => {
    const response = await apiClient.get("/v1/genres/?status=1&is_deleted=0&no_page=1")
    setGenres(response.data);
  }

  React.useEffect(() => {
    getCategories()
    getGenres()
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
          <label>Year launched</label>
          <input {...register("year_launched")} />
          <Message warning content={errors.year_launched?.message} />
        </Form.Field>

        <Form.Field>
          <label>Duration</label>
          <input {...register("duration")} />
          <Message warning content={errors.duration?.message} />
        </Form.Field>

        <Form.Field>
          <label>Rating</label>
          <input {...register("rating")} />
          <Message warning content={errors.rating?.message} />
        </Form.Field>

        <Form.Field>
        {(categories || []).map((item) => (
          <label key={item.id}>
            <input type="checkbox" value={item.id}  {...register("categories")} />{' '}
            {item.title}
          </label>
        ))}
        <Message warning content={errors.categories?.message} />
        </Form.Field>

        <Form.Field>
        {(genres || []).map((item) => (
          <label key={item.id}>
            <input  type="checkbox" value={item.id}  {...register("genres")} />{' '}
            {item.title}
          </label>
        ))}
        <Message warning content={errors.genres?.message} />
        </Form.Field>

        <Message success header='Category saved' />
        <Button type='submit'>Submit</Button>
    </Form>
  )
}

export default FormUpdate