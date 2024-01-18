import React from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { RiDeleteBack2Fill } from "react-icons/ri";
import { cleanCart, removeFromCart } from '../redux/reducers/cart-reducer';

const Checkout = () => {
  const dispatch = useDispatch();
  const { cart, total } = useSelector(store => store.cart);

  return (
    <section className='container'>
      <div style={{marginTop: '90px'}}>
        <h1 className='checkout-title'>Checkout</h1>
      </div>
      <div className='xl-checkout'>
        <div className='list-container'>
          <div className='text-end'>
            <button className='btn-remove' onClick={() => dispatch(cleanCart())}>Remove all</button>
          </div>
          <div className='text-checkout'>
            {cart && cart.length > 0 ? (
              cart.map((el) => {
                return (
                  <div key={el.id} className='cart-item'>
                    <img src={el.url} alt={el.alt_description} style={{width: '160px', height: '90px', borderRadius: '10px 0px 0px 10px'}}/>
                    <div className='p-1'>
                      <p>Artist - {el.user}</p>
                      <h6>{el.price}€</h6>
                    </div>
                    <button className='btn' onClick={()=>dispatch(removeFromCart(el))}>
                      <RiDeleteBack2Fill style={{color: 'var(--purple-300)', fontSize: '1.5rem'}}/>
                    </button>
                  </div>
                )
              })
            ) : (
              <h4>No items selected</h4>
            )}
          </div>
        </div>
        
        <div className='form-container'>
          <div className='text-center'>
            <h5>Payment details</h5>
          </div>
          <Formik
            // initialValues={initialValues}
            // validationSchema={validationSchema}
            // onSubmit={(values, { setSubmitting }) => {
            //   setTimeout(() => {
            //     dispatch(payOrder());
            //     setSubmitting(false);
            //   }, 400);
            // }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid,
              dirty,
            }) => (
              <form className='checkout-form'>
                <div className='input-wrap'>
                  <input value='' name='name' placeholder='Name' className='medium-input'/>
                  <input value='' name='surname' placeholder='Surname'className='medium-input'/>
                </div>
                <div>
                  <input value='' name='card' placeholder='Credit card' className='w-100'/>
                </div>
                <div className='input-wrap'>
                  <input value='' name='address' placeholder='Address'
                  className='medium-input' />
                  <div className='d-flex justify-content-around'>
                    <input value='' name='num' placeholder='Num' className='small-input'/>
                    <input value='' name='cap' placeholder='CAP' className='small-input'/> 
                  </div>
                
                </div>
                <div className='d-flex justify-content-between mt-3'>
                  <h5>{total}€</h5>
                  <button className='btn-page'>
                    Checkout
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>

      </div>
    </section>
  )
}

export default Checkout;


