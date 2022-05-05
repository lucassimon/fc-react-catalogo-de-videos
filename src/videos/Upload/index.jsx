import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Icon, Message, Form } from 'semantic-ui-react'

import apiClient from "../../http-client";
import schema from './schema'


const UploadVideo = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [loadingForm, setLoadingForm] = useState(false);
  const [errorForm, setErrorForm] = useState(false);
  const [successForm, setSuccessForm] = useState(false);
  const { videoId } = useParams();

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const uploadFiles = async (data) => {
    setLoadingForm(true);

    try {
      console.log(data)

      const formData = new FormData()

      if (data.trailer_file.length > 0) {
        formData.append("trailer_file", data.trailer_file[0])
      }
      if (data.video_file.length > 0) {
        formData.append("video_file", data.video_file[0])
      }

      const config = { headers: {'content-type': 'multipart/form-data',},};

      await apiClient.patch(`/v1/videos/${videoId}/`, formData, config)

      setSuccessForm(true)

    } catch (error) {
      setErrorForm(true)
    }
    setLoadingForm(false);
  }

  const onSubmit = data => uploadFiles(data)

  React.useEffect(() => {
    const getItem = async () => {
      setLoading(true)
      try {
        const response = await apiClient.get(`/v1/videos/${videoId}/`)
        setItem(response.data);
        setSuccess(true)
      } catch (error) {
        setError(true)
      }
      setLoading(false)
    }

    getItem()
  }, [videoId]);

  if (item === null) {
    return null
  }

  return (
    <div>
      <h2>Upload Videos</h2>

      {!success && error && <Message error header="Ocorreu um erro" data-testid="errorDetail" />}
      {item === null && loading && (<Message icon>
        <Icon name='circle notched' loading />
        <Message.Content>
          <Message.Header>Just one second</Message.Header>
          We are fetching that content for you.
        </Message.Content>
      </Message>)
      }

      <Form onSubmit={handleSubmit(onSubmit)} loading={loadingForm} error={errorForm} warning={!!errors} success={successForm}>

        {item.thumb_file && item.thumb_file}
        <Form.Field>
          <label>thumb_file</label>
          <input {...register("thumb_file")} type="file" />
          <Message warning content={errors.thumb_file?.message} />
        </Form.Field>

        {item.banner_file && item.banner_file}
        <Form.Field>
          <label>banner_file</label>
          <input {...register("banner_file")} type="file" />
          <Message warning content={errors.banner_file?.message} />
        </Form.Field>

        {item.trailer_file && item.trailer_file}
        <Form.Field>
          <label>Trailler</label>
          <input {...register("trailer_file")} type="file" />
          <Message warning content={errors.trailer_file?.message} />
        </Form.Field>

        {item.video_file && item.video_file}
        <Form.Field>
          <label>Video</label>
          <input {...register("video_file")} type="file" />
          <Message warning content={errors.video_file?.message} />
        </Form.Field>

        {successForm && <Message success header='Category saved' />}
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  )
}


export default UploadVideo