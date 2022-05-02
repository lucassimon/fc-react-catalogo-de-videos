import React from "react";
import { useParams } from 'react-router-dom';


const Video = () => {

  let { videoId } = useParams();

  return (
    <div>
      <h2>Video ID: { videoId } </h2>
    </div>
  )
}

export default Video