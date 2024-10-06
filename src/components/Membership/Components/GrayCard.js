import React, { useState, useEffect } from 'react'
import "./componentStyle.css";

const GrayCard = ({name, value}) => {

  return (
    <React.Fragment>
     <div className='grayCardMain'>
      <div>{name}</div>
      <div className='grayCardMainValue'>{value}</div>
     </div>

    </React.Fragment>
  )
}
export default GrayCard;