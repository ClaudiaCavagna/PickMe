import React from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { RiDeleteBack2Fill } from "react-icons/ri";
import { cleanCart, removeFromCart } from '../redux/reducers/cart-reducer';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .max(75, "Can't have more than 75 chars")
    .min(2, "A minimum of 2 chars needed")
    .required("What's your name honey?"),
  surname: Yup.string()
    .max(250, "Can't have more than 250 chars")
    .min(2, "A minimum of 2 chars needed")
    .required("You must provide a surname"),
  card: Yup.string()
    .max(25, "Card must have 25 numbers")
    .min(25, "Card must have 25 numbers")
    .required("You must provide a card number"),
  address: Yup.string()
    .max(250, "Can't have more than 250 chars")
    .min(2, "A minimum of 2 chars needed")
    .required("You must provide a valid address"),
  num: Yup.number()
    .max(10000, "Can't be higher than 10000")
    .positive("Can't be a negative number")
    .moreThan(0, "0 is not a valid number")
    .required("You must provide a valid address"),
  cap: Yup.string()
    .max(10, "Allowed max 10 chars")
    .min(3, "A minimum of 3 chars needed")
    .required("You must provide a valid address")
})

const initialValues = {
  name: "",
  surname: "",
  card: "",
  address: "",
  num: "",
  cap: ""
}

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
          <div className='text-checkout'>
            {cart && cart.length > 0 ? (
              <div className='text-end'>
                <button className='btn-remove' onClick={() => dispatch(cleanCart())}>Remove all</button>
              </div>
            ) : (<></>)}

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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                // dispatch(payOrder());
                setSubmitting(false);
              }, 400);
            }}
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
              <form className='checkout-form' onSubmit={handleSubmit}>
                <div className='input-wrap'>
                  <div>
                    <input 
                      value={values.name} 
                      name='name' 
                      placeholder='Name' 
                      className='medium-input' 
                      style={errors.name ? {borderColor: 'var(--error)'} : {borderColor: 'var(--grey-600)'}}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.name && errors.name && (
                      <div>
                      <p style={{color: 'var(--error)', fontSize: '8px', textAlign: 'right'}}>
                        {errors.name}
                      </p>
                      </div>
                    )}
                  </div>
                  <div className='divider'></div>
                  <div>
                    <input 
                      value={values.surname} 
                      name='surname' 
                      placeholder='Surname'
                      className='medium-input'
                      style={errors.surname ? {borderColor: 'var(--error)'} : {borderColor: 'var(--grey-600)'}}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.surname && errors.surname && (
                      <p style={{color: 'var(--error)', fontSize: '8px', textAlign: 'right'}}>
                        {errors.surname}
                      </p>
                    )}
                  </div>
                  
                </div>
                <div>
                  <input 
                    value={values.card} 
                    name='card' 
                    placeholder='Credit card' 
                    className='w-100'
                    style={errors.card ? {borderColor: 'var(--error)'} : {borderColor: 'var(--grey-600)'}}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.card && errors.card && (
                    <p style={{color: 'var(--error)', fontSize: '8px', textAlign: 'right'}}>
                      {errors.card}
                    </p>
                  )}
                </div>
                <div className='input-wrap'>
                  <div>
                    <input 
                      value={values.address} 
                      name='address' 
                      placeholder='Address'
                      className='medium-input' 
                      style={errors.address ? {borderColor: 'var(--error)'} : {borderColor: 'var(--grey-600)'}}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.address && errors.address && (
                      <p style={{color: 'var(--error)', fontSize: '8px', textAlign: 'right'}}>
                        {errors.address}
                      </p>
                    )}
                  </div>
                  
                  <div className='d-flex justify-content-between'>
                    <div>
                      <input 
                        value={values.num} 
                        name='num' 
                        placeholder='Num' 
                        className='small-input'
                        style={errors.num ? {borderColor: 'var(--error)'} : {borderColor: 'var(--grey-600)'}}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.num && errors.num && (
                        <p style={{color: 'var(--error)', fontSize: '8px', textAlign: 'right'}}>
                          {errors.num}
                        </p>
                      )}
                    </div>
                    <div>
                      <input 
                        value={values.cap} 
                        name='cap' 
                        placeholder='CAP' 
                        className='small-input'
                        style={errors.cap ? {borderColor: 'var(--error)'} : {borderColor: 'var(--grey-600)'}}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      /> 
                      {touched.cap && errors.cap && (
                        <p style={{color: 'var(--error)', fontSize: '8px', textAlign: 'right'}}>
                          {errors.cap}
                        </p>
                      )}
                    </div>
                  </div>
                
                </div>
                <div className='d-flex justify-content-between mt-3'>
                  <h5>{total}€</h5>
                  <button className={isSubmitting || !isValid || !dirty ? "btn-page-disabled" : "btn-page"} disabled={isSubmitting}>
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


