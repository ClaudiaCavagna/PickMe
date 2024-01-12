import React, { useState, useEffect } from 'react';
import { ReactComponent as SearchIcon } from "../images/search-media.svg";
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/reducers/api-reducer';

const HomeBody = () => {
  
  const { photos, error, loading, rate_limit } = useSelector((state) => state.photos);
  const dispatch = useDispatch();

  const [itemPerPage, setItemPerPage] =useState(12);

  useEffect(() => {
    dispatch(fetchData("photos"));
  }, [])
  return (
    <section>
      <div className='place-items search-section'>
        <h4>search your photos</h4>
        <p className='request-p'>{`Requests: ${rate_limit.remaining}/${rate_limit.total}`}</p>
      </div>
      <div className='input-wrapper place-items'>
        <input type='text' placeholder='Search your photo'/>
        <button>
          <SearchIcon className='search-icon' />
        </button>
      </div>
      <div className='mt-5 text-center'>
        { !loading && !error.status && photos.length > 0 ? (
          'photo'
        ) : !loading && error.status ? (
          error.message && error.message.length > 0 ? (
            error.message.join(" ")
          ) : (
            'Error'
          )
        ) : (
          <h3>loading </h3>
        )

        }
      </div>
      <div className='mt-5 text-end'>
        <p>Items per Page 
          <select value={itemPerPage} onChange={(e) => setItemPerPage(e)}>
            {Array.from({length: 6}, (_,index) => {
              return (index + 1) * 3;
            }).map(el => {
              return <option value={el} key={el}>
                {el}
              </option>
            })}
          </select>
        </p>
      </div>
    </section>
  )
}

export default HomeBody;
