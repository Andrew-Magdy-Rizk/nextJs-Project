"use client"
import React, { useEffect } from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './_components/CheckoutForm';
import { useDispatch } from 'react-redux';
import { fetchCartInfi } from '../rtk/slices/cartReducer';
import { useUser } from '@clerk/nextjs';

const stripePromise = loadStripe('pk_test_51PVAxB00QiqcB3SWlCzsXQLf7dNdd7I3HaETVPsphdJYgk5SDgK0Oe8eG84HDS8RK4DHiKeoAVsyS3VXb6x51SIh00KS29fS5E');
function CheckOut(props) {
  const dispatch = useDispatch();
  const user = useUser();
  const email =user?.user?.primaryEmailAddress?.emailAddress;
  useEffect(() => {
    dispatch(fetchCartInfi(email));
  },[])
    const options = {
        mode: 'payment',
        currency: 'usd',
        amount: props.Total*100,
      };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm  checkOut={props.hidden} getTotal={props.Total}/>
    </Elements>
  )
}

export default CheckOut;