import React from 'react';
import Photo from './Photo';

const PhotoSection = ({row, index}) => {
  return (
    <section className='d-flex justify-content-between'>
      {row.map((photo) => {
        return <Photo key={photo.id} {...photo} />
      })}
    </section>
  )
}

export default PhotoSection
