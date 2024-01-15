import React, { useState } from 'react';
import Skeleton from './Skeleton';
import styled from 'styled-components';
import { pricer } from '../utils/helpers';
import { ReactComponent as CartIcon } from '../images/purple-cart.svg';
import { FaHeart } from "react-icons/fa";



const Card = styled('div')`
  height: 120px;
  width: 100px;
  border-radius: 4px 4px 0px 0px;
  overflow-x: hidden;
  position: relative;
  transform: translateZ(0);
  margin: 2px;
  /* margin-bottom: 3rem; */
  @media screen and (min-width: 430px){
    width: 140px;
    height: 160px;
  }
  @media screen and (min-width: 630px){
    width: 170px;
    height: 180px;
  }
  @media screen and (min-width: 768px){
    width: 220px;
    height: 245px;
  }
  @media screen and (min-width: 992px) {
    width: 350px;
    height: 330px;
    margin: 4px;
  }
  &:hover {
    .card-action {
      opacity: 1;
      visibility: visible;
      transform: rotateX(0deg);
      height: 100% !important;
    }
  }
  .card-action {
    opacity: 0;
    visibility: hidden;
    transition: all 125ms linear;
    transform: rotateX(-90deg);
    width: 100%;
    overflow: hidden;
    position: absolute;
    bottom: 0px;
    background-color: var(--translucent);
  }
`;

const Photo = ({alt_description, color, urls: {regular}, likes, id}) => {
  const [load, setLoad] = useState(false);
  const price = pricer(likes);

  
 
  return (
    <div style={{marginBottom: '3rem'}}>
      <Card style={{display: load ? 'block' : 'none'}}>
        <div style={{width: '100%', height: '100%', background: {color}}}>
          <img src={regular} alt={alt_description} onLoad={()=>setLoad(true)} style={{width: '100%', height: '100%'}} />   
          <div className='card-action' style={{display: 'grid', alignItems: 'center'}}>
              <p>{likes} 
                <FaHeart style={{color: 'var(--purple-300)', marginInline: '5px', marginBottom: '3px'}}/>
              </p>
              <p>{price}€</p>
              <button className='btn'>
                <CartIcon className='cart-icon-small' />
              </button>
          </div>   
        </div>
      </Card>
      <Card style={{display: load ? 'none' : 'block'}}>
        <Skeleton />  
      </Card>
    </div>
  )
}

export default Photo
