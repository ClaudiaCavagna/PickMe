import React from 'react';
import { ReactComponent as LeftIcon } from '../images/left-arrow.svg';
import { ReactComponent as RightIcon } from '../images/right-arrow.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Paginator = () => {
  const {currentPage, hasPrevPage, hasNextPage} = useSelector(store => store.photos.pagination);

  function pagination() {
    if(!hasPrevPage && hasNextPage) {
      return 'd-flex justify-content-end';
    }  else if (hasPrevPage && hasNextPage) {
      return 'd-flex justify-content-between';
    } else if (hasPrevPage && !hasNextPage) {
      return 'd-flex justify-content-start';
    }
  };

  return (
    <div className={pagination()}>
      {hasPrevPage && (
        <Link to={parseInt(currentPage, 10) === 2 ? '/' : `/photo/${parseInt(currentPage, 10) - 1}`}>
          <button className='btn-page'>
            <LeftIcon className='arrow-icon me-2'/>
            Prev
          </button>
        </Link>

      )}
      {hasNextPage && (
        <Link to={`/photo/${parseInt(currentPage, 10) + 1}`}>
          <button className='btn-page'>
            Next
            <RightIcon className='arrow-icon ms-2'/>
          </button>
        </Link>
      )}

    </div>
  )
}

export default Paginator;