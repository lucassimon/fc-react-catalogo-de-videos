import React from "react";
import { useParams } from 'react-router-dom';


const CastMember = () => {

  let { castMemberId } = useParams();

  return (
    <div>
      <h2>Cast Member ID: { castMemberId } </h2>
    </div>
  )
}

export default CastMember