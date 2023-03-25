import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {getCartTotal} from '@/store/features/cart'

import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import styles from './CheckoutForm.module.css'

export default function CheckoutForm() {

    const stripe = useStripe();
    const elements = useElements();

    const amount = useSelector(getCartTotal);
    const currentUser = {}
    const [isProcessingPayment, setisProcessingPayment] = useState(false)
    const [clientSecret, setClientSecret] = useState("")

    useEffect(() => {
        fetch('http://localhost:3000/api/checkout/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount: amount * 100})
        })
            .then(res => res.json())
            .then((data) => {
                setClientSecret(data.paymentIntent.client_secret)
            })
    }, [])

  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if(!stripe || !elements){
        return;
      }
  
      setisProcessingPayment(true)

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: currentUser.displayName ? currentUser.displayName : 'Guest'
          }
        }
      })
      
      setisProcessingPayment(false)

      if(paymentResult.error) {
        alert(paymentResult.error.message)
      } else {
        if(paymentResult.paymentIntent.status === 'succeeded') {
          alert('Payment successful')
        }
      }

    //   const {error, paymentMethod} = await stripe.createPaymentMethod({
    //     type: 'card',
    //     card: elements.getElement(CardElement),
    //   });
    };

  return (

    <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe || !elements}>
            Pay
        </button>
    </form>
  )
}
