/* eslint-disable react/prop-types */
// import React from 'react'

const Image = ({src,alt}) => {
  return (
    <a href='/'>
        <picture>
            <img src={src} alt={alt}/>
        </picture>
    </a>
  )
}

export default Image