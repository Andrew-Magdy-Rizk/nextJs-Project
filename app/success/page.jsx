"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {removeFromCart } from '../rtk/slices/cartReducer';
function PaymentConfirm() {
    const cartState = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const modeState = useSelector((state) => state.mode);
    const deleteCarts = () => {
        
        cartState.map((cart) => {
            dispatch(removeFromCart(cart))
        })
          console.log(cartState)
    }
    useEffect(() => {
        deleteCarts()
    },[cartState])
	return (
		<div className={`flex flex-col items-center justify-center px-5 py-10 mt-4 ${modeState && "dark bg-[#171717]"}`}>
			<Image src='/verified.gif'
				alt='check'
				width={130}
				height={130}
			/>
			<h2 className='text-[24px] dark:text-white py-3'>Payment Successful !</h2>
			<h2 className='text-[17px] text-center mt-6 text-gray-500 dark:text-neutral-300'>We sent an email with your
				order confirmation
				along with Digital Content</h2>
			<Link
				href="/"
				className='p-3 mt-6 text-black rounded-xl bg-secondary'>
				Go to Home</Link>

		</div>
	)
}

export default PaymentConfirm