import Image from 'next/image'
import { useFormik } from "formik"
import * as Yup from 'yup'
import {useState} from 'react'
import { loginUser } from '../helpers'
import { useRouter } from 'next/router'
import TeaBush from '../../public/tea-bush.jpg'
import styles from '../../styles/Form.module.css';
import Link from 'next/link';

import TextInput from '../components/TextInput/TextInput'

export default function Register() {

    const router = useRouter()
    const [submitError, setSubmitError] = useState('')
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: ''
        }, 
        //validate form 
        validationSchema: Yup.object({
            email: Yup.string()
                .email('invaild email adress')
                .required("email is required"),
            firstName: Yup.string()
                .required('First name is required'),
            lastName: Yup.string()
                .required('Last name is required'),
            password: Yup.string()
                .min(6, "password must be at least 6 characters long")
                .required('password is required'),
            confirmPassword: Yup.string()
                .required()
                .oneOf([Yup.ref('password'), null], 'Password must match')
        }),
        onSubmit: async (values) => {
            
            console.log(values)
            try {
                setLoading(true)

                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify(values)
                })

                const data = await res.json()

                if(data.user){
                    
                   const loginRes = await loginUser({
                        email: data.user.email,
                        password: values.password
                    })

                    if(loginRes && !loginRes.ok){
                        console.log(loginRes)
                        setSubmitError(loginRes.error || "")
                    } else {
                        console.log('hello from success')
                        router.push('/')
                    }

                } else {
      
                    setSubmitError(data.error)
                }
              
            } catch(error){
                const errorMsg = error.error
                setSubmitError(errorMsg)
            }
            
            setLoading(false)

        }
    })



  return (
    <div className={styles.FormWrapper}>
    <form onSubmit={formik.handleSubmit} className={styles.FormContainer} action="">
        <div className={styles.FormInputContainer}>
            <h2>Register</h2>
            
            {
                submitError && <p style={{color: 'red'}}>{submitError}</p>
            }

            <TextInput 
                name='email' 
                value={formik.values.email}
                labelLogic={formik.touched.email && formik.errors.email ? formik.errors.email : 'Email'}
                labelStyleLogic={`${formik.touched.email && formik.errors.email ? styles.FormError : ''}`}
                handleChange={formik.handleChange}
                placeholder="Enter your email"
            />
            <TextInput 
                name='firstName' 
                value={formik.values.firstName}
                labelLogic={formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : 'First name'}
                labelStyleLogic={`${formik.touched.firstName && formik.errors.firstName ? styles.FormError : ''}`}
                handleChange={formik.handleChange}
                placeholder="Enter your first name"
            />
            <TextInput 
                name='lastName' 
                value={formik.values.lastName}
                labelLogic={formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : 'Last Name'}
                labelStyleLogic={`${formik.touched.lastName && formik.errors.lastName ? styles.FormError : ''}`}
                handleChange={formik.handleChange}
                placeholder="Enter your last name"
            />
            <TextInput 
                name='password' 
                value={formik.values.password}
                labelLogic={formik.touched.password && formik.errors.password ? formik.errors.password : 'Password'}
                labelStyleLogic={`${formik.touched.password && formik.errors.password ? styles.FormError : ''}`}
                handleChange={formik.handleChange}
                type="password"
                placeholder="Enter your password"
            />
            <TextInput 
                name='confirmPassword' 
                value={formik.values.confirmPassword}
                labelLogic={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : 'Confirm Password'}
                labelStyleLogic={`${formik.touched.confirmPassword && formik.errors.confirmPassword ? styles.FormError : ''}`}
                handleChange={formik.handleChange}
                type="password"
                placeholder="confirm your Password"
            />

            <div className={styles.FormLinkContainer}>
                <p>Already have an account <Link className={styles.FormLink} href='/login'>Login Here</Link></p>
            </div>
     
            <button type='submit' className={styles.FormButton}>Register</button>

        </div>
        <div className={styles.FormImageContainer}>
            <Image className={styles.FormImage} src={TeaBush} alt="Display of coffee cup on coffee beans"/>
        </div>
    </form>
</div>
  )
}
