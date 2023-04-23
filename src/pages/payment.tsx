// import {loadStripe} from '@stripe/stripe-js';
// import {
//   CardElement,
//   Elements,
//   useStripe,
//   useElements,
// } from '@stripe/react-stripe-js';

// import CheckoutForm from '../components/CheckoutForm/CheckoutForm';
import styles from '../../styles/PaymentForm.module.css'

// export default function Payment () {
//   const stripePromise = loadStripe('pk_test_49hbjKbnxhMovke8b7QNR8MA00mPmUjTnu');




//   return (
//     <div className={styles.PaymentContainer}>
//       <div className={styles.PaymentContainerWrapper}>
//         <Elements stripe={stripePromise}>
//           <CheckoutForm />
//         </Elements>
//       </div>
//     </div>
//   )
// }

// import React, { useState } from "react";

// interface MultiStepFormProps {}

// type Stage = 1 | 2 | 3;

// const MultiStepForm: React.FC<MultiStepFormProps> = () => {
//   const [stage, setStage] = useState<Stage>(1);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (stage < 3) {
//       setStage(stage + 1 as Stage);
//     } else {
//       console.log("Form submitted");
//     }
//   };

//   const handleBack = () => {
//     if (stage > 1) {
//       setStage(stage - 1 as Stage);
//     }
//   };

//   const renderStage = () => {
//     switch (stage) {
//       case 1:
//         return (
//           <>
//             <label htmlFor="name">Name:</label>
//             <input type="text" id="name" name="name" />
//           </>
//         );
//       case 2:
//         return (
//           <>
//             <label htmlFor="email">Email:</label>
//             <input type="email" id="email" name="email" />
//           </>
//         );
//       case 3:
//         return (
//           <>
//             <label htmlFor="password">Password:</label>
//             <input type="password" id="password" name="password" />
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className={styles.PaymentContainer}>
//       <form onSubmit={handleSubmit}>
//         {renderStage()}
//         <div>
//           <button type="button" onClick={handleBack} disabled={stage === 1}>
//             Back
//           </button>
//           <button type="submit">{stage === 3 ? "Submit" : "Next"}</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default MultiStepForm
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm';
import { useState } from 'react';
import TextInput from '../components/TextInput/TextInput'
import { useFormik } from "formik";
import * as Yup from "yup";

interface FormData {
  phoneNumber: number;
  address: string;
  state: string;
  postCode: number,
  deliveryMethod: boolean
  deliveryInstructions: string,
}

const initialValues: FormData = {
  phoneNumber: 0,
  address: "",
  state: "",
  postCode: 0,
  deliveryMethod: false,
  deliveryInstructions: ''
};

const addressSchema = Yup.object({
  phoneNumber: Yup.number()
    .min(6, "Phone number is too short")
    .required("Phone number is required"),
  address: Yup.string()
    .max(50, "Too long!")
    .required("Required"),
  state: Yup.string()
    .required("state is required"),
  postCode: Yup.number()
    .required("post code is required")
});

const devilerySchema = Yup.object({
  deliveryMethod: Yup.boolean()
});


type Stage = 1 | 2 | 3;

const MultiStepForm: React.FC = () => {

  const stripePromise = loadStripe('pk_test_49hbjKbnxhMovke8b7QNR8MA00mPmUjTnu');


  const [stage, setStage] = useState<Stage>(1);

  const handleBack = () => {
    if (stage > 1) {
      setStage(stage - 1 as Stage);
    }
  };

  const handleSubmit = () => {
    if (stage < 3) {
      setStage(stage + 1 as Stage);
    } else {
      console.log("Form submitted", formik.values);
    }
  };

  const currentSchema = () => {
    switch (stage) {
      case 1:
        return addressSchema;
      case 2:
        return devilerySchema;
      case 3:
        return;
      default:
        return addressSchema;
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: currentSchema(),
  });

  console.log(formik.values)

  return (
    <div className={styles.PaymentContainer}>
      <form onSubmit={formik.handleSubmit}>
        {stage === 1 && (
          <>
            <TextInput 
              name='phoneNumber'
              value={formik.values.phoneNumber}
              labelLogic={formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : 'phoneNumber'}
              labelStyleLogic={`${formik.touched.phoneNumber && formik.errors.phoneNumber ? styles.FormError : ''}`}
              handleChange={formik.handleChange}
              placeholder="Enter your email" type={''}            />
            <TextInput 
              name='address'
              value={formik.values.address}
              labelLogic={formik.touched.address && formik.errors.address ? formik.errors.address : 'address'}
              labelStyleLogic={`${formik.touched.address && formik.errors.address ? styles.FormError : ''}`}
              handleChange={formik.handleChange}
              placeholder="Enter your email" type={''}            />
            <TextInput 
              name='state'
              value={formik.values.state}
              labelLogic={formik.touched.state && formik.errors.state ? formik.errors.state : 'state'}
              labelStyleLogic={`${formik.touched.state && formik.errors.state ? styles.FormError : ''}`}
              handleChange={formik.handleChange}
              placeholder="Enter your email" type={''}            />
            <TextInput 
              name='postCode'
              value={formik.values.postCode}
              labelLogic={formik.touched.postCode && formik.errors.postCode ? formik.errors.postCode : 'postCode'}
              labelStyleLogic={`${formik.touched.postCode && formik.errors.postCode ? styles.FormError : ''}`}
              handleChange={formik.handleChange}
              placeholder="Enter your email" type={''}            />

            {/* <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} />
            {formik.errors.name && formik.touched.name ? <div>{formik.errors.name}</div> : null} */}
          </>
        )}

        {stage === 2 && (
          <>
           {/* <fieldset id="devilerySchema"> */}
              <label htmlFor="">
                <input type="radio" name='devilerySchema' onChange={formik.handleChange}  value='standard-metro'/>
                $10.00 Standard devilery - Metro Region Delivery 
              </label>
              <label htmlFor="">
                <input type="radio" name='devilerySchema' onChange={formik.handleChange}  value='express-metro'/>
                $20.00 Express devilery - Metro Region Delivery 
              </label> 
              <label htmlFor="">
                <input type="radio" name='devilerySchema' onChange={formik.handleChange}  value='standard-regional'/>
                $20.00 Standard devilery - Regional 
              </label>
              <label htmlFor="">
                <input type="radio" name='devilerySchema' onChange={formik.handleChange}  value='express-regional'/>
                $30.00 Express devilery - Regional 
              </label>       
           {/* </fieldset> */}
          </>
        )}

        {stage === 3 && (
          <>
          <div className={styles.PaymentContainerWrapper}>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
          </>
        )}

        <div>
          <button type="button" onClick={handleBack} disabled={stage === 1}>
            Back
          </button>
          <button type="submit">{stage === 3 ? "Submit" : "Next"}</button>
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
