import React from 'react';
import {ReactComponent as Logo} from '../images/logo.svg';
import {ReactComponent as CartIcon} from '../images/cart.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='w-100 place-items bg-header'>
      <Link to='/'>
        <Logo />
      </Link>

      <Link to='/checkout'>
        <CartIcon className='cart-icon'/>
      </Link>
    </header>
  )
}

export default Header;
