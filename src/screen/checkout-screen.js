import React from 'react';
import { Formik } from 'formik';

const Checkout = () => {
  return (
    <section className='container'>
      <div style={{marginTop: '90px'}}>
        <h1 className='checkout-title'>Checkout</h1>
      </div>
      <div className='xl-checkout'>
        <div className='list-container'>
          <div className='text-end'>
            <button className='btn-remove'>Remove all</button>
          </div>
          <div className='text-checkout'>
            <h4>No items in the chart</h4>
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
                  <h5>5€</h5>
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


