import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import CheckoutForm from '../components/CheckoutForm/CheckoutForm';


export default function Payment () {
  const stripePromise = loadStripe('pk_test_49hbjKbnxhMovke8b7QNR8MA00mPmUjTnu');

  return (
    <div className={`Container`}>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  )
}
