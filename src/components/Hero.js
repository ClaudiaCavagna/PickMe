import React from 'react';
import NftImage from "../images/nft-img.png";


const Hero = () => {
  return (
    <div className='hero-xl' style={{marginTop: '90px'}}>
      <div>
        <h1>The easiest way to buy Photos as NFT.</h1>
      </div>
      <img src={NftImage} alt='img' style={{
        width: '100%', 
        height: '346px',
        borderRadius: '16px',
        marginBlock: '2rem'
      }}/>
    </div>
  )
}

export default Hero;
