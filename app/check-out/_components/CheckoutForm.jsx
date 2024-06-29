import { useDispatch, useSelector } from 'react-redux';
import { IoExitOutline } from "react-icons/io5";
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { addOrder } from '../../rtk/slices/orderReducer';
import { removeFromCart } from '../../rtk/slices/cartReducer';
function CheckoutForm({checkOut, getTotal}) {
    const modeState = useSelector((state) => state.mode);
    const cartState = useSelector((state) => state.cart);
    const user = useUser();
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [errormessage, setErrorMessage] = useState();
  
    const handleSubmit = async (event) => {
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      const handleError = (error) => {
        setLoading(false)
        setErrorMessage(error.message)
    }

    const createOrder = () => {
      let Idproducts = [];
      cartState.forEach((cart) => {
        Idproducts.push(cart?.attributes?.products?.data[0]?.id);
      })
      const data = {
          email : user?.user?.primaryEmailAddress?.emailAddress,
          userName: user?.user?.fullName,
          total: getTotal,
          products: Idproducts
      }
      dispatch(addOrder(data));
    }

    createOrder();
      // Trigger form validation and wallet collection
		const { error: submitError } = await elements.submit();
		if (submitError) {
			handleError(submitError);
			return;
		}


    const res = await fetch('../api/create-intent', {
      method: 'POST',
      body: JSON.stringify({ amount: getTotal }), 
    });
    const clientSecret = await res.json();
      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        clientSecret,
        elements,
        confirmParams: {
          return_url: "https://ecoomerce-andrew-project.netlify.app/success",
        },
      });


      if (result.error) {
        // Show error to your customer (for example, payment details incomplete)
        console.log(result.error.message);
      } else {
        cartState.forEach((cart) => {
          dispatch(removeFromCart(cart))
        })
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    };

  return (
    <form onSubmit={handleSubmit} className={`${modeState && 'dark bg-[#171717]'} transition-all duration-500 z-10 backdrop-blur-xl  bg-slate-500/50 dark:bg-gray-200/40 rounded-2xl w-[80%] fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]`}>
        <div onClick={() => {checkOut(false); }} className='flex justify-end p-5 cursor-pointer text-3xl text-white dark:text-[#171717]'>
        <IoExitOutline />
        </div>
        <div className='container w-[80%] mx-auto p-5 mb-[50px]'>
    <PaymentElement />
    <button className='bg-primary hover:bg-secondary font-bold text-[#171717] px-5 py-4 mt-10 rounded-xl w-full'>Submit</button>
        </div>
  </form>
  )
}

export default CheckoutForm;