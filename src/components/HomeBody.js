import React, { useState, useEffect } from 'react';
import { ReactComponent as SearchIcon } from "../images/search-media.svg";
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/reducers/api-reducer';
import { rowalizer } from '../utils/helpers';
import PhotoSection from './PhotoSection';

const HomeBody = () => {
  
  const { photos, error, loading, rate_limit } = useSelector((state) => state.photos);
  const dispatch = useDispatch();

  const [itemPerPage, setItemPerPage] = useState(12);
  const [query, setQuery] = useState("");

  const fetchPhotos = (type = 'popular', page = 1) => {
    let apiUrl = null;
    if(type === "search") {
      apiUrl = `search/photos?query=${query}&`;
    } else {
      apiUrl = "photos?";
    }
    dispatch(fetchData(`${apiUrl}per_page=${itemPerPage}&page=${page}`));
  };


  const searchPhoto = (page = 1) => {
    fetchPhotos("search");
  }

  useEffect(() => {
    fetchPhotos();
  }, [itemPerPage]);

  return (
    <section>
      <div className='place-items search-section'>
        <h4>search your photos</h4>
        <p className='request-p'>{`Requests: ${rate_limit.remaining}/${rate_limit.total}`}</p>
      </div>
      <div className='input-wrapper place-items'>
        <input 
          type='text' 
          placeholder='Search your photo' 
          value={query} 
          onChange={(e) => {setQuery(e.target.value)}}
        />
        <button className='btn' onClick={() => searchPhoto()}>
          <SearchIcon className='search-icon' />
        </button>
      </div>
      <div className='mt-5 text-center'>
        { !loading && !error.status && photos.length > 0 ? (
          rowalizer(photos).map(el => {
            console.log(photos);
            return <PhotoSection row={el}/>
          })
        ) : !loading && error.status ? (
          error.message && error.message.length > 0 ? (
            error.message.join(" ")
          ) : (
            <h3>Error</h3>
          )
        ) : (
          <h3>loading...</h3>
        )
        }
      </div>
      <div className='mt-5 text-end'>
        <p>Items per Page 
          <select className='ms-2' value={itemPerPage} onChange={(e) => setItemPerPage(e.target.value)}>
            {Array.from({length: 7}, (_,index) => {
              return (index + 1) * 3;
            }).map(el => {
              return (
              <option value={el} key={`option-${el}`}>
                {el}
              </option>
              );
            })}
          </select>
        </p>
      </div>
    </section>
  )
}

export default HomeBody;
