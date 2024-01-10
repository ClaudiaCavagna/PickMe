import React from 'react';
import { ReactComponent as SearchIcon } from "../images/search-media.svg";

const HomeBody = () => {
  return (
    <section>
      <div className='place-items search-section'>
        <h4>search your photos</h4>
        <p className='request-p'>Requests: 50/50</p>
      </div>
      <div className='input-wrapper place-items'>
        <input type='text' placeholder='Search your photo'/>
        <button>
          <SearchIcon className='search-icon' />
        </button>
      </div>
    </section>
  )
}

export default HomeBody
