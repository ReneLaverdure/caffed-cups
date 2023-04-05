import Image from 'next/image'
import CoffeeDisplay from '../../public/coffeeDisplay.jpg'
import styles from '../../styles/Form.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useState } from 'react';

import { loginUser } from '../helpers';


export default function Login() {

    const router = useRouter()
    const [submitError, setSubmitError] = useState('')
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        }, 
        //validate form 
        validationSchema: Yup.object({
            email: Yup.string()
                .email('invaild email adress')
                .required("email is required"),
            password: Yup.string()
                .min(6, "password must be at least 6 characters long")
                .required('password is required')
        }),
        onSubmit: async (values) => {
            
            try {
                setLoading(true)

                     const loginRes = await loginUser({
                        email: values.email,
                        password: values.password
                    })


                    if(loginRes && !loginRes.ok){

                        setSubmitError(loginRes.error || "")
                    } else {
                        console.log('hello from success')
                        router.push('/')
                    }

            } catch(error){

                const errorMsg = error.error

                setSubmitError(errorMsg)
            }

        }
    })

  return (
    <div className={styles.FormWrapper}>
        <form onSubmit={formik.handleSubmit} className={styles.FormContainer} action="">
            <div className={styles.FormInputContainer}>
                <h2>Login</h2>

                <div className={styles.FormInput}>
                    <label className={`${formik.touched.email && formik.errors.email ? styles.FormError : ''}`} htmlFor="email">{formik.touched.email && formik.errors.email ? formik.errors.email : 'Email'}</label>
                    <input type="text" name='email' value={formik.values.email} onChange={formik.handleChange} placeholder='Enter your Email'/>
                </div>

                <div className={styles.FormInput}>
                    <label className={`${formik.touched.password && formik.errors.password ? styles.FormError : ''}`} htmlFor="password">{formik.touched.password && formik.errors.password ? formik.errors.password : 'Password'}</label>
                    <input type="password" name='password' value={formik.values.password} onChange={formik.handleChange} placeholder='Enter your Password'/>
                </div>

                <div>
                    <p>Don&apos;t have a account register <Link href='/register'>Here</Link></p>
                </div>
         
                <button type='submit'>Login</button>

            </div>
            <div>
                <Image className={styles.FormImage} src={CoffeeDisplay} alt="Display of coffee cup on coffee beans"/>
            </div>
        </form>
    </div>
  )
}
