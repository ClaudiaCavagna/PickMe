import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Paginator from '../components/Paginator';
import { fetchData, saveQuery, updatePage } from '../redux/reducers/api-reducer';
import { rowalizer } from '../utils/helpers';
import PhotoSection from '../components/PhotoSection';

const Paginated = () => {
  const { page } = useParams();
  const {query: {query, path, type, itemPerPage}, error, loading, photos} = useSelector(store => store.photos);
  const [item_per_page, set_item_per_page] = useState(itemPerPage);
  const dispatch = useDispatch();

  const fetchPaginatedData = useCallback(()=>{
    dispatch(updatePage(page));
    dispatch(fetchData(`${path}per_page=${item_per_page}&page=${page}`));
    dispatch(saveQuery({
      query,
      path,
      type,
      itemPerPage: item_per_page,
    }))
  }, [dispatch, item_per_page, page]);

  useEffect(()=>{
    fetchPaginatedData();
  }, [fetchPaginatedData]);

  return (
    <section className='container'>
      <div style={{marginTop: '90px'}}>
      { 
        !loading && 
        !error.status && 
        (photos?.length > 0 || photos?.results.length > 0) ? (
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
        <div className='mt-2'>
        <Paginator />
      </div>
      <div className='mt-5 text-end'>
        <p>Items per Page 
          <select className='ms-2 page-select' value={item_per_page} onChange={(e) => set_item_per_page(e.target.value)}>
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
    </div>
  </section>
  )
}

export default Paginated;
