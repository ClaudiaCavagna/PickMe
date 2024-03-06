import React, { useState } from 'react';
import Skeleton from './Skeleton';
import styled from 'styled-components';
import { pricer } from '../utils/helpers';
import { ReactComponent as CartIcon } from '../images/purple-cart.svg';
import { FaHeart } from "react-icons/fa";
import { addSingleItem } from '../redux/reducers/cart-reducer';
import { useDispatch } from 'react-redux';



const Card = styled('div')`
  height: 100px;
  width: 80px;
  border-radius: 4px 4px 0px 0px;
  overflow-x: hidden;
  position: relative;
  transform: translateZ(0);
  margin: 2px;
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
    transition: all 125ms ease-out;
    transform: rotateX(-90deg);
    width: 100%;
    overflow: hidden;
    position: absolute;
    bottom: 0px;
    background-color: var(--translucent);
    padding: 0.5rem;
  }
  @media screen and (min-width: 375px){
    width: 100px;
    height: 120px;
    .card-action {
      padding: 1rem;
    }
  }
  @media screen and (min-width: 490px){
    width: 140px;
    height: 160px;
    .card-action {
      padding: 1.5rem;
    }
  }
  @media screen and (min-width: 630px){
    width: 170px;
    height: 190px;
    .card-action{
      padding: 2rem;
    }
  }
  @media screen and (min-width: 768px){
    width: 220px;
    height: 240px;
    .card-action{
      padding: 3rem;
    }
  }
  @media screen and (min-width: 992px) {
    width: 280px;
    height: 280px;
  }
  @media screen and (min-width: 1200px) {
    width: 330px;
    height: 330px;
    .card-action {
      padding: 4rem;
    }
  }
`;

const Photo = ({alt_description, color, urls: {regular}, likes, id, user: {username}}) => {
  const [load, setLoad] = useState(false);
  const price = pricer(likes);

  const dispatch = useDispatch();  
  return (
    <div style={{marginBottom: '3rem'}}>
      <Card style={{display: load ? 'block' : 'none'}}>
        <div style={{width: '100%', height: '100%', background: {color}}}>
          <img src={regular} alt={alt_description} onLoad={()=>setLoad(true)} style={{width: '100%', height: '100%'}} />   
          <div className='card-action' style={{display: 'grid', alignItems: 'center'}}>
            <div className='d-flex justify-content-between'>
              <p>{likes} 
                <FaHeart style={{color: 'var(--purple-300)', marginInline: '5px', marginBottom: '3px'}}/>
              </p>
              <p>{price}€</p>
            </div>
              
              <button className='btn btn-animation' onClick={() => dispatch(addSingleItem({id, price, url: regular, alt_description, user: username}))}>
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

export default Photo;
