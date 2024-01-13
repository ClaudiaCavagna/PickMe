import React, { useState } from 'react';
import Skeleton from './Skeleton';
import styled from 'styled-components';
import { pricer } from '../utils/helpers';

const Card = styled('div')`
  width: 367px;
  height: 343px;
  /* width: 100%; */
  border-radius: 4px 4px 0px 0px;
  overflow-x: hidden;
  position: relative;
  transform: translateZ(0);
  background-color: red;
  margin: 4px;
  margin-bottom: 3rem;
`;

const Photo = ({alt_description, color, urls: {regular}, likes, id}) => {
  const [load, setLoad] = useState(false);

  return (
    <>
      <Card>
        <div style={{width: '100%', height: '100%', background: {color}}}>
          <img src={regular} alt={alt_description} style={{width: '100%', height: '100%'}} onLoad={setLoad(true)}/>

        <Skeleton style={{width: '100%', height: '100%', display: load ? 'none' : 'block'}}/>        
        </div>
      </Card>
    </>
  )
}

export default Photo
