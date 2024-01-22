import React, { useState, useEffect } from 'react';
import { ReactComponent as SearchIcon } from "../images/search-media.svg";
import { useDispatch, useSelector } from 'react-redux';
import { catchError, cleanError, fetchData, saveQuery, updatePage } from '../redux/reducers/api-reducer';
import { rowalizer } from '../utils/helpers';
import PhotoSection from './PhotoSection';
import Paginator from './Paginator';

const HomeBody = () => {
  
  const { photos, error, loading, rate_limit, query: lastSearch } = useSelector((state) => state.photos);
  const dispatch = useDispatch();

  const [itemPerPage, setItemPerPage] = useState(lastSearch.itemPerPage || 12);
  const [query, setQuery] = useState(lastSearch.query || "");

  const fetchPhotos = (type = 'popular', page = 1) => {
    let apiUrl = null;
    if (type === "search") {
      if (!query || query === " ") {
        dispatch(catchError(["Insert at least 1 characther"]));
        return;
      }
      apiUrl = `search/photos?query=${query}&`;
    } else {
      apiUrl = "photos?";
    }
    dispatch(updatePage(page));
    dispatch(fetchData(`${apiUrl}per_page=${itemPerPage}&page=${page}`));

    dispatch(saveQuery({
      path: `${apiUrl}`.trim(),
      itemPerPage,
      type,
      query
    }));
  };


  const searchPhoto = (page = 1) => {
    // dispatch(cleanError(error));
    fetchPhotos("search", page);
  }

  const handleChange = (e) => {
    dispatch(cleanError(error));
    const { value } = e.target;
    setQuery(value);
  }

  useEffect(() => {
    if(!lastSearch.query){
      fetchPhotos();
    } else {
      fetchPhotos(lastSearch.type);
    }
  }, [itemPerPage]);

  return (
    <section>
      <div className='place-items search-section'>
        <h4>search your photos</h4>
        <p className='request-p'>{`Requests: ${rate_limit.remaining}/${rate_limit.total}`}</p>
      </div>
      <div className='input-wrapper place-items' style={{borderColor: error.status ? "var(--error)" : "var(--grey-600)"}}>
        <input 
          type='text' 
          placeholder='Search your photo' 
          value={query} 
          onChange={handleChange}
        />
        <button className='btn' onClick={() => searchPhoto()}>
          <SearchIcon className='search-icon' />
        </button>
      </div>
      <div className='mt-5 text-center'>
        { !loading && !error.status && (photos?.length > 0 || photos?.results.length > 0) ? (
          rowalizer(photos?.results ? photos.results : photos).map((row, index) => {
            return <PhotoSection row={row} index={index}/>
          })
        ) : !loading && error.status ? (
          <h3>
            {
              error?.message && error?.message?.length > 0 ? error.message.join(" ") : "Sorry, an error occured. Try later"
            }
          </h3>
        ) : (
          <h3>Loading...</h3>
        )
        }
      </div>
      <div className='mt-2'>
        <Paginator />
      </div>
      <div className='mt-5 text-end'>
        <p>Items per Page 
          <select className='ms-2 page-select' value={itemPerPage} onChange={(e) => setItemPerPage(e.target.value)}>
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
