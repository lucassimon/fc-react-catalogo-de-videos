import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Message, Form } from 'semantic-ui-react'

import apiClient from "../../http-client";
import schema from './schema'


const CreateVideo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState(false);
  const [genres, setGenres] = useState(false);
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const createVideo = async (data) => {
    setLoading(true);

    console.log(data)

    const formData = new FormData()

    if (data.trailer_file.length > 0) {
      formData.append("trailer_file", data.trailer_file[0])
    }
    if (data.video_file.length > 0) {
      formData.append("video_file", data.video_file[0])
    }
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("year_launched", data.year_launched)
    formData.append("duration", data.duration)
    formData.append("rating", data.rating)
    formData.append("categories", [data.categories])
    formData.append("genres", [data.genres])

    console.log(formData)

    const config = { headers: {'content-type': 'multipart/form-data',},};

    try {
      await apiClient.post("/v1/videos/", formData, config)
      setSuccess(true)
    } catch (error) {
      setError(true)
    }
    setLoading(false);
  }

  const onSubmit = data => createVideo(data)

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
    <div>
      <h2>Criar Videos</h2>

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
          <label>Categories</label>
          <select {...register("categories")}>
            {(categories || []).map((item) => (
              <option key={item.id} value={item.id}>{item.title}</option>
            ))}
          </select >
          <Message warning content={errors.categories?.message} />
        </Form.Field>

        {/* <Form.Field>
        {(categories || []).map((item) => (
          <label>
            <input key={item.id} type="checkbox" value={item.id}  {...register("categories")} />{' '}
            {item.title}
          </label>
        ))}
        <Message warning content={errors.categories?.message} />
        </Form.Field> */}

        <Form.Field>
          <label>Genres</label>
          <select {...register("genres")}>
            {(genres || []).map((item) => (
              <option key={item.id} value={item.id}>{item.title}</option>
            ))}
          </select >
          <Message warning content={errors.genres?.message} />
        </Form.Field>

        {/* <Form.Field>
        {(genres || []).map((item) => (
          <label>
            <input key={item.id} type="checkbox" value={item.id}  {...register("genres")} />{' '}
            {item.title}
          </label>
        ))}
        <Message warning content={errors.genres?.message} />
        </Form.Field> */}

        <Form.Field>
          <label>thumb_file</label>
          <input {...register("thumb_file")} type="file" />
          <Message warning content={errors.thumb_file?.message} />
        </Form.Field>

        <Form.Field>
          <label>banner_file</label>
          <input {...register("banner_file")} type="file" />
          <Message warning content={errors.banner_file?.message} />
        </Form.Field>

        <Form.Field>
          <label>Trailler</label>
          <input {...register("trailer_file")} type="file" />
          <Message warning content={errors.trailer_file?.message} />
        </Form.Field>

        <Form.Field>
          <label>Video</label>
          <input {...register("video_file")} type="file" />
          <Message warning content={errors.video_file?.message} />
        </Form.Field>

        <Message success header='Category saved' />
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  )
}


export default CreateVideo