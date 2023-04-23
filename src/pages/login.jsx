import Image from 'next/image'
import CoffeeDisplay from '../../public/coffeeDisplay.jpg'
import styles from '../../styles/Form.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useState } from 'react';

import { loginUser } from '../helpers';
import TextInput from '../components/TextInput/TextInput';


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
            console.log(values)
            try {
                setLoading(true)
                    console.log('re')
                     const loginRes = await loginUser({
                        email: values.email,
                        password: values.password
                    })


                    if(loginRes && !loginRes.ok){
                        console.log(loginRes)
                        setSubmitError(loginRes.error || "")
                    } else {
                        console.log('hello from success')
                        router.push('/')
                    }

            } catch(error){
                console.log('error message', error)
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
                <TextInput 
                    name='email' 
                    value={formik.values.email}
                    labelLogic={formik.touched.email && formik.errors.email ? formik.errors.email : 'Email'}
                    labelStyleLogic={`${formik.touched.email && formik.errors.email ? styles.FormError : ''}`}
                    handleChange={formik.handleChange}
                    placeholder="Enter your email"
                />
                <TextInput
                    type='password' 
                    name='password' 
                    value={formik.values.password}
                    labelLogic={formik.touched.password && formik.errors.password ? formik.errors.password : 'Password'}
                    labelStyleLogic={`${formik.touched.password && formik.errors.password ? styles.FormError : ''}`}
                    handleChange={formik.handleChange}
                    placeholder="Enter your password"
                />

                <div>
                    <p>Don&apos;t have a account register <Link className={styles.FormLink} href='/register'>Here</Link></p>
                </div>
         
                <button type='submit'>Login</button>

            </div>
            <div className={styles.FormImageContainer}>
                <Image className={styles.FormImage} src={CoffeeDisplay} alt="Display of coffee cup on coffee beans"/>
            </div>
        </form>
    </div>
  )
}
