import React from "react";
import { useParams } from 'react-router-dom';


const Genre = () => {

  let { genreId } = useParams();

  return (
    <div>
      <h2>Genre ID: { genreId } </h2>
    </div>
  )
}

export default Genre