import React from "react";
import { useParams } from 'react-router-dom';


const Category = () => {

  let { categoryId } = useParams();

  return (
    <div>
      <h2>Category ID: { categoryId } </h2>
    </div>
  )
}

export default Category