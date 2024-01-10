import React from 'react';
import { ReactComponent as Logo } from "../images/logo-footer.svg";

const Footer = () => {
  return (
    <footer className='container position-footer' style={{background: 'var(--grey-800)'}}>
      <div className='d-flex justify-content-center footer-text'>
        <Logo className='footer-icon'/>
        <div className='ms-3'>
          <h5>pick me</h5>
          <p style={{color: 'var(--grey-500)'}}>Lorem ipsum dolor sit.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
