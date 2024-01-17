import React from 'react';
import { ReactComponent as LeftIcon } from '../images/left-arrow.svg';
import { ReactComponent as RightIcon } from '../images/right-arrow.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Paginator = () => {
  const {currentPage, hasPrevPage, hasNextPage} = useSelector(store => store.photos.pagination);

  return (
    <div className='d-flex justify-content-around mt-3'>
    
    {hasPrevPage && (
      <div className='d-flex justify-content-start'>
      <Link to='/'>
        <button className='btn-page'>
          <LeftIcon className='arrow-icon me-2'/>
          Prev
        </button>
      </Link>
    </div>
    )}
    {hasNextPage && (
      <div className='d-flex justify-content-end'>
        <Link to='/'>
          <button className='btn-page'>
            Next
            <RightIcon className='arrow-icon ms-2'/>
          </button>
        </Link>
      </div>
    )}
    </div>
  )
}

export default Paginator;


// {hasPrevPage && (
//   <Link to='/'>
//     <button className='btn-page'>
//       <LeftIcon className='arrow-icon me-2'/>
//       Prev
//     </button>
//   </Link>
// )}
// {hasNextPage && (
//   <Link to='/'>
//     <button className='btn-page'>
//       Next
//       <RightIcon className='arrow-icon ms-2'/>
//     </button>
//   </Link>
// )}