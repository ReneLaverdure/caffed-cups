import Image from 'next/image'
import { useFormik } from "formik"
import * as Yup from 'yup'
import Router, { useRouter } from 'next/router'
import TeaBush from '../../public/tea-bush.jpg'
import styles from '../../styles/Form.module.css';
import Link from 'next/link';

export default function Register() {

    const router = useRouter()

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
        onSubmit: (values) => {
            
            router.push({pathname: '/', query: {success: true}})
        }
    })



  return (
    <div className={styles.FormWrapper}>
    <form onSubmit={formik.handleSubmit} className={styles.FormContainer} action="">
        <div className={styles.FormInputContainer}>
            <h2>Register</h2>

            <div className={styles.FormInput}>
                <label className={`${formik.touched.email && formik.errors.email ? styles.FormError : ''}`} htmlFor="email">{formik.touched.email && formik.errors.email ? formik.errors.email : 'Email'}</label>
                <input type="text" name='email' value={formik.values.email} onChange={formik.handleChange} placeholder='Enter your Email'/>
            </div>
            <div className={styles.FormInput}>
                <label className={`${formik.touched.firstName && formik.errors.firstName ? styles.FormError : ''}`} htmlFor="firstName">{formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : 'First name'}</label>
                <input type="text" name='firstName' value={formik.values.firstName} onChange={formik.handleChange} placeholder='Enter your first name'/>
            </div>
            <div className={styles.FormInput}>
                <label className={`${formik.touched.lastName && formik.errors.lastName ? styles.FormError : ''}`} htmlFor="lastName">{formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : 'Last Name'}</label>
                <input type="text" name='lastName' value={formik.values.lastName} onChange={formik.handleChange} placeholder='Enter your last name'/>
            </div>

            <div className={styles.FormInput}>
                <label className={`${formik.touched.password && formik.errors.password ? styles.FormError : ''}`} htmlFor="password">{formik.touched.password && formik.errors.password ? formik.errors.password : 'Password'}</label>
                <input type="password" name='password' value={formik.values.password} onChange={formik.handleChange} placeholder='Enter your Password'/>
            </div>
            <div className={styles.FormInput}>
                <label className={`${formik.touched.confirmPassword && formik.errors.confirmPassword ? styles.FormError : ''}`} htmlFor="confirmPassword">{formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : 'Confirm Password'}</label>
                <input type="password"  name='confirmPassword' value={formik.values.confirmPassword} onChange={formik.handleChange} placeholder='Re-enter your Password'/>
            </div>

            <div className={styles.FormLinkContainer}>
                <p>Already have an account <Link className={styles.FormLink} href='/login'>Login Here</Link></p>
            </div>
     
            <button className={styles.FormButton}>Register</button>

        </div>
        <div className={styles.FormImageContainer}>
            <Image className={styles.FormImage} src={TeaBush} alt="Display of coffee cup on coffee beans"/>
        </div>
    </form>
</div>
  )
}
